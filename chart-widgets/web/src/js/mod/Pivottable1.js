


/*
 * 医疗可视化平台-透视表
 * date：2017-01-04
 * 
 */
var Pivottable = function() {
    if (!(this instanceof Pivottable)) {
        return new Pivottable();
    }
}

var template = 
    '{{for defaultData}}' +
    '<table>' +
    '{{for headData}}' +
    '<tr class="head">' +
    '{{for #data}}' +
    '<td colspan="{{>cols}}" data-parent="{{>parent}}"  data-value="{{>name}}" rowspan="{{>rows}}" data-id="{{>id}}" data-children="{{>children}}">{{>name}}</td>' +
    '{{/for}}' +
    '</tr>' +
    '{{/for}}' +
    '{{for bodyData}}' +
    '<tr class="body">' +
    '{{for #data}}' +
    '<td colspan="{{>cols}}" data-parent="{{>parent}}" data-value="{{>name}}" data-row="{{>rowkey}}" data-head="{{>headkey}}" rowspan="{{>rows}}" data-children="{{>children}}" data-id="{{>id}}">{{>name}}</td>' +
    '{{/for}}' +
    '</tr>' +
    '{{/for}}' +
    '</table>' +
    '{{/for}}';




Pivottable.prototype = $.extend(new MCBASE(), {
    init: function(cfg) {
        cfg = cfg || {};
        cfg.option = cfg.option || {};
        this.openFlagTree = [];
        this.realClose = [];
        this.prefixClass = cfg.option.prefixClass || null;
        this.setOption(cfg.option);
        if (cfg.dom) {
            this.setDom(cfg.dom);
        }
        if (cfg.clickCallback) {
            this.setClickCallback(cfg.clickCallback);
        }
        this.initData();
        this.render();
        this.bindEvent();
    },
    initData: function(){
        // headFlag
        this.getLevelCount(this.option.data.openFlagData.headFlag);
        this.getParentsArr(this.option.data.openFlagData.headFlag);
        // bodyFlag
        this.getLevelCount(this.option.data.openFlagData.bodyFlag);
        // this.getParentsArr(this.option.data.openFlagData.bodyFlag);
        this.initOpenFlagTree();
    },
    setDom: function(dom) {
        this.wrap = this._setDom(dom);
        if (!this.wrap || !this.wrap.length) {
            console.log('配置项缺失');
            return false;
        }
        if (this.prefixClass && this.prefixClass != '') {
            this.wrap.addClass(this.prefixClass);
        }
    },
    setOption: function(option) {
        // option = _.defaults( option, this.defaultOption );
        option = $.extend(true, this.defaultOption, option);
        this.option = $.extend(this.option, option);
        this.setData(option.data);
    },
    setData: function(data) {
        data = data || {};
        this.option.data = $.extend(this.option.data, data);
        this.formerData = $.extend(true, {}, this.option.data);
    },
    setClickCallback: function(fn, layout, qlik) {
        this.clickCallback = fn || null;
        this.yjslayout = layout;
        this.yjsqlik = qlik;
    },
    bindEvent: function() {
        var self = this;
        var data = self.option.data;
        this.wrap.off()
            .on('click', '.wrap', function(ev) {
                ev.stopPropagation();
            })
            .on('click', 'td', function() {
                var parent = $(this).parent();
                var id = $(this).attr('data-id');
                if (id) {
                    if(parent.hasClass('head')){
                        self.setTreeOpenFlagById(self.openFlagTree[0], id);
                    }else{
                        self.setTreeOpenFlagById(self.openFlagTree[1], id);
                    }
                    self.realClose = [];
                    self.getRealClose(self.openFlagTree[0]);
                    self.getRealClose(self.openFlagTree[1]);
                    self.changeDataByFlag();
                }
            })
    },
    // 从headData中获取之前的cols总和
    getFormerColsCount: function(data, id, i){
        var temp = 0;
        for(var j=0; j<data[i].length; j++){
            if(data[i][j].id == id){
                return {count: temp, idx: i, jdx: j, cols: data[i][j].cols ? data[i][j].cols : 1};
            }
            temp += data[i][j].cols ? data[i][j].cols : 1;
        }
    },
    // 根据id找到{}设置openFlag
    setOpenFlagById: function(data, id){
        $.each(data, function(idx, item){
            if(id == item.id){
                item.isOpen = !item.isOpen;
                return true;
            }
        })
    },
    // 获取每个节点的后代的层级数: 根据原始openFlagData
    getLevelCount: function(data){
        var self = this;
        $.each(data, function(idx, item){
            item.childrenLevelCount = self.findWhereDown(data, item.id, 0);
        })
    },
    findWhereDown: function(data, id, count){
        var obj = _.findWhere(data, {pid: id});
        if(!obj){
            return count;
        }
        return this.findWhereDown(data, obj.id, count += 1);
    },
    // 获取每个节点的后代个数: 根据原始openFlagData
    getChildrenCount: function(data){
        var self = this;
        $.each(data, function(idx, item){
            item.childrenCount = self.whereChild(data, item.id, 0);
        })
    },
    whereChild: function(data, id, count){
        var self = this;
        var obj = _.where(data, {pid: id});
        if(!obj.length){
            return count;
        }
        $.each(obj, function(idx, item){
            (idx == 0) && (count += obj.length);
            return self.whereChild(data, item.id, count);
        })
    },
    // 获取每个节点的祖先节点数组
    getParentsArr: function(data){
        var self = this;
        $.each(data, function(idx, item){
            item.parents = self.findWhereUp(data, item.pid, []);
        })
    },
    findWhereUp: function(data, id, parents){
        var obj = _.findWhere(data, {id: id});
        if(!obj){
            return parents;
        }
        parents.push(obj.id);       /*注意不要把整个对象存下来，$.extend的时候会死循环*/
        return this.findWhereUp(data, obj.pid, parents);
    },
    // 遍历树，设置对应id的isOpen属性
    setTreeOpenFlagById: function(data, id){
        var self = this;
        $.each(data, function(idx, item){
            if(item.id == id){
                item.isOpen = !item.isOpen;
                return true;
            }else{
                self.setTreeOpenFlagById(item.children, id);
            }
        })
    },
    // 改变组成表格的数据根据openFlag
    changeDataByFlag: function() {
        var self = this;
        var obj, length, info;
        var data = self.option.data;
        // var dataCopy = data;
        var dataCopy = $.extend( true, {},  data);
        var headData = data.defaultData.headData;
        var bodyData = data.defaultData.bodyData;
        self.render(self.formerData);
        $.each(this.realClose, function(idx, item){
            if(_.indexOf(item, 'h') > -1){
                obj = self.getObjById(self.openFlagTree[0], item);
                posInfo = self.getPosInfoById(headData, item);
                info = self.getFormerColsCount(headData, item, posInfo.idx);
                headData = self.removeColsData(headData, info, 'head');
                self.setNewCols(headData, info, obj);
                bodyData = self.removeColsData(bodyData, info, 'body');
                // headData[info.idx][info.jdx].rows = obj.childrenLevelCount + 2;
                headData[info.idx][info.jdx].cols = 1;
                self.deleteEmptyRows(headData, obj, posInfo);
                dataCopy.defaultData.headData = headData;
                dataCopy.defaultData.bodyData = bodyData;
                self.render(dataCopy);
            }else{
                obj = self.getObjById(self.openFlagTree[1], item);
                if(obj.children.length == 0)    return;
                info = self.getPosInfoById(bodyData, item);
                bodyData = self.removeRowsData(bodyData, info, obj);
                // bodyData[info.idx][info.jdx].cols = obj.childrenLevelCount + 1;
                dataCopy.defaultData.bodyData = bodyData;
                self.deleteEmptyCols(dataCopy.defaultData, obj, info);
                self.render(dataCopy);
            }
        })
    },
    // headData中删除空的行
    deleteEmptyRows: function(data, obj, info){
        for(var i=0; i<obj.childrenLevelCount; i++){
            var arr = _.filter(data[info.idx+1], function(item){ return item.name != ''});
            (arr.length == 1) && (data.splice(info.idx+1, 1));
        }
    },
    // bodyData中删除空的列
    deleteEmptyCols: function(data, obj, info){
        var bodyData = data.bodyData;
        var headData = data.headData;
        var demarcationIdx;
        for(var i=0; i<headData.length; i++){
            for(var j=0; j<headData[i].length; j++){
                (headData[i][j].demarcationFlag == true) && (demarcationIdx = i);   /*获取分界线的idx*/
            }
        }
        for(var j=0; j<obj.childrenLevelCount; j++){
            var deleteFlag = true;
            for(var i=0; i<bodyData.length; i++){
                (bodyData[i][info.jdx+1]['name'] != '') && (deleteFlag = false);
            }
            if(deleteFlag){
                for(var i=0; i<bodyData.length; i++){
                    bodyData[i].splice(info.jdx+1, 1);
                }
                headData[demarcationIdx].splice(info.jdx+1, 1);
                for(var i=0; i<demarcationIdx; i++){
                    headData[i][0].cols -= 1;
                }
            }
        }
    },
    // 根据id获取位置信息：idx和jdx
    getPosInfoById: function(data, id){
        for(var i=0; i<data.length; i++){
            for(var j=0; j<data[i].length; j++){
                if(data[i][j].id == id) {
                    return {idx: i, jdx: j}
                };
            }
        }
    },
    // 根据bodyFlag移除列数据
    removeRowsData: function(data, info, obj){
        var dataCopy = $.extend(true, [], data);
        var end = obj.leafCount + (obj.childrenCount ? obj.childrenCount : 0);
        dataCopy[info.idx].splice(info.jdx+obj.childrenLevelCount+1);
        for(var i=0; i<obj.childrenLevelCount; i++){
            dataCopy[info.idx][info.jdx+i+1].name = '';
        }
        var temp = 0;
        for(var i=0; i<dataCopy[info.idx+end].length; i++){
            if(temp == this.openFlagTree[1][0].childrenLevelCount + 1){
                dataCopy[info.idx] = dataCopy[info.idx].concat(dataCopy[info.idx+end].slice(i));
            }
            temp += dataCopy[info.idx+end][i].cols ? dataCopy[info.idx+end][i].cols : 1;
        }
        dataCopy.splice(info.idx + 1, end);
        return dataCopy;
    },
    // 设置新的headData所占列数
    setNewCols: function(data, info, obj){
        var self = this;
        var length = self.option.data.measures.length;
        for(var i=0; i<info.idx; i++){
            for(var j=0; j<data[i].length; j++){
                if(_.indexOf(obj.parents, data[i][j].id) > -1){
                    data[i][j].cols -= obj.childrenLevelCount == 0 ? length : (obj.leafCount * (length + 1));
                }
            }
        }
    },
    // 根据headFlag移除列数据
    removeColsData: function(data, info, flag){
        var dataCopy = $.extend(true, [], data);
        for(var i=(flag=='body' ? 0 : info.idx+1); i<data.length; i++){
            var temp = 0;
            for(var j=0; j<data[i].length; j++){
                temp += data[i][j].cols ? data[i][j].cols : 1;
                if(temp == info.count){
                    temp = 0;
                    for(var k=j+1; k<data[i].length; k++){
                        temp += data[i][k].cols ? data[i][k].cols : 1;
                        // if(flag == 'body'){    /*处理body数据把小结的数据留下*/
                        //     if(temp == info.cols)    break;
                        //     dataCopy[i].splice(j+1, 1);
                        // }
                        // if(flag == 'head'){
                        //     dataCopy[i].splice(j+1, 1);
                        // }
                        if(temp == info.cols){
                            (flag == 'head') && (dataCopy[i][j+1].name = '');
                            break;
                        }
                        dataCopy[i].splice(j+1, 1);
                    }
                    break;
                }
            }
        }
        return dataCopy;
    },
    // 获取树形结构数据
    getJsonTree: function(data, parentId) {
        var itemArr = [];
        for (var i = 0; i < data.length; i++) {
            var node = data[i];
            //data.splice(i, 1)
            if (node.pid == parentId) {
                // var newNode = { id: node.id, children: this.getJsonTree(data, node.id) };
                var newNode = $.extend(node, { children: this.getJsonTree(data, node.id) });
                itemArr.push(newNode);
            }
        }
        return itemArr;
    },
    // 获取至少有两层后代节点的节点的。。。个数并记录
    getChildrenCountTree: function(data){
        for(var i=0; i<data.children.length; i++){
            var c = data.children[i].children;
            if((c && !c.length) || !c){
                data.childrenCount = 0;
                return 0;
            }else{
                var childrenCount = 0;
                (i == 0) && (childrenCount += data.children.length + this.getChildrenCountTree(data.children[i]));
            }
            data.childrenCount = childrenCount;
            return childrenCount;
        }


    },
    // 获取每个节点的叶子节点个数并记录
    getLeafCountTree: function(data) {
        if(!data){
            return 0;
        }
        if (data.children.length == 0) {
            data.leafCount = 1;
            return 1;
        } else {
            var leafCount = 0;
            for (var i = 0; i < data.children.length; i++) {
                leafCount = leafCount + this.getLeafCountTree(data.children[i]);
            }
            data.leafCount = leafCount;
            return leafCount;
        }
    },
    getRealClose: function(data){
        var self = this;
        $.each(data, function(idx, item){
            if(item.isOpen == false){
                self.realClose.push(item.id);
                _.unique(self.realClose);
            }else{
                self.getRealClose(item.children);
            }
        })
    },
    // 遍历树找到对应id的{}
    getObjById: function(data, id){
        var self = this;
        var temp;
        for(var i=0; i<data.length; i++){
            if(data[i].id == id){
                temp = data[i];
                return temp;
            }
            else{
                temp = self.getObjById(data[i].children, id);
                if(temp)    return temp;
            }
        } 
        
    },
    // 初始化树形数据
    initOpenFlagTree: function(){
        var data = this.option.data;
        var self = this;
        $.each(data.openFlagData, function(idx, item){
            var temp = self.getJsonTree(item, '');
            self.getLeafCountTree(temp[0]);
            // self.getLevelCountTree(temp[0], '')
            self.openFlagTree.push(temp);
        })
        self.openFlagTree[1] && self.getChildrenCountTree(self.openFlagTree[1][0]);
    },
    render: function(data) {
        data = data || this.option.data;
        var html = $.templates(template)(data);
        this.wrap.html(html);
    },
});











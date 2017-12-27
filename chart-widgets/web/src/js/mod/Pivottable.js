// define(['./mc_base'], function(MCBASE){

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
    '<div class="pivottable">' +
        '<div class="headLeftFixedWrap fixedWrap">' +
            '<table class="headLeftFixed">' +
                '<thead>' +
                    '{{for headData}}' +
                        '<tr class="head">' +
                            '{{for #data}}' +
                                '<td colspan="{{>cols}}" class="{{if parent}}noDisplay{{/if}}" data-parent="{{>parent}}"  data-value="{{>name}}" rowspan="{{>rows}}" data-id="{{>id}}" data-children="{{>level}}" {{if children}} {{/if}}>{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                            '{{/for}}' +
                        '</tr>' +
                    '{{/for}}' +
                '</thead>' +
                '<tbody>' +
                    '{{for bodyData}}' +
                        '<tr class="body">' +
                            '{{for #data}}' +
                                '<td colspan="{{>cols}}" class="{{if parent}}bodyLeft{{/if}} noDisplay" data-parent="{{>parent}}" data-value="{{>name}}" data-row="{{>rowkey}}" data-head="{{>headkey}}" rowspan="{{>rows}}" data-children="{{>level}}" data-id="{{>id}}">{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                            '{{/for}}' +
                        '</tr>' +
                    '{{/for}}' +
                '</tbody>' +
            '</table>' +
        '</div>' +
        '<div class="headRightFixedWrap fixedWrap">' +
            '<table class="headRightFixed">' +
                '<thead>' +
                    '{{for headData}}' +
                        '<tr class="head">' +
                            '{{for #data}}' +
                                '<td colspan="{{>cols}}" class="{{if !parent}}invisible{{/if}}" data-parent="{{>parent}}"  data-value="{{>name}}" rowspan="{{>rows}}" data-id="{{>id}}" data-children="{{>level}}" {{if children}} {{/if}}>{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                            '{{/for}}' +
                        '</tr>' +
                    '{{/for}}' +
                '</thead>' +
                '<tbody>' +
                    '{{for bodyData}}' +
                        '<tr class="body">' +
                            '{{for #data}}' +
                                '<td colspan="{{>cols}}" class="{{if parent}}bodyLeft{{/if}} invisible" data-parent="{{>parent}}" data-value="{{>name}}" data-row="{{>rowkey}}" data-head="{{>headkey}}" rowspan="{{>rows}}" data-children="{{>level}}" data-id="{{>id}}">{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                            '{{/for}}' +
                        '</tr>' +
                    '{{/for}}' +
                '</tbody>' +
            '</table>' +
        '</div>' +
        '<div class="bodyLeftFixedWrap fixedWrap">' +
            '<table class="bodyLeftFixed">' +
                '<thead>' +
                    '{{for headData}}' +
                        '<tr class="head">' +
                            '{{for #data}}' +
                                '<td colspan="{{>cols}}" class="{{if !parent}}invisible {{else}}noDisplay{{/if}}"  data-parent="{{>parent}}"  data-value="{{>name}}" rowspan="{{>rows}}" data-id="{{>id}}" data-children="{{>level}}" {{if children}} {{/if}}>{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                            '{{/for}}' +
                        '</tr>' +
                    '{{/for}}' +
                '</thead>' +
                '<tbody>' +
                    '{{for bodyData}}' +
                        '<tr class="body">' +
                            '{{for #data}}' +
                                '<td colspan="{{>cols}}" class="{{if parent}}bodyLeft {{else}}noDisplay{{/if}}" data-parent="{{>parent}}" data-value="{{>name}}" data-row="{{>rowkey}}" data-head="{{>headkey}}" rowspan="{{>rows}}" data-children="{{>level}}" data-id="{{>id}}">{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                            '{{/for}}' +
                        '</tr>' +
                    '{{/for}}' +
                '</tbody>' +
            '</table>' +
        '</div>' +
        '<div class="transverseRollingWrap">' +
                '<table class="defaultTable">' +
                    '<thead>' +
                        '{{for headData}}' +
                            '<tr class="head">' +
                                '{{for #data}}' +
                                    '<td colspan="{{>cols}}" data-parent="{{>parent}}"  data-value="{{>name}}" rowspan="{{>rows}}" data-id="{{>id}}" data-children="{{>level}}" {{if children}} {{/if}}>{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                                '{{/for}}' +
                            '</tr>' +
                        '{{/for}}' +
                    '</thead>' +
                    '<tbody>' +
                        '{{for bodyData}}' +
                            '<tr class="body">' +
                                '{{for #data}}' +
                                    '<td colspan="{{>cols}}" class="{{if parent}}bodyLeft{{/if}}" data-parent="{{>parent}}" data-value="{{>name}}" data-row="{{>rowkey}}" data-head="{{>headkey}}" rowspan="{{>rows}}" data-children="{{>level}}" data-id="{{>id}}">{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                                '{{/for}}' +
                            '</tr>' +
                        '{{/for}}' +
                    '</tbody>' +
                '</table>' +
        '</div>' +
    '</div>' +
'{{/for}}';

/*固定行表头和列表头方法：将表格分成四个部分，绝对定位，隐藏掉相应的部分*/


Pivottable.prototype = $.extend(new MCBASE(), {
    init: function(cfg) {
        cfg = cfg || {};
        cfg.option = cfg.option || {};
        this.headDimNum = cfg.option.headDimNum;
        this.closeItems = {
            headClose: [],
            bodyClose: [],
        }
        this.qDimensionInfo = cfg.option.data.qHyperCube.qDimensionInfo.concat();
        this.qMeasureInfo = cfg.option.data.qHyperCube.qMeasureInfo.concat();
        this.qMatrix = cfg.option.data.qHyperCube.qDataPages[0].qMatrix;

        this.prefixClass = cfg.option.prefixClass || null;
        this.setOption(cfg.option);
        if (cfg.dom) {
            this.setDom(cfg.dom);
        }
        if (cfg.clickCallback) {
            this.setClickCallback(cfg.clickCallback);
        }

        this.setData({
            'headDimNum': this.headDimNum,
            'toggle':{
                // 'headClose':['2016'],
                'headClose':[],
                'bodyClose':[]
            }
        });

        // this.render();
        this.bindEvent();
    },
    initData: function(){
        this.baseHeads = [];
        this.baseBodys = [];
        this.dimensionInfos = [];
        this.dimensions = [];
        this.measureInfos = [];
        this.measures = [];
        this.headDimentsions = [];  // 表头维度信息
        this.rowDimensions = [];    // 列头维度信息
        this.tableDataJson = [];    // 序列化处理后的表格数据JSON数组 
        this.groupDataByHead = {};  // 根据表头结构化的源数据
        this.groupDataByRow = {};  // 根据行头结构化的源数据
        this.heads = [];  // 表格头
        this.bodys = [];  // 表格体 
        this.optionData = {
            defaultData: {
                headData: [],
                bodyData: [],
            }
        }
        // this.showheads = [];  // 显示的表格头
        // this.showbodys = [];  // 显示的表格体 
        
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
        // this.setData(option.data);
    },
    // setData: function(data) {
    //     data = data || {};
    //     this.option.data = $.extend(this.option.data, data);
    //     this.formerData = $.extend(true, {}, this.option.data);
    // },
    setClickCallback: function(fn, layout, qlik) {
        this.clickCallback = fn || null;
        this.yjslayout = layout;
        this.yjsqlik = qlik;
    },
    // 根据表头和表身渲染表格
    renderTableByData : function(  cfg ){
        var heads = cfg.heads.concat();
        var bodys = cfg.bodys.concat();        
        this.optionData.defaultData.headData = this.optionData.defaultData.headData.concat( heads );
        this.optionData.defaultData.bodyData = this.optionData.defaultData.bodyData.concat( bodys );
        this.render();
    },
    // 根据维度和度量获取表格对应的值
    getMeasureValueByParse : function( dims, measure ){
        //console.info( dims );
        var value = '';
        //console.log(tableDataJson);
        var compareObj = {};
        for( var dim in dims ){
            if( dims[dim] &&  dims[dim].indexOf('总计') < 0 && dims[dim].indexOf('小计') < 0 &&  dims[dim].indexOf('total') < 0){
                compareObj[dim] = dims[dim];
            }
        }
        //console.log( compareObj );
        var obj = _.where( this.tableDataJson, compareObj );
        // console.log( obj );
        if( obj && obj.length > 0 ){
            value = 0;
            $.each( obj, function( o, ob ){
                value +=  parseFloat( ob[measure] );
            })
        }
        return value;
    },
    // 分离维度信息 
    /*
    *   @param:整型 表头维度的个数
    */  
    constructDimentsions : function( headsize ){
        var self = this;
        var dimNum = this.qDimensionInfo.length;           
        var headNum = headsize ? headsize : parseInt( (this.qDimensionInfo.length + 1)/2 );
        var rowNum = this.qDimensionInfo.length - headNum;
        var measureNum = this.qMeasureInfo.length;
        $.each( this.qDimensionInfo, function(k,d){
            var num = k + 1;
            self.dimensionInfos.push({'name':d.qFallbackTitle, 'id':'d'+ num});
            if( k < headNum ){
                self.headDimentsions.push( d.qFallbackTitle );
            }else{
                self.rowDimensions.push( d.qFallbackTitle );
            }
        }) 
        $.each( this.qMeasureInfo, function(k,m){
            var num = k + 1;
            self.measureInfos.push({'name':m.qFallbackTitle, 'id':'m'+ num});
            self.measures.push( m.qFallbackTitle );
        }) 
        // headDimentsions = ['月份','年份','科室','医院',];
        // rowDimensions = ['年份','月份','科室','医院',];
        //rowDimensions.push('年份')
        // measures.push('手动汇总');  
        //console.log( headDimentsions );
        this.constructBaseTable( self.dimensionInfos, self.measureInfos );  // 构成基础表格, 维度信息，度量信息            
    },
    // 构建基础行元素数据
    constructBaseTable : function( dims, measures ){
        var self = this;
        var rows = [];
        var keys = dims.concat( measures );
        self.tableDataJson = [];
        var testJson = this.qMatrix.concat();
        $.each(testJson, function(k,v){
            var row = [];      
            var obj = {};             
            $.each( v, function(l,d){
                row.push({'name':d.qText});
               
                obj[keys[l].name] = d.qText;                
            })                       
            rows.push(row);          
            self.tableDataJson.push(obj);
        });        
        this.baseBodys = rows.concat();
        this.baseHeads = [keys];
    },
    // 构建交叉行列元素数据
    constructPivotTable : function( cfg ){        
        var rows = [];  
        var toggleHeads = cfg.headClose ? cfg.headClose.concat() : [];
        var toggleRows = cfg.bodyClose ? cfg.bodyClose.concat() : [];

        // 根据表头数据排序 
        this.groupDataByHead = _.groupBy( this.tableDataJson, this.headDimentsions[0]); 
        var array = [];
        for(var head in this.groupDataByHead ){
            if( this.headDimentsions.length > 1 ){
                //
                this.groupDataByHead[ head ] = _.groupBy( this.groupDataByHead[ head ], this.headDimentsions[1]);                
                var secondarray = [];
                for(var secondhead in this.groupDataByHead[head] ){   
                    if( this.headDimentsions.length > 2 ){
                        this.groupDataByHead[ head ][ secondhead ] = _.groupBy( this.groupDataByHead[ head ][ secondhead ], this.headDimentsions[2]);
                        for(var thirdhead in this.groupDataByHead[head][secondhead] ){   
                            if( this.headDimentsions.length > 3 ){
                                // 有超过三级表头（最大四级表头）
                                this.groupDataByHead[ head ][ secondhead ][ thirdhead ] = _.groupBy( this.groupDataByHead[ head ][ secondhead ][ thirdhead ] , this.headDimentsions[3]);
                                this.groupDataByHead[ head ][ secondhead ][ thirdhead ][ '总计' ] = [{level:0}];
                                this.groupDataByHead[ head ][ secondhead ][ '总计' ] = [{level:1}];
                                this.groupDataByHead[ head ][ '总计' ] = [{level:2}];
                                this.groupDataByHead[ '总计' ] = [{level:3}];

                            }else{
                                // 只有三级表头
                                this.groupDataByHead[ head ][ secondhead ][ '总计' ] = [{level:0}];
                                this.groupDataByHead[ head ][ '总计' ] = [{level:1}];
                                this.groupDataByHead[ '总计' ] = [{level:2}];
                            }
                        }
                    }else{
                        // 只有二级表头
                        this.groupDataByHead[ head ][ '总计' ] = [{level:0}];
                        this.groupDataByHead[ '总计' ] = [{level:1}];
                    }
                }
            }else{
                // 只有一级表头
                this.groupDataByHead[ '总计' ] = [{level:0}];
            }
        }
        //console.log( groupDataByHead );
        this.renderTableHeadSection( toggleHeads ); /** 处理表头 **/

        // 根据行头数据排序
        this.groupDataByRow = _.groupBy( this.tableDataJson, this.rowDimensions[0]);        
        for(var row in this.groupDataByRow ){
            if( this.rowDimensions.length > 1 ){
                this.groupDataByRow[ row ] = _.groupBy( this.groupDataByRow[ row ], this.rowDimensions[1]);
                for(var secondRow in this.groupDataByRow[row] ){
                    if( this.rowDimensions.length > 2 ){
                        this.groupDataByRow[ row ][ secondRow ] = _.groupBy( this.groupDataByRow[ row ][ secondRow ], this.rowDimensions[2]);
                        for(var thirdRow in this.groupDataByRow[row][ secondRow ] ){
                            if( this.rowDimensions.length > 3 ){
                                this.groupDataByRow[ row ][ secondRow ][ thirdRow ] = _.groupBy( this.groupDataByRow[ row ][ secondRow ][ thirdRow ], this.rowDimensions[3]); 
                                this.groupDataByRow[row][ secondRow ][ thirdRow ]['小计'] = [{level:0}];
                                this.groupDataByRow[row][ secondRow ]['小计'] = [{level:1}];
                                this.groupDataByRow[row]['小计'] = [{level:2}];
                                this.groupDataByRow['小计'] = [{level:3}];
                                                             
                            }else{
                                this.groupDataByRow[row][ secondRow ]['小计'] = [{level:0}];
                                this.groupDataByRow[row]['小计'] = [{level:1}];  
                                this.groupDataByRow['小计'] = [{level:2}];
                            }
                        }
                                                
                    }else{                                               
                        this.groupDataByRow[row]['小计'] = [{level:0}];
                        this.groupDataByRow['小计'] = [{level:1}];
                    }
                }
                
            }else{
                this.groupDataByRow['小计'] = [{level:0}];
            }
        }
        //console.log( groupDataByRow );        
        this.renderTableBodySection( toggleRows ); /** 处理行头 **/        
        this.createPivotTableWith( this.heads.concat(), this.bodys.concat() );
    },
    /** 处理表头 groupDataByHead **/
    renderTableHeadSection : function( cfg ){
        var self = this;
        var headColsMap = {};  // 表头跨列区域对应表
        var headDimentsions = this.headDimentsions;
        var rowDimensions = this.rowDimensions;
        var measures = this.measures;
        var showGroupDataByHead = $.extend( true,{}, self.groupDataByHead );   
        // 处理表头收缩 
        $.each( cfg, function( c, toggle){
            var togglePath = toggle.split('+');
            if( togglePath.length == 0 ){
                return true;
            }
            if( togglePath.length == 1 ){
                var toggleFirst = togglePath[0];
                if( !self.groupDataByHead[toggleFirst] ){return true;}
                if( headDimentsions.length == 2){
                    showGroupDataByHead[toggleFirst] = { 'total' : self.groupDataByHead[toggleFirst]['总计'] };
                }
                if( headDimentsions.length == 3){
                    showGroupDataByHead[toggleFirst] = { 'total' : { 'total' :self.groupDataByHead[toggleFirst]['总计'] }, };
                }
                if( headDimentsions.length == 4){
                    showGroupDataByHead[toggleFirst] =  { 'total' : { 'total' : { 'total' :self.groupDataByHead[toggleFirst]['总计'] }, },};
                }
            }
            if( togglePath.length == 2 ){
                var toggleFirst = togglePath[0];
                var toggleSecond = togglePath[1];  
                if( !self.groupDataByHead[toggleFirst] || !self.groupDataByHead[toggleFirst][toggleSecond]){return true;}              
                if( headDimentsions.length == 3){
                    showGroupDataByHead[toggleFirst][toggleSecond] = { 'total' :self.groupDataByHead[toggleFirst][toggleSecond]['总计'] };
                }
                if( headDimentsions.length == 4){
                    showGroupDataByHead[toggleFirst][toggleSecond] =  { 'total' : { 'total' :self.groupDataByHead[toggleFirst][toggleSecond]['总计'] }, };
                }
            }
            if( togglePath.length == 3 ){
                var toggleFirst = togglePath[0];
                var toggleSecond = togglePath[1];
                var toggleThird = togglePath[2];
                if( !self.groupDataByHead[toggleFirst] ||  !self.groupDataByHead[toggleFirst][toggleSecond] ||  !self.groupDataByHead[toggleFirst][toggleSecond][toggleThird]){return true;}  
                if( headDimentsions.length == 4){
                    showGroupDataByHead[toggleFirst][toggleSecond][toggleThird]  =  { 'total' :self.groupDataByHead[toggleFirst][toggleSecond][toggleThird]['总计'] };
                }
            }
        })
        //console.log( showGroupDataByHead );
        //showGroupDataByHead = $.extend( true,{}, groupDataByHead );  
        for( var firstHead in showGroupDataByHead ){
            if( !self.heads[0] ) self.heads[0] = [];
            //var children = _.pairs(groupDataByHead[firstHead])           
            if(!headColsMap[firstHead]){ headColsMap[firstHead] = 0; }

            if( !_.isArray( showGroupDataByHead[firstHead] ) ){  
                // 表头超过一级              
                for( var secondHead in showGroupDataByHead[firstHead] ){
                    if( !self.heads[1] ) self.heads[1] = [];
                    if(!headColsMap[firstHead + '+' +secondHead]){ headColsMap[firstHead + '+' +secondHead] = 0; }

                    if( !_.isArray( showGroupDataByHead[firstHead][secondHead] ) ){
                        // 表头超过二级 
                        for( var thirdHead in showGroupDataByHead[firstHead][secondHead] ){
                            if( !self.heads[2] ) self.heads[2] = [];
                            if(!headColsMap[firstHead + '+' +secondHead + '+' + thirdHead]){ headColsMap[firstHead + '+' +secondHead + '+' + thirdHead] = 0;}

                            if( !_.isArray( showGroupDataByHead[firstHead][secondHead][thirdHead] ) ){
                                // 表头超过三级 为四级 或 总计
                                if( !self.heads[3] ) self.heads[3] = [];
                                for( var forthHead in showGroupDataByHead[firstHead][secondHead][thirdHead] ){
                                    if( !self.heads[4] ) self.heads[4] = [];
                                    if(!headColsMap[firstHead + '+' +secondHead + '+' + thirdHead + '+' + forthHead]){ headColsMap[firstHead + '+' +secondHead + '+' + thirdHead + '+' + forthHead] = 0;}
                                    
                                    headColsMap[firstHead + '+' +secondHead + '+' + thirdHead + '+' + forthHead] += measures.length;
                                    headColsMap[firstHead + '+' +secondHead + '+' + thirdHead] += headColsMap[firstHead + '+' +secondHead + '+' + thirdHead + '+' + forthHead];
                                    if( secondHead.indexOf('总计') > -1 ){
                                        $.each( measures, function(mk, mv){
                                            self.heads[4].push( {'name':mv,'value':mv,'parent':firstHead + '+' +secondHead + '+' + thirdHead + '+' + forthHead,'cols':1, 'level':0});
                                        })  
                                        self.heads[3].push( {'name':forthHead,'parent':firstHead + '+' + secondHead + '+' + thirdHead ,'level':0,'cols':headColsMap[firstHead + '+' + secondHead + '+' + thirdHead + '+' + forthHead],'rows':headDimentsions.length -3});
                                    }else{
                                        $.each( measures, function(mk, mv){
                                            self.heads[4].push( {'name':mv,'value':mv,'parent':firstHead + '+' +secondHead + '+' + thirdHead + '+' + forthHead,'cols':1, 'level':0,});
                                        })  
                                        self.heads[3].push( {'name':forthHead,'value':forthHead,'parent':firstHead + '+' + secondHead + '+' + thirdHead ,'cols':headColsMap[firstHead + '+' + secondHead + '+' + thirdHead + '+' + forthHead],'level':0,});
                                    }
                                }
                                headColsMap[firstHead + '+' +secondHead] += headColsMap[firstHead + '+' +secondHead + '+' + thirdHead];
                                self.heads[2].push( {'name':thirdHead,'value':thirdHead,'parent':firstHead + '+' +secondHead,'cols':headColsMap[firstHead + '+' +secondHead + '+' + thirdHead], 'level':1,} );
                            }else{
                                // 表头只有三级 或 总计
                                if( !self.heads[3] ) self.heads[3] = [];
                                                                
                                headColsMap[firstHead + '+' + secondHead + '+' + thirdHead] += measures.length;
                                headColsMap[firstHead + '+' + secondHead] += headColsMap[firstHead + '+' + secondHead + '+' + thirdHead];

                                if( thirdHead.indexOf('总计') > -1 ){
                                    $.each( measures, function(mk, mv){
                                        self.heads[self.heads.length-1].push( {'name':mv,'value':mv,'parent':firstHead + '+' +secondHead + '+' + thirdHead,'cols':1, 'level':0});
                                    })
                                    self.heads[2].push( {'name':thirdHead,'value':thirdHead,'parent':firstHead + '+' +secondHead ,'cols':measures.length, 'rows':headDimentsions.length -2, 'level':1});
                                }else{
                                    $.each( measures, function(mk, mv){
                                        self.heads[3].push( {'name':mv,'value':mv,'parent':firstHead + '+' +secondHead + '+' + thirdHead,'cols':1,'level':0});
                                    })
                                    self.heads[2].push( {'name':thirdHead,'value':thirdHead,'parent':firstHead + '+' +secondHead ,'cols':headColsMap[firstHead + '+' +secondHead + '+' + thirdHead],'level':2});
                                }
                            }                            
                        }
                        headColsMap[firstHead] += headColsMap[firstHead + '+' +secondHead];
                        self.heads[1].push( {'name':secondHead,'value':secondHead,'parent':firstHead,'cols':headColsMap[firstHead + '+' +secondHead]} );
                    }else{                        
                        // 表头只有二级 或 总计
                        if( !self.heads[2] ) self.heads[2] = [];
                        //self.heads[2].push( {'name':'总计','cols':1});
                        if( secondHead.indexOf('总计') > -1 ){

                            $.each( measures, function(mk, mv){
                                self.heads[self.heads.length-1].push( {'name':mv,'value':mv,'cols':1,'parent':firstHead + '+' +secondHead});
                            }) 
                            headColsMap[firstHead + '+' +secondHead] += measures.length;
                            headColsMap[firstHead] += headColsMap[firstHead + '+' +secondHead];
                            self.heads[1].push( {'name':secondHead, 'parent':firstHead, 'value':secondHead,cols:2,'rows':headDimentsions.length -1,'cols':measures.length, 'level':headDimentsions.length-1 });
                        }else{
                            $.each( measures, function(mk, mv){
                                self.heads[2].push( {'name':mv,'value':mv,'cols':1,'parent':firstHead + '+' +secondHead});
                            }) 
                            headColsMap[firstHead + '+' +secondHead] += measures.length;
                            headColsMap[firstHead] += headColsMap[firstHead + '+' +secondHead];
                            self.heads[1].push( {'name':secondHead,'value':secondHead,'parent':firstHead ,'cols':headColsMap[firstHead + '+' + secondHead],'level':headDimentsions.length-2 });
                        }
                        
                    }                    
                }
                // 特殊处理第一行表头
                self.heads[0].push( {'name':firstHead,'cols':headColsMap[firstHead],'parent':firstHead, 'level':headDimentsions.length-1 });
            }else{                        
                // 表头只有一级 或 总计
                if( !self.heads[1] ) self.heads[1] = [];
                
                if( firstHead.indexOf('总计') > -1 ){
                    $.each( measures, function(mk, mv){
                        self.heads[self.heads.length-1].push( {'name':mv,'value':thirdHead,'cols':1,'parent':firstHead, 'level':0});
                    })
                    //self.heads[1].push( {'name':'总计','cols':1});
                    headColsMap[firstHead] += measures.length;
                    self.heads[0].push( {'name':firstHead,cols:2, 'parent':firstHead,'rows':headDimentsions.length, 'cols':measures.length, 'level':headDimentsions.length-1 });
                }else{
                    $.each( measures, function(mk, mv){
                        self.heads[1].push( {'name':mv,'cols':1,'parent':firstHead});
                    })
                    //self.heads[1].push( {'name':'总计','cols':1});
                    headColsMap[firstHead] += measures.length;
                    self.heads[0].push( {'name':firstHead, 'parent':firstHead,'cols':headColsMap[firstHead],'level':headDimentsions.length-1 ,});
                }              
            }
        }

        var lastHead = self.heads.length - 1;  
        //console.log( self.heads );
        $.each( self.heads, function(level, head){  
            head.unshift( {'name':headDimentsions[level],'cols':1} );            
        });
        // 特殊处理表头最后一行第一个列名位置
        if( rowDimensions.length > 3 ){
            self.heads[lastHead].unshift( {'name':rowDimensions[3]} );
        }
        if( rowDimensions.length > 2 ){
            self.heads[lastHead].unshift( {'name':rowDimensions[2]} );
        }
        if( rowDimensions.length > 1 ){
            self.heads[lastHead].unshift( {'name':rowDimensions[1]});
        }
        self.heads[lastHead].unshift( {'name':rowDimensions[0]} );

        // 特殊处理表头第一行第一个位置空白格
        self.heads[0].unshift( {'name': '', 'rows':headDimentsions.length, 'cols': rowDimensions.length});

    },
    /** 处理行头 groupDataByRow **/
    renderTableBodySection : function( cfg ){
        var groupDataByRow = this.groupDataByRow;
        var rowDimensions = this.rowDimensions;
        var rowRowsMap = {};  // 列头跨行区域对应表
        var showGroupDataByRow = $.extend( true,{}, groupDataByRow );
        $.each( cfg, function( k, toggle ){
            var togglePath = toggle.split('+');
            if( togglePath.length == 0 ){
                return true;
            }
            if( togglePath.length == 1 ){
                var toggleFirst = togglePath[0];
                if( !groupDataByRow[toggleFirst] ){return true;}
                if( rowDimensions.length == 2){
                    showGroupDataByRow[toggleFirst] = { 'total' : groupDataByRow[toggleFirst]['小计'] };
                }
                if( rowDimensions.length == 3){
                    showGroupDataByRow[toggleFirst] =  { 'total' : { 'total' :groupDataByRow[toggleFirst]['小计'] }, };
                }
                if( rowDimensions.length == 4){
                    showGroupDataByRow[toggleFirst] =  { 'total' : { 'total' : { 'total' :groupDataByRow[toggleFirst]['小计'] }, },};
                }
                //showGroupDataByRow[toggleFirst] = { 'total' : groupDataByRow[toggleFirst]['小计'] };

            }
            if( togglePath.length == 2 ){
                var toggleFirst = togglePath[0];
                var toggleSecond = togglePath[1]; 
                if( !groupDataByRow[toggleFirst] || !groupDataByRow[toggleFirst][toggleSecond] ){return true;}               
                if( rowDimensions.length == 3){
                    showGroupDataByRow[toggleFirst][toggleSecond] = { 'total' :groupDataByRow[toggleFirst][toggleSecond]['小计'] };
                }
                if( rowDimensions.length == 4){
                    showGroupDataByRow[toggleFirst][toggleSecond] =  { 'total' : { 'total' :groupDataByRow[toggleFirst][toggleSecond]['小计'] }, };
                }
                
            }
            if( togglePath.length == 3 ){
                var toggleFirst = togglePath[0];
                var toggleSecond = togglePath[1];
                var toggleThird = togglePath[2];
                if( !groupDataByRow[toggleFirst] || !groupDataByRow[toggleFirst][toggleSecond] || !groupDataByRow[toggleFirst][toggleSecond][toggleThird] ){return true;}    
                if( rowDimensions.length == 4){
                    showGroupDataByRow[toggleFirst][toggleSecond][toggleThird]  =  { 'total' :groupDataByRow[toggleFirst][toggleSecond][toggleThird]['小计'] };
                }
            }


        })
        //console.log( showGroupDataByRow );
        //showGroupDataByRow = $.extend( true,{}, groupDataByRow );      
        for( var firstRow in showGroupDataByRow ){
            var rowBody = [];
            if(!rowRowsMap[firstRow]){ rowRowsMap[firstRow] = 0; }
            if( !_.isArray( showGroupDataByRow[firstRow] ) ){
                // 左侧行头超过一级

                for( var secondRow in showGroupDataByRow[firstRow] ){ 
                    var secondRowBody = []; 
                    if(!rowRowsMap[firstRow + '+' + secondRow]){ rowRowsMap[firstRow + '+' + secondRow] = 0; }
                    if( !_.isArray( showGroupDataByRow[firstRow][secondRow] ) ){
                        // 左侧行头超过两级

                        for( var thirdRow in showGroupDataByRow[firstRow][secondRow] ){
                            var thirdRowBody = [];
                            if(!rowRowsMap[firstRow  + '+' + secondRow  + '+' + thirdRow]){ 
                                rowRowsMap[firstRow  + '+' + secondRow  + '+' + thirdRow] = 0; 
                            }                           
                            
                            if( !_.isArray( showGroupDataByRow[firstRow][secondRow][thirdRow] ) ){

                                // 左侧行头超过三级
                                for( var forthRow in showGroupDataByRow[firstRow][secondRow][thirdRow] ){
                                    if(!rowRowsMap[firstRow  + '+' + secondRow  + '+' + thirdRow + '+' + forthRow]){ 
                                        rowRowsMap[firstRow  + '+' + secondRow  + '+' + thirdRow + '+' + forthRow] = 1; 
                                    }
                                    
                                    if( thirdRow.indexOf('小计') > -1  ){    
                                    // 行头为 小计                        
                                        thirdRowBody.push([ {'name':forthRow, 'value':forthRow,'parent':firstRow + '+' + secondRow + '+' + thirdRow,'cols':2}]);
                                    }else{
                                        thirdRowBody.push([ {'name':forthRow, 'value':forthRow,'cols':2,'parent':firstRow + '+' + secondRow + '+' + thirdRow,cols:2}]);
                                    } 
                                    //thirdRowBody.push([ {'name':forthRow,'value':forthRow,'cols':2,'parent':firstRow + '+' + secondRow + '+' + thirdRow}]);
                                    rowRowsMap[firstRow  + '+' + secondRow  + '+' + thirdRow] += rowRowsMap[firstRow  + '+' + secondRow  + '+' + thirdRow + '+' + forthRow]; 
                                }
                                // 遍历完之后组装次次第一行第三级表头
                                var tempCols =  firstRow.indexOf('total') < 0 ? 1 : rowDimensions.length;
                                if( thirdRowBody[0] ){
                                    thirdRowBody[0].unshift({'name':thirdRow,'cols':1,'parent':firstRow + '+' + secondRow + '+' + thirdRow,'rows':rowRowsMap[firstRow  + '+' + secondRow  + '+' + thirdRow], 'cols':tempCols,});
                                }else{
                                    thirdRowBody[0]= [{'name':thirdRow,'cols':1,'parent':firstRow + '+' + secondRow + '+' + thirdRow,'rows':rowRowsMap[firstRow  + '+' + secondRow  + '+' + thirdRow], 'cols':tempCols,}];
                                }
                                
                                //thirdRowBody.push({'name':'小计','cols':3,'parent':firstRow + '+' + secondRow + '+' + thirdRow});
                                secondRowBody = secondRowBody.concat( thirdRowBody ); 
                            }else{
                                // 左侧行头只有三级 或 小计3
                                //bodys.push([ {'name':firstRow}, {'name':secondRow}, {'name':thirdRow,'cols':2}]);
                                rowRowsMap[firstRow  + '+' + secondRow  + '+' + thirdRow] ++;   
                                if( thirdRow.indexOf('小计') > -1  ){    
                                    // 行头为 小计                        
                                   
                                    secondRowBody.push([ {'name':thirdRow, 'value':thirdRow,'parent':firstRow + '+' + secondRow,'cols':rowDimensions.length - 1}]);
                                }else{

                                    secondRowBody.push([ {'name':thirdRow, 'value':thirdRow,'cols':2,'parent':firstRow + '+' + secondRow,}]);
                                }                       
                                

                            }                            
                            rowRowsMap[firstRow + '+' + secondRow] += rowRowsMap[firstRow  + '+' + secondRow  + '+' + thirdRow];

                        }
                        // 遍历完之后组装次第一行第二级表头 
                        var tempCols =  secondRow.indexOf('total') < 0 ? 1 : thirdRow && thirdRow.indexOf('total') < 0 ? rowDimensions.length : 1;
                        if( secondRowBody[0] ){
                            secondRowBody[0].unshift({'name':secondRow,'cols':1,'parent':firstRow ,'rows':rowRowsMap[firstRow + '+' + secondRow], 'cols':tempCols,});
                        }else{
                            secondRowBody[0] = [{'name':secondRow,'cols':1,'parent':firstRow ,'rows':rowRowsMap[firstRow + '+' + secondRow], 'cols':tempCols,}];
                        }
                        
                    }else{
                        // 左侧行头只有两级 或 小计2
                        rowRowsMap[firstRow + '+' + secondRow] ++;
                        if( secondRow.indexOf('小计') > -1 ){    
                            // 行头为 小计                        
                            //secondRowBody.push([ {'name':secondRow,'parent':firstRow ,'cols':rowDimensions.length + 1}]);
                            secondRowBody.push([ {'name':secondRow,'parent':firstRow ,'cols':rowDimensions.length}]);
                        }else{
                            var tempCols =  secondRow.indexOf('total') < 0 ? 2 : rowDimensions.length;
                            secondRowBody.push([ {'name':secondRow,'parent':firstRow ,'cols':tempCols}]);
                        }

                    }

                    rowRowsMap[firstRow] += rowRowsMap[firstRow + '+' + secondRow];
                    rowBody = rowBody.concat( secondRowBody ); 
                }
                // 遍历完之后组装第一行第一级表头
                var tempCols =  firstRow.indexOf('total') < 0 ? 1 : rowDimensions.length;
                if( rowBody[0] ){
                    rowBody[0].unshift({'name':firstRow,'cols':tempCols,'rows':rowRowsMap[firstRow], 'parent': 'none'});   
                }else{
                    rowBody[0] = [{'name':firstRow,'cols':tempCols,'rows':rowRowsMap[firstRow], 'parent': 'none'}];  
                }
                

            }else{
                // 左侧行头只有一级
                rowRowsMap[firstRow] ++;                
                if( firstRow.indexOf('小计') > -1 ){    
                    // 行头为 小计                        
                    rowBody.push([ {'name':firstRow,'cols':rowDimensions.length + 1, 'parent': 'none'}]);
                }else{
                    rowBody.push([ {'name':firstRow,'cols':2, 'parent': 'none'}]);
                }
            }           
            
            this.bodys = this.bodys.concat(rowBody);
        }
    },
    //根据行列表头组装表格内容
    createPivotTableWith : function( headDatas, rowDatas ){
        var self = this;
        // 根据行列表头组装表格内容
        var lastHead = headDatas[ headDatas.length-1 ];
        var firstColIndex = this.rowDimensions.length + 1;
        var renderBodys = [];
        $.each( rowDatas, function( bi,bodyrow ){            
            var lastRowIndex = bodyrow.length - 1;
            for(var hi = firstColIndex; hi < lastHead.length; hi ++ ){
                // 构造交叉表格的行列对应内容
                var headObj = lastHead[hi];                
                var measure = headObj.name;
                var headParents = headObj.parent || '';
                var headDims = headParents.split('+');
                var rowObj = bodyrow[lastRowIndex];
                var rowTag = rowObj.name;
                var rowParents = rowObj.parent || rowTag;
                var rowDims = (rowParents + '+' + rowTag).split('+');
                var valueParse = {};
                //console.info( rowDims );
                $.each( self.rowDimensions, function( r, row){
                    valueParse[row] = rowDims[r] || '';
                })
                $.each( self.headDimentsions, function( h, head){
                    valueParse[head] = headDims[h] || '';
                })
                valueParse[measure] = '';
                //console.log( JSON.stringify(valueParse) )
                var value = self.getMeasureValueByParse( valueParse, measure );
                //console.log( bodyrow[firstColIndex -1].name);
                //console.log( lastHead[hi].name );
                bodyrow.push({
                    'head':'head' + hi,
                    'row':'row' + bi,
                    //'name':bodyrow[firstColIndex -1].name + ',' + lastHead[hi].name,
                    'name':value,
                    'value':'',
                });
            }
        })        

        self.renderTableByData({
            heads: headDatas,
            bodys: rowDatas
        })
        //optionRowData.defaultData.headData = optionRowData.defaultData.headData.concat( headDatas );
        //optionRowData.defaultData.bodyData = optionRowData.defaultData.bodyData.concat( bodys );
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
                var data_parent = $(this).attr('data-parent');
                var data_value = $(this).attr('data-value');
                var match = (data_parent && data_parent != data_value && data_parent != 'none') ? (data_parent + '+' + data_value) : data_value;
                if(parent.hasClass('head')){
                    // 总计，度量，最后一级维度，空的不可点
                    if(match.split('+').length >= self.headDimentsions.length || $(this).text() == '总计')  return;
                    var idx = _.indexOf(self.closeItems.headClose, match);
                    if(idx > -1){
                        self.closeItems.headClose.splice(idx, 1);
                    }else{
                        self.closeItems.headClose.push(match);
                    }

                }else{
                    // 小计，数字，最后一级维度，空的不可点
                    if(match.split('+').length >= self.rowDimensions.length || $(this).text() == '小计')  return;
                        // if(data_parent != 'none') return;
                    var idx = _.indexOf(self.closeItems.bodyClose, match);
                    if(idx > -1){
                        self.closeItems.bodyClose.splice(idx, 1);
                    }else{
                        self.closeItems.bodyClose.push(match);
                    }
                }
                self.setData({
                    'headDimNum': self.headDimNum,
                    'toggle': self.closeItems,
                })
                self.resetStyle();
            });

        $('.transverseRollingWrap').off().on('scroll', function(){
            $('.bodyLeftFixed').css('margin-top', -$(this).scrollTop() + 'px');
            $('.headRightFixed').css('margin-left', -$(this).scrollLeft() + 'px');
        })
        /*下面需要再次绑定，因为bindEvent中，$(document).on('scroll'。。。)这种写法无效，因为document不能滚动所以不能绑定scroll事件*/
    },
    setData : function( cfg ){
        this.initData();
        var headDimNum = cfg.headDimNum || 1;
        var toggleCfg = $.extend( true, {}, cfg.toggle );
        this.constructDimentsions( headDimNum );  // 结构化维度数据    
        this.constructPivotTable( toggleCfg ); // 构成交叉表格的行头表头
    },
    resetStyle: function(){
        var self = this;
        var $bodyLeftFixed = $('.bodyLeftFixed');
        var $defaultTable = $('.defaultTable');
        var height = $bodyLeftFixed.height() < self.height ? $bodyLeftFixed.height() : self.height;
        var width = $defaultTable.width() < self.width ? $defaultTable.width() : self.width;
        self.wrap.width(width);
        self.wrap.height(height);
        $('.transverseRollingWrap').height(height);
    },
    setStyle: function(){
        
    },
    render: function() {
        var self = this;
        var html = $.templates(template)(this.optionData);
        this.wrap.html(html);
        this.bindEvent();       /*需要再次绑定，因为bindEvent中，$(document).on('scroll'。。。)这种写法无效，因为document不能滚动所以不能绑定scroll事件*/
        if(!this.width){
            this.width = this.wrap.width();
            this.height = this.wrap.height();
        }
    },
});

// return Pivottable;
// });



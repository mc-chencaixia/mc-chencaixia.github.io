

/*
 * 医疗可视化平台-tab条组件
 * date：2017-05-08
 * author: tangb
 */

var TabList = function(){
    if( !(this instanceof TabList) ){
        return new TabList();
    }
}

TabList.prototype = $.extend( new MCBASE(),{
    defaultOption : {
        'id': 1,
        'dom': '',
        'clickCallback': '',
        'initial': '',
        'option': {
            'data': [
                {text:'报表名称嘿嘿1',id:'1'},
                {text:'报表名称嘿嘿2',id:'2'},
                {text:'报表名称嘿嘿3',id:'3'},
                {text:'报表名称嘿嘿4',id:'4'},
                {text:'报表名称嘿嘿5',id:'5'},
                {text:'报表名称嘿嘿6',id:'6'},
                {text:'报表名称嘿嘿7',id:'7'},
                {text:'报表名称嘿嘿8',id:'8'},
                {text:'报表名称嘿嘿9',id:'9'},
                {text:'报表名称嘿嘿10',id:'10'},
                {text:'报表名称嘿嘿11',id:'11'},
                {text:'报表名称嘿嘿12',id:'12'},
                {text:'报表名称嘿嘿13',id:'13'}
            ],
        }
    },
    version:'0.0.1',
    init: function(cfg){        
        cfg = cfg || {};                
        cfg.option = cfg.option || {};
        this.setOption( cfg.option );
        if( cfg.dom ){
            this.setDom( cfg.dom );             
        }
        if( cfg.clickCallback ){
            this.setClickCallback( cfg.clickCallback );
        }
        if( cfg.initial ){
            cfg.initial.call(this);
        }
    },
    setClickCallback:function( fn ){
        this.clickCallback = fn || null;    
    },
    setDom: function( dom ){
        this.wrap = this._setDom( dom );
        if( !this.wrap ){
            throw new Error('配置项缺失');
            return false;
        }
        //this.bindEvent();
        this.render();
    },
    setOption: function( option ){
        option = _.defaults( option, this.defaultOption );
        this.option = $.extend( this.option || {}, option );
        this.setData(this.option.data);
    },
    setData: function( data ){
        data = data || {};
        this.option.data = $.extend( this.option.data , data );
    },
    render: function( data ){
        var imgs = {
            'li-down.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAAXNSR0IArs4c6QAAAY1JREFUSA1jlN44+T8DWYDxCyMDw1UGJsa5T3yzZ8OMYAQZ+NQ/FyhHGpDfMVPy/+8/Jv/+/Sv9z8j4i5WZMeaBd/YLBvJdCHFAw///TLKbprRKb5qyByTCRJq7MFU3MDL+S/bNrmX8/59NZvPUVIoNBFkBMpSJiamb4d//ZKoYCDKUkZXlDDB2talm4EOP9OcMDP95qGYgyJUgMGogJBxgpPbVVWwwNozGJgaTA9F4w/Dj3VfnpDfP0IdpALFBYjA+NpoFmyBMDJiuOhn+/9kDzAG9DP9B4E8JUKwIJo+NxuvCp345iznYGY2AOcANqNkDxAaJYTMIJobXhSBFd92zHwMpJ5gGQjReF8psmrxNYetUCZghIDZIDMbHRhNwIePp33//XZLePDULpBnInsbIwDgdm0EwMbwGPvHLqZfdNHXL////loI0MDIweT/2yz4N04yNxmsgSAPIAJljq8BJ57FV2HdshiCLETQQpPgJEQbBDMUbKTBFpNCjBpISWtjVjsAwBLdtsIcGeaIA0Kx/gZwF+TUAAAAASUVORK5CYII=',
            'li-up.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAAXNSR0IArs4c6QAAATFJREFUSA1jlN44+T8DWYDxH1DbGyYGximP/bObYUYwkm8gzAgGhv+MjA9Z2VgtH3qkP2dCCJPPYvz/X/73r9/HQSZQxYUwpzAxMNVRxYUwA/8x/M+hqoFAg0WobOB/JiobyMAwaiAsAaDSrIxMDCBMDCCoSotPmGGHfTgYg9iEAAs+BVkqRgwZyoYMjVePgJWtsAxgmHn3PMPUO+dwasNroIOYHIP7wZUMz398ARtw7M1ThglGLngNpGpeBtlKMAxF2bkYFpn7gjGITQjgNdBbUplhj0Mkw8UPL8EYxAaJ4QN4w7Bc05Ih7uRmoGGvwGbsefmAYbKRG8PW53dxmok3DDmYmBl+/PuLohmbGLICvF5GNwykEZsY0QYiKySWjdeFxBqCrG7UQOTQII89AsMQAGMlWX8O4vUfAAAAAElFTkSuQmCC'
        }
        if( !this.option || !this.option.data ){
            this.option = $.extend({}, this.defaultOption);
        }
        // if( !data && !this.data && !this.option.data && !this.option.data.length ){
        if( !data && $.isEmptyObject(this.option)){
            this.wrap.html('暂无数据');
            return false;
        }
        
        var template = '<ul class="list-group clearfix" style="margin-top:0px">\
            <% for(var i=0;i<obj.length;i++){ %>\
                <% if(i<=7){ %>\
                    <li class="list-group-item mc-list-item <%if(obj[i].selected){%> light<%}%>" data-index="<%=i%>">\
                        <span class="list-item-text"><%=obj[i]["text"]%></span>\
                        <span class="mc-icon-delete tablist-event-del">x</span>\
                    </li>\
                <% } %>\
            <% } %>\
            <% if(obj.length>7) { %>\
                <li class="list-group-item mc-list-drop">\
                    <div class="btn-group">\
                      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="padding: 0px;border: none;">\
                        <img src="'+imgs['li-down.png']+'"/>\
                      </button>\
                      <ul class="dropdown-menu mc-dropdown-menu">\
                        <% for(var i=8;i<obj.length;i++){ %>\
                            <li class="mc-dropbar-item" data-index="<%=i%>"><div href="#" class="mc-dropbar-text"><%=obj[i]["text"]%></div><span class="mc-dropbar-del tablist-event-del">x</span></li>\
                        <% } %>\
                      </ul>\
                    </div>\
                </li>\
            <% } %>\
        </ul>'
        var renderData = _.compact(data || this.option.data);
        renderData.map(function(n, i) {
            n.selected = false;
            if(!i){
                n.selected = true;
            }
            return n;
        })
        var html = _.template(template)(renderData);
        this.wrap.html( html );
        var that = this;
        this.wrap.off();
        this.wrap.on('show.bs.dropdown', function(){
            that.wrap.find(".dropdown-toggle img").attr('src', imgs['li-up.png']);
        });
        this.wrap.on('hide.bs.dropdown', function(){
            that.wrap.find(".dropdown-toggle img").attr('src', imgs['li-down.png']);
        });
        this.wrap.on('click','.mc-dropbar-item', function(){
            var index = $(this).attr('data-index');
            that.option.data.map(function(obj){
                obj.selected = false; 
                return obj;
            });
            var tmp = that.option.data[index];
            tmp.selected = true;
            that.option.data.splice(index,1);
            that.option.data.unshift(tmp);
            if(that.clickCallback) {
                that.clickCallback.call($(this),tmp);
            }
            that.render();
        });
        this.wrap.on('click', '.mc-list-item', function(){
            var index = $(this).attr('data-index');
            var tmp = that.option.data[index];
            $('.mc-list-item').removeClass('light');
            $(this).addClass('light');
            if(that.clickCallback) {
                that.clickCallback.call($(this),tmp);
            }
        })
        this.wrap.on('click', '.tablist-event-del', function(e){
            var index = $(this).parent().attr('data-index');
            var tmp = that.option.data[index];
            that.option.data.splice(index,1);
            that.render();
            return false;
        })
    },    
});
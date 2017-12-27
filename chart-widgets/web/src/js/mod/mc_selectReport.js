

/*
 * 医疗可视化平台-tab条组件
 * date：2017-05-08
 * author: tangb
 */

var SelectReport = function(){
    if( !(this instanceof SelectReport) ){
        return new SelectReport();
    }
}

SelectReport.prototype = $.extend( new MCBASE(),{
    defaultOption : {
        'id': 1,
        'dom': '',
        'clickCallback': '',
        'initial': '',
        'option': {
            'data': [
                {
                    module:'模块嘿嘿1',
                    id:'1', 
                    report:[
                        {report: '报表嘿嘿11',id: '11'},
                        {report: '报表嘿嘿12',id: '12'},
                        {report: '报表嘿嘿13',id: '13'},
                        {report: '报表嘿嘿14',id: '14'},
                        {report: '报表嘿嘿15',id: '15'},
                        {report: '报表嘿嘿16',id: '16'},
                        {report: '报表嘿嘿17',id: '17'},
                        {report: '报表嘿嘿18',id: '18'},
                        {report: '报表嘿嘿19',id: '19'},
                        {report: '报表嘿嘿110',id: '20'}
                    ]
                },
                {
                    module:'模块嘿嘿2',
                    id:'2', 
                    report:[
                        {report: '报表嘿嘿21',id: '11'},
                        {report: '报表嘿嘿22',id: '12'},
                        {report: '报表嘿嘿23',id: '13'},
                        {report: '报表嘿嘿24',id: '14'},
                        {report: '报表嘿嘿25',id: '15'},
                        {report: '报表嘿嘿26',id: '16'},
                        {report: '报表嘿嘿27',id: '17'},
                        {report: '报表嘿嘿28',id: '18'},
                        {report: '报表嘿嘿29',id: '19'},
                        {report: '报表嘿嘿210',id: '20'}
                    ]
                },
                {
                    module:'模块嘿嘿1',
                    id:'3', 
                    report:[
                        {report: '报表嘿嘿31',id: '11'},
                        {report: '报表嘿嘿32',id: '12'},
                        {report: '报表嘿嘿33',id: '13'},
                        {report: '报表嘿嘿34',id: '14'},
                        {report: '报表嘿嘿35',id: '15'},
                        {report: '报表嘿嘿36',id: '16'},
                        {report: '报表嘿嘿37',id: '17'},
                        {report: '报表嘿嘿38',id: '18'},
                        {report: '报表嘿嘿39',id: '19'},
                        {report: '报表嘿嘿310',id: '20'}
                    ]
                }
            ]
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
        this.selectedIndex = 0;
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
        
        if( !this.option || !this.option.data ){
            this.option = $.extend({}, this.defaultOption);
        }
        // if( !data && !this.data && !this.option.data && !this.option.data.length ){
        if( !data && $.isEmptyObject(this.option)){
            this.wrap.html('暂无数据');
            return false;
        }
        data = data || this.option.data || [];
        var template1 = '<div class="report-panel report-panel-handler" style="display: none;">\
                <table style="width: 100%;">\
                    <tr>\
                        <td style="width: 60px; text-align: right;">模块:</td>\
                        <td>\
                            <div class="btn-group mc-dim-group">\
                                <% for(var i=0; i<obj.length; i++){ %>\
                                <button type="button" class="btn btn-default mc-dim-btn <%if(i==0){%>active<%}%> mc-dim-module" data-index="<%=i%>"><%=obj[i]["module"]%></button>\
                                <% } %>\
                            </div>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td>报表名称:</td>\
                        <td>\
                            <div class="btn-group mc-dim-group" id="J_select_report_child">\
                                <% if(obj[0]["report"].length>0){ %>\
                                <% for(var i=0;i<obj[0]["report"].length;i++){ %>\
                                <button type="button" class="btn btn-default mc-dim-btn mc-dim-report" data-index="<%=i%>"><%=obj[0]["report"][i]["report"]%></button>\
                                <% } %>\
                                <% } %>\
                            </div>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="text-align: right;">\
                            <a class="btn btn-default mc-dim-btn mc-ok-btn">确定</a>\
                        </td>\
                    </tr>\
                </table>\
            </div>';
        var template2 = '<% if(obj["report"].length>0){ %>\
                        <% for(var i=0;i<obj["report"].length;i++){ %>\
                        <button type="button" class="btn btn-default mc-dim-btn" data-index="<%=i%>"><%=obj["report"][i]["report"]%></button>\
                        <% } %>\
                        <% } %>';
        var html = _.template(template1)(data);
        $(".report-panel-handler").remove();
        this.wrap.append( html );
        var that = this;
        this.wrap.off();
        this.wrap.on('click', ".mc-dim-module", function() {
            var index = $(this).attr("data-index");
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            that.selectedIndex = +index;
            var module = that.option.data[index];
            var buttons = _.template(template2)(module);
            $("#J_select_report_child").off().empty().html(buttons);
        })

        this.wrap.on('click', '.mc-dim-report', function () {
            var index = $(this).attr("data-index");
            var report = that.option.data[that.selectedIndex]['report'][index];
            if(that.clickCallback) {
                that.clickCallback.call(that, report);
            }
        })

        this.wrap.on('click', '.mc-ok-btn', function() {
            $(".report-panel-handler").slideToggle().promise().done(function(){
                that.render();
            });
        })
    }    
});


/*
 * 医疗可视化平台-透视表
 * date：2017-01-04
 * 
 */
var Pivotable = function(){
    if( !(this instanceof Pivotable) ){
        return new Pivotable();
    }
}

var template =  '<div class="wrap">' +
                    '<div class="chooseDate"><p title="">选择日期</p><span class="j-open"></span></div>' +
                    '<div class="dropDown">' +
                        '<ul class="calendarTab">' +
                            '<li class="active" data-flag="day">年月日</li>' + 
                            '<li data-flag="month">年月</li>' + 
                            '<li data-flag="year">年</li>' + 
                        '</ul>' +
                        '<div class="mc_calendar"></div>' +
                    '</div>' +
                '</div>';
                    
var calendarTemp =  '<div class="selectContent"></div>' +
                    '<table>' + 
                        '{{if ymdFlag == "day"}}' +
                            '<thead>' + 
                                '<tr class="weekContent">' +
                                    '{{for week}}' +
                                        '<th>{{>#data}}</th>' +
                                    '{{/for}}' +
                                '</tr>' +
                            '</thead>' +
                        '{{/if}}' +
                        '<tbody class="dateContent"></tbody>' +
                    '</table>' +
                    '<div class="bottomInfo">' +
                        '<p>已选择：</p>' +
                        '<p class="selInfo"></p>' +
                        '<div class="btns">' +
                            '<button class="j-clear clear" data-flag="{{:ymdFlag}}">清除</button>' +
                            '<button class="j-confirm confirm">确定</button>' +
                        '</div>' +
                    '</div>';

   
                        
var selInfoTemp =   '{{for selInfo}}' +
                        '{{>#data}}{{if #index!=~root.selInfo.length-1}}, {{/if}}' +
                    '{{/for}}';
  
var dateContentTemp =   '{{if ymdFlag == "month"}}' + 
                            '{{for dates}}' +
                                '<tr>' +
                                    '{{for #data}}' + 
                                        '<td data-year={{:year}} class="{{>~root.ymdFlag}} {{>isSelected}}" >{{:month}}</td>' + 
                                    '{{/for}}' +
                                '</tr>' +
                            '{{/for}}' + 
                        '{{else ymdFlag == "day"}}' +
                            '{{for dates}}' +
                                '<tr>' +
                                    '{{for #data}}' + 
                                        '<td data-year={{:year}} data-month={{:month}} class="{{>disabled}} {{>selectModal}} {{>flag}} {{>~root.ymdFlag}} {{>isSelected}}">{{:day}}</td>' + 
                                    '{{/for}}' +
                                '</tr>' +
                            '{{/for}}' + 
                        '{{else}}' +
                            '{{for dates}}' +
                                '<tr>' +
                                    '{{for #data}}' + 
                                        '<td class="{{>isSelected}} {{>~root.ymdFlag}}">{{:year}}</td>' + 
                                    '{{/for}}' +
                                '</tr>' +
                            '{{/for}}' + 
                        '{{/if}}';

var selectContentTemp =    '{{if ymdFlag == "day"}}' +
                                '<div class="yearSel Sel">' + 
                                    '<select name="" id="" class="j-selYear">' + 
                                        '{{for years}}' +
                                            '<option value="{{>#data}}">{{>#data}}</option>' +
                                        '{{/for}}' +
                                    '</select>' +
                                    '<select name="" id="" class="j-selMonth">' +
                                        '{{for months}}' +
                                            '<option value="{{>#data}}">{{>#data}}</option>' +
                                        '{{/for}}' +
                                    '</select>' +
                                '</div>' +
                            '{{else ymdFlag == "month"}}' +
                                '<div class="monthSel Sel">' +
                                    '<select name="" id="" class="j-selYear">' +
                                        '{{for years}}' +
                                            '<option value="{{>#data}}">{{>#data}}</option>' +
                                        '{{/for}}' +
                                    '</select>' +
                                '</div>' +
                            '{{/if}}';




Pivotable.prototype = $.extend( new MCBASE(), {
    init: function(cfg){   
        this.defaultOption = {
            style: {
                'width': '250px',
                // 'min-height': '350px',
            },
            data: {
                year: '',
                month: '',
                years: [],
                months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                selDays: [],
                selMonths: [],
                selYears: [],
                week: ['日', '一', '二', '三', '四', '五', '六'],
                ymdFlag: 'day',
                selectModal: ['continuous', 'discontinuous', 'discontinuous'],
            }
        };       
        cfg = cfg || {};                
        cfg.option = cfg.option || {};
        this.prefixClass = cfg.option.prefixClass || null;
        this.setOption( cfg.option );
        if( cfg.dom ){
            this.setDom( cfg.dom );             
        }
        if( cfg.clickCallback ){
            this.setClickCallback( cfg.clickCallback );
        }   
        this.render();  
        this.bindEvent();    
    },
    setDom: function( dom ){
        this.wrap = this._setDom( dom );
        if( !this.wrap || !this.wrap.length  ){
            console.log('配置项缺失');
            return false;
        }
        if( this.prefixClass && this.prefixClass != ''){
            this.wrap.addClass( this.prefixClass );
        }
    },
    setOption: function( option ){
       // option = _.defaults( option, this.defaultOption );
        option = $.extend( true, this.defaultOption, option );
        this.option = $.extend( this.option, option );        
        this.setData(option.data);
    },
    setData: function( data ){
        data = data || {};
        this.option.data = $.extend( this.option.data , data );
        this.formerData = $.extend(true, {}, this.option.data);
    },
    setClickCallback:function( fn, layout, qlik ){
        this.clickCallback = fn || null;
        this.yjslayout = layout;
        this.yjsqlik = qlik;    
    },
    bindEvent: function(){
        var self = this;
        $(document).on('click', function(){
            //$('.j-clear').trigger('click');
            $('.dropDown').hide();
        })
        this.wrap.off()
        .on('click', '.wrap', function(ev){
            ev.stopPropagation();
        })
    },
    render: function(){
        var html = $.templates(template)();
        this.wrap.html( html ); 
        this.renderCalendar();
    },
});


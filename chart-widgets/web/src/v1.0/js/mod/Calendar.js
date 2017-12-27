

/*
 * 医疗可视化平台-日历
 * date：2017-01-04
 * 
 */
var Calendar = function(){
    if( !(this instanceof Calendar) ){
        return new Calendar();
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




Calendar.prototype = $.extend( new MCBASE(), {
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
        // 下拉选择框
        .on('change', '.j-selYear', function(){
            self.option.data.year = $(this).val();
            self.renderDateContent();
        })
        .on('change', '.yearSel .j-selMonth', function(){
            self.option.data.month = $(this).val();
            self.renderDateContent();
        })
        // 点击td
        .on('click', 'td.day:not(".disabled").discontinuous', function(){
            var data = self.option.data;
            if($(this).hasClass('isSelected')){
                $(this).removeClass('isSelected');
                data.selDays.splice(_.indexOf(data.selDays, $(this).attr('data-year') + '/' + self.completeData($(this).attr('data-month')) + '/' + self.completeData($(this).text())), 1);
            }else{
                $(this).addClass('isSelected');
                data.selDays.push($.trim($(this).attr('data-year') + '/' + self.completeData($(this).attr('data-month')) + '/' + self.completeData($(this).text())));
            }
            $('.selInfo').html($.templates(selInfoTemp)({selInfo: data.selDays}));
        })
        .on('click', 'td.day:not(".disabled").continuous', function(){
            var data = self.option.data;
            $(this).addClass('isSelected');
            data.selDays.push($.trim($(this).attr('data-year') + '/' + self.completeData($(this).attr('data-month')) + '/' + self.completeData($(this).text())));
            if(data.selDays.length > 2){
                data.selDays = [];
                data.selDays.push($.trim($(this).attr('data-year') + '/' + self.completeData($(this).attr('data-month')) + '/' + self.completeData($(this).text())));
                self.renderDateContent();
                $('.selInfo').html('');
            }
            if(data.selDays.length == 2){
                data.selDays = self.getBetweenDateStr(data.selDays[0], data.selDays[1]);
                self.renderDateContent();
                $('.selInfo').html(data.selDays[0] + '-' + data.selDays[data.selDays.length-1]);
                (data.selDays.length == 1) && (data.selDays.push(data.selDays[0]));
            }
        })
        .on('click', 'td.month', function(){
            var data = self.option.data;
            if($(this).hasClass('isSelected')){
                $(this).removeClass('isSelected');
                data.selMonths.splice(_.indexOf(data.selMonths, $(this).attr('data-year') + '/' + self.completeData($(this).text()) ), 1);
            }else{
                $(this).addClass('isSelected');
                data.selMonths.push($.trim($(this).attr('data-year') + '/' + self.completeData($(this).text())));
            }
            $('.selInfo').html($.templates(selInfoTemp)({selInfo: data.selMonths}));
        })
        .on('click', 'td.year', function(){
            var data = self.option.data;
            if($(this).hasClass('isSelected')){
                $(this).removeClass('isSelected');
                data.selYears.splice(_.indexOf(data.selYears, $(this).text()), 1);
            }else{
                $(this).addClass('isSelected');
                data.selYears.push($.trim($(this).text()));
            }
            $('.selInfo').html($.templates(selInfoTemp)({selInfo: data.selYears}));
        })
        // 切换tab
        .on('click', '.calendarTab li', function(){
            if($(this).hasClass('active'))  return;
            $(this).addClass('active').siblings().removeClass('active');
            $('.j-clear').trigger('click');
            switch($(this).attr('data-flag')){
                case 'day':
                    self.option.data.ymdFlag = 'day';
                    break;
                case 'month':
                    self.option.data.ymdFlag = 'month';
                    break;
                case 'year':
                    self.option.data.ymdFlag = 'year';
                    break;
            }
            self.renderCalendar();
        })
        .on('click', '.j-clear', function(){
            self.option.data = $.extend(true, {}, self.formerData);
            self.clearSelInfo(self);
            self.option.data.ymdFlag = $(this).attr('data-flag');
            self.renderCalendar();
        })
        .on('click', '.j-confirm', function(){
            // self.finalSelInfo = $('.selInfo').html().replace(/\s+/g,"");
            self.getFinalSelInfo(self);
            $('.dropDown').hide();
            if(self.clickCallback){
                self.clickCallback.call(self, {arr: self.setCallbackData(), ymdFlag: self.option.data.ymdFlag}, self.yjslayout, self.yjsqlik);
            }
        })
        .on('click', '.j-open', function(){
            if(!($('.dropDown').is(':hidden'))) return;
            self.option.data = $.extend(true, {}, self.formerData);
            (self.option.data.destoryFlag) && (self.finalSelInfo = []);
            if(self.finalSelInfo && self.finalSelInfo.length){
                self.judgeTab();
            }else {
                self.renderDateContent();
                self.clearSelInfo();
            }
            $('.dropDown').show();
        })
    },
    getFinalSelInfo: function(that){
        that = that || this;
        var data = that.option.data;
        if(data.selDays.length){
            that.finalSelInfo = data.selDays;
            (data.selDays.length == 1) && (that.finalSelInfo = []);
            return;
        }
        if(data.selMonths.length){
            that.finalSelInfo = data.selMonths;
            return;
        }
        that.finalSelInfo = data.selYears;
    },
    // 将 20170103 数据转变为 2017/01/03
    setStandardData: function(data){
        data = data.substring(0, 4) + (data.length > 4 ? ('/' + data.substring(4, 6) + (data.length > 6 ? '/' + data.substring(6, 8) : '')) : '');
        return data;
    },
    setCallbackData: function(){
        var self = this;
        var arr = [];
        $.each(this.finalSelInfo, function(idx, item){
            var temp = item.split('/');
            var str = '';
            $.each(temp, function(jdx, jtem){
                str += self.completeData(jtem);
            })
            arr.push(str);
        })
        return arr;
    },
    // 补齐位数
    completeData: function(s){
        s = '' + s;
        return (s.length == 1 ? ('0' + s) : s);
    },
    judgeTab: function(){
        var self = this;
        var arr = self.finalSelInfo;
        var $obj = $('.calendarTab li');
        switch(arr[0].split('/').length){
            case 3:
                $obj.eq(0).addClass('active').siblings().removeClass('active');
                self.option.data.ymdFlag = 'day';
                self.option.data.selDays = arr;
                self.renderCalendar();
                $('.selInfo').html(self.finalSelInfo[0] + '-' + self.finalSelInfo[self.finalSelInfo.length-1]);
                break;
            case 2:
                $obj.eq(1).addClass('active').siblings().removeClass('active');
                self.option.data.ymdFlag = 'month';
                self.option.data.selMonths = arr;
                self.renderCalendar();
                $('.selInfo').html($.templates(selInfoTemp)({selInfo: self.finalSelInfo}));
                break;
            case 1:
                $obj.eq(2).addClass('active').siblings().removeClass('active');
                self.option.data.ymdFlag = 'year';
                self.option.data.selYears = arr;
                self.renderCalendar();
                $('.selInfo').html($.templates(selInfoTemp)({selInfo: self.finalSelInfo}));
                break;
        }
        
    },
    clearSelInfo: function(that){
        that = that || this;
        $('.selInfo').html('');
        //that.finalSelInfo = '';
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
        this.getYears();
        this.formerData = $.extend(true, {}, this.option.data);
    },
    getDayData: function(year, month){
        var self = this;
        year = ~~year, month = ~~month;    
        var data = this.option.data;  
        var curMondays = this.judgeDate(year, month);
        var lastMonDays = this.judgeDate(month > 1 ? year : year - 1, month > 1 ? month - 1 : 12);
        var firstWeekNum = new Date(year + '-' + month + '-' + 1).getDay();
        firstWeekNum = firstWeekNum == 0 ? 7 : firstWeekNum;
        var lastWeekNum = new Date(year + '-' + month + '-' + curMondays).getDay();
        var arr = [];
        for(var i = 0; i < firstWeekNum; i++){
            arr.push({selectModal: data.selectModal[0], day: lastMonDays - firstWeekNum + i + 1, year: month > 1 ? year : year - 1, month: month > 1 ? month - 1 : 12, disabled: (month == 1 && year == this.option.data.years[0]) ? 'disabled' : ''});
        }
        for(var i = 0; i < curMondays; i++){
            arr.push({selectModal: data.selectModal[0], day: i + 1, flag: 'cur', year: year, month: month});
        }
        var length = arr.length;
        for(var i = 0; i < 42 - length; i++){
            arr.push({selectModal: data.selectModal[0], day: i + 1, year: month < 12 ? year : year + 1  , month: month < 12 ? month + 1 : 1, disabled: (month == 12 && year == this.option.data.years[this.option.data.years.length-1]) ? 'disabled' : ''});
        }
        if(data.selDays.length){
            $.each(data.selDays, function(idx, item){
                var temp = item.split('/');
                $.each(arr, function(jdx, jtem){
                    if(~~self.completeData(jtem.day) == ~~temp[2] && ~~jtem.year == ~~temp[0] && ~~self.completeData(jtem.month) == ~~temp[1]){
                        arr[jdx].isSelected = 'isSelected';
                        return false;
                    }
                })
            })
        }
        arr = _.toArray(_.groupBy(arr, function(item, idx){
            return Math.floor(idx / 7);
        }));
        return arr;
    },
    // 获取两个日期之间的所有日期
    getBetweenDateStr: function(start,end){
        if(start == end)  return [start,];
        if(start > end){
            var temp = start;
            start = end;
            end = temp;
        }
        var result = [];
        var beginDay = start.split("/");
        var endDay = end.split("/");
        var diffDay = new Date();
        var dateList = new Array;
        var i = 0;
        diffDay.setDate(beginDay[2]);
        diffDay.setMonth(beginDay[1]-1);
        diffDay.setFullYear(beginDay[0]);
        result.push(start);
        while(i == 0){
            var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
            diffDay.setTime(countDay);
            dateList[2] = diffDay.getDate();
            dateList[1] = diffDay.getMonth() + 1;
            dateList[0] = diffDay.getFullYear();
            if(String(dateList[1]).length == 1){dateList[1] = "0"+dateList[1]};
            if(String(dateList[2]).length == 1){dateList[2] = "0"+dateList[2]};
            result.push(dateList[0]+"/"+dateList[1]+"/"+dateList[2]);
            if(dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]){ i = 1;
            }
        };
        return result;
    },
    // 获取年份数据
    getYears: function(){
        var years = this.option.data.years;
        if(years.length != 2)    return;
        this.option.data.years = _.range(years[0], years[1] + 1);
    },
    getMonData: function(data){
        var self = this;
        var arr = [];
        $.each(data, function(idx, item){
            arr.push({year: self.option.data.year, month: item});
        })
        if(self.option.data.selMonths.length){
            $.each(self.option.data.selMonths, function(idx, item){
                var temp = item.split('/');
                $.each(arr, function(jdx, jtem){
                    if(~~jtem.year == ~~temp[0] && ~~jtem.month == ~~temp[1]){
                        arr[jdx].isSelected = 'isSelected';
                    }
                })
            })
        }
        var arr = _.toArray(_.groupBy(arr, function(item, idx){
            return Math.floor(idx / 4);
        }));
        return arr;
    },
    getYearData: function(data){
        var arr = [];
        $.each(data, function(idx, item){
            arr.push({year: item});
        })
        if(this.option.data.selYears.length){
            $.each(this.option.data.selYears, function(idx, item){
                $.each(arr, function(jdx, jtem){
                    if(~~jtem.year == ~~item){
                        arr[jdx].isSelected = 'isSelected';
                    }
                })
            })
        }
        var arr = _.toArray(_.groupBy(arr, function(item, idx){
            return Math.floor(idx / 4);
        }));
        return arr;
    },
    // 年月日：判断闰年和单双月，返回天数
    isLeep: function(year){
        return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
    },
    judgeDate: function(year, month){
        var num = 31;
        switch(parseInt(month)){
            case 2:
                num = this.isLeep(year) ? 29 : 28; break;
            case 4:
            case 6:
            case 9:
            case 11:
                num = 30; break;
        }
        return num;

    },
    setStyle: function(){
        var self = this;
        $.each(this.option.style, function(idx, item){
            self.wrap.find('.dropDown').css(idx, item);
        })
        $('.chooseDate').css('width', this.option.style.width);
    },
    renderDateContent: function(){
        var $obj = $('.dateContent');
        var arr, temp;
        temp = $.templates(dateContentTemp);
        switch(this.option.data.ymdFlag){
            case 'day':
                arr = this.getDayData(this.option.data.year, this.option.data.month);
                temp = temp({dates: arr, ymdFlag: this.option.data.ymdFlag});
                break;
            case 'month':
                arr = this.getMonData(this.option.data.months);
                temp = temp({dates: arr, ymdFlag: this.option.data.ymdFlag});
                break;
            case 'year':
                arr = this.getYearData(this.option.data.years);
                temp = temp({dates: arr, ymdFlag: this.option.data.ymdFlag});
                break;
        }
        $obj.html(temp);
    },
    renderSelectContent: function(){
        var $obj = $('.selectContent');
        var html = $.templates(selectContentTemp)(this.option.data);
        $obj.html(html);
    },
    renderCalendar: function(){
        var temp = $.templates(calendarTemp)(this.option.data);
        $('.mc_calendar').html(temp);
        this.renderSelectContent();
        this.renderDateContent();
        this.setStyle();
    },
    render: function(){
        var html = $.templates(template)();
        this.wrap.html( html ); 
        this.renderCalendar();
    },
});
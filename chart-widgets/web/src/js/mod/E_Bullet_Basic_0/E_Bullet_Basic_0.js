// define(function () {
'use strict';
var E_Bullet_Basic_0 = function () {
    if (!(this instanceof E_Bullet_Basic_0)) {
        return new E_Bullet_Basic_0();
    }
}

E_Bullet_Basic_0.prototype = $.extend(new E_Base(), {
    version: '0.0.1',
    defaultColors: ['#F6732B', '#2DBD32', '#6091DD'],
    chartTemplate: 
    '<div class="bullet-container ">' +
        '<div class="bullet-legend"></div>' +
        '<h4 class="bullet-title">主题（单位）</h4>' +
        '<div class="bullet-content">' +
            '<div class="bullet-indicator">' +
                '<span>实际值：<span class="tip-value" id="J_current_value">800</span></span>' +
                '<span>比较值：<span class="tip-value" id="J_target_value">700</span></span>' +
                '<span>增长率：<span class="caret direc-up"></span><span class="tip-value" id="J_growth_rate">10%</span></span>' +
            '</div>' +
            '<div class="bullet-ruler">' +
                '<ul class="ruler-list clear-fix">' +
                    '<li>0</li>' +
                    '<li>500</li>' +
                    '<li>1000</li>' +
                '</ul>' +
            '</div>' +
            '<div class="bullet-body clear-fix">' +
                '<div class="bullet-chart">' +
                    '<span class="current-value"></span>' +
                    '<span class="standard-value"></span>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>',
    init: function (cfg) {
        if (!cfg || !cfg.dom || typeof cfg.dom !== "object" || cfg.dom.nodeType !== 1) throw new Error("请传入正确的dom元素");
        this.dom = cfg.dom;
        this.title = cfg.title || '主题（单位）';
        this.currentValue = cfg.currentValue || 800;    // 实际值
        this.targetValue = cfg.targetValue || 700;      // 目标值
        this.growthRate = (this.currentValue - this.targetValue) / this.targetValue;    // 增长率
        this.direction = cfg.direction || 'horizontal'; // 组件方向 支持 horizontal / vertical
        this.isShowTitle = cfg.isShowTitle === undefined ? true : (cfg.isShowTitle === true ? true : false);    // 是否显示title
        this.isShowLegend = cfg.isShowLegend === undefined ? true : (cfg.isShowLegend === true ? true : false); // 是否显示legend
        this.totalGap = cfg.totalGap || 0.12;   // 最大刻度上升区间（按照实际值和目标值中最大的那个计算）0 ~ 1 
        this.plotBands = cfg.plotBands || [];   // 区间刻度配置 示例：[{from: 0, to: 100, color: #fff}, {from: 100, to: 9e9, color: #000}]
        this.totalTick = this.calculateTotalTick();
        this.standardTickArr = this.calculateStandardTick();
        this.standardMaxTick = this.standardTickArr[this.standardTickArr.length - 1];
        this.bindEvent();
    },
    update: function (cfg) {
        this.dom = cfg.dom || this.dom;
        this.title = cfg.title || this.title;
        this.currentValue = cfg.currentValue || this.currentValue;
        this.targetValue = cfg.targetValue || this.targetValue;
        this.isShowTitle = cfg.isShowTitle === undefined ? this.isShowTitle : cfg.isShowTitle;
        this.isShowLegend = cfg.isShowLegend === undefined ? this.isShowLegend : cfg.isShowLegend;
        this.direction = cfg.direction || this.direction;
        this.totalGap = cfg.totalGap || this.totalGap;
        this.plotBands = cfg.plotBands || this.plotBands;
        if (cfg.totalGap != this.totalGap) {        
            this.totalTick = this.calculateTotalTick();
            this.standardTickArr = this.calculateStandardTick();
        }
    },
    bindEvent: function () {
        // 组件方向为vertical时的处理
        if (this.direction !== 'vertical') return;
        $(this.dom).on('mousemove', '.bullet-body', function (ev) {
            // console.log(ev);
            var left, top, offset,
                contentW = +($('.bullet-chart').css('width').replace('px', '')),
                progressW = +($('.current-value').css('width').replace('px', '')),
                indicatorW = +($('.bullet-indicator').css('width').replace('px', '')),
                indicatorH = +($('.bullet-indicator').css('height').replace('px', ''));

            if (ev.target.className === 'standard-value') return false;
            (ev.target.nodeName === 'DIV' || ev.target.className === 'interval-item') ? offset = ev.offsetX : offset = (contentW - progressW) / 2 + ev.offsetX;
            offset < contentW / 2 ? left = offset + indicatorW - 50 : left = offset - indicatorW + 20;

            $('.bullet-indicator').css({
                'left': left,
                'top': ev.clientY - 40
            });
        })
        .on('mouseenter', '.bullet-body', function (ev) {
            $('.bullet-indicator').css('display', 'block');
        })
        .on('mouseleave', '.bullet-body', function (ev) {
            $('.bullet-indicator').css('display', 'none');
        });
    },
    render: function () {
        var wraper = this.chartTemplate;
        $(this.dom).html(wraper);
        this.fillBulletData();
        this.chartLayout();
        this.setInterval();
    },
    /**
     * desc: 设置页面中的数据
     */
    fillBulletData: function () {
        $('.bullet-title').text(this.title);
        $('#J_current_value').text(this.currentValue);
        $('#J_target_value').text(this.targetValue);
        $('#J_growth_rate').text((Math.abs(this.growthRate) * 100).toFixed(2) + '%');
        this.growthRate < 0 && $('#' + this.dom.id + ' .caret').removeClass('direc-up');

        var rulerWraper = '',
            midTickClass = '';
        if (this.direction === 'horizontal') {
            // 标尺
            for (var i = 0; i < this.standardTickArr.length; i++) {
                i === 0 ? midTickClass : midTickClass = 'middle-tick';
                if (i < this.standardTickArr.length - 2) {
                    rulerWraper = rulerWraper + '<li><span class="'+ midTickClass +'">' + this.standardTickArr[i] + '</span></li>';
                } else if (i < this.standardTickArr.length - 1) {
                    rulerWraper = rulerWraper + '<li><span class="middle-tick">' + this.standardTickArr[i] + '</span><span>'+ this.standardTickArr[i + 1] + '</span></li>';
                }
            }
            $('.ruler-list').html(rulerWraper);
            $('.ruler-list li').css('width', (100 / (this.standardTickArr.length - 1)) + '%');
        } else { // bullet-vertical
            // 标尺
            for (var i = this.standardTickArr.length - 1; i >= 0; i--) {
                i === this.standardTickArr.length - 1 ? midTickClass : midTickClass = 'middle-tick';
                if (i > 1) {
                    rulerWraper = rulerWraper + '<li><span class="'+ midTickClass +'">' + this.standardTickArr[i] + '</span></li>';
                } else if (i > 0) {
                    rulerWraper = rulerWraper + '<li><span class="middle-tick">' + this.standardTickArr[i] + '</span><span>'+ this.standardTickArr[i - 1] + '</span></li>';
                }
            }
            $('.ruler-list').html(rulerWraper);
            $('.bullet-container').addClass('bullet-vertical');
            $('.bullet-ruler ul').removeClass('ruler-list').addClass('vertical-ruler');
            $('.vertical-ruler li').css('height', (100 / (this.standardTickArr.length - 1)) + '%');
        }
    },
    /**
     * desc: 初始化图标布局
     */
    chartLayout: function () {
        !this.isShowTitle && $('.bullet-title').css('display', 'none');
        if (this.direction === 'horizontal') {
            $('.current-value').css('width', (this.currentValue / this.standardMaxTick) * 100 + '%');
            $('.standard-value').css('left', (this.targetValue / this.standardMaxTick) * 100 + '%');
        } else {
            $('.current-value').css('height', (this.currentValue / this.standardMaxTick) * 100 + '%');
            $('.standard-value').css('bottom', (this.targetValue / this.standardMaxTick) * 100 + '%');
        }
    },
    /**
     * desc: 设置区间
     */
    setInterval: function () {
        if (!this.plotBands || !this.plotBands.length) return;
        var width, left, height, bottom,
            intervalWraper = '',
            legendWraper = '',
            marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#;"></span>';
        for (var i = 0; i < this.plotBands.length; i++) {
            // 没设置颜色就取默认色
            !this.plotBands[i].color && (this.plotBands[i].color = this.defaultColors[i%3]);

            left = bottom = (this.plotBands[i].from / this.standardMaxTick) * 100 + '%';
            width = height = (this.plotBands[i].to - this.plotBands[i].from) < this.standardMaxTick 
                           ? ((this.plotBands[i].to - this.plotBands[i].from) / this.standardMaxTick) * 100 + '%'
                           : (100 - left.replace('%', '') + '%');
            if (this.direction === 'horizontal') {
                intervalWraper = intervalWraper + '<span class="interval-item" style="left: ' + left + '; width: ' + width + '; background-color: ' + this.plotBands[i].color + ';"></span>';
            } else {
                intervalWraper = intervalWraper + '<span class="interval-item" style="bottom: ' + bottom + '; height: ' + height + '; background-color: ' + this.plotBands[i].color + ';"></span>';
            }
            legendWraper = legendWraper + marker.replace('#', this.plotBands[i].color) + '<span class="legend-name" style="color:' + this.plotBands[i].color + '">' + this.plotBands[i].name + '</span>';
        }
        $('.bullet-chart').append(intervalWraper);
        (this.direction === 'horizontal' && this.isShowLegend) && $('.bullet-legend').html(legendWraper);
    },
    /**
     * desc: 计算最大刻度
     * @return {number} 最大刻度值
     */
    calculateTotalTick: function () {
        var totalTick = 0,
            totalStr = '',
            tempStr = '';
        totalTick = this.currentValue > this.targetValue ? this.currentValue * (1 + this.totalGap) : this.targetValue * (1 + this.totalGap);
        totalStr = String(Math.ceil(totalTick));
        if (totalStr.length > 1) {
            for (var i = 0; i < totalStr.length; i++) {
                if (i === 0) continue;
                tempStr = tempStr + '0';
            }
            if (+totalStr.substring(1, totalStr.length - 1) === 0) {
                totalTick = +(totalStr.substr(0, 1) + tempStr);
            } else {
                totalTick = +((+totalStr.substr(0, 1) + 1) + tempStr);
            }
        } else {
            totalTick = 10;
        }
        return totalTick;
    },
    /**
     * desc: 标准化刻度
     * @return {array} 标准刻度参数
     */
    calculateStandardTick: function () {
        // if (this.totalTick < ) {}
        var number = 1,
            count = 0,
            itemGap = 0,
            tickArr = [],
            standardTickArr = [];
        if (this.totalTick <= 300) {
            number = 1;
        } else if (this.totalTick <= 1000) {
            number = 4;
        } else {
            number = 5;
        }
        do {
            number ++;
            tickArr = this.tickStandard(this.totalTick, 0, number);
        } while (tickArr[1] !== 0)
        itemGap = tickArr[0] / tickArr[2];
        for (var i = 0; i <= tickArr[2]; i++) {
            standardTickArr.push(0 + i * itemGap);
        }
        return standardTickArr;
    },
    tickStandard: function (cormax, cormin, cornumber) {
        var tmpmax, tmpmin, corstep, tmpstep, tmpnumber, temp, extranumber;
        if (cormax <= cormin) return;
        corstep = (cormax - cormin) / cornumber;
        if (Math.pow(10, parseInt(Math.log(corstep) / Math.log(10))) == corstep) {
            temp = Math.pow(10, parseInt(Math.log(corstep) / Math.log(10)));
        } else {
            temp = Math.pow(10, (parseInt(Math.log(corstep) / Math.log(10)) + 1));
        }
        tmpstep = (corstep / temp).toFixed(6);
        //选取规范步长
        if (tmpstep >= 0 && tmpstep <= 0.1) {
            tmpstep = 0.1;
        } else if (tmpstep >= 0.100001 && tmpstep <= 0.2) {
            tmpstep = 0.2;
        } else if (tmpstep >= 0.200001 && tmpstep <= 0.25) {
            tmpstep = 0.25;
        } else if (tmpstep >= 0.250001 && tmpstep <= 0.5) {
            tmpstep = 0.5
        } else {
            tmpstep = 1;
        }
        tmpstep = tmpstep * temp;
        if (parseInt(cormin / tmpstep) != (cormin / tmpstep)) {
            if (cormin < 0) {
                cormin = (-1) * Math.ceil(Math.abs(cormin / tmpstep)) * tmpstep;
            } else {
                cormin = parseInt(Math.abs(cormin / tmpstep)) * tmpstep;
            }
        }
        if (parseInt(cormax / tmpstep) != (cormax / tmpstep)) {
            cormax = parseInt(cormax / tmpstep + 1) * tmpstep;
        }
        tmpnumber = (cormax - cormin) / tmpstep;
        if (tmpnumber < cornumber) {
            extranumber = cornumber - tmpnumber;
            tmpnumber = cornumber;
            if (extranumber % 2 == 0) {
                cormax = cormax + tmpstep * parseInt(extranumber / 2);
            } else {
                cormax = cormax + tmpstep * parseInt(extranumber / 2 + 1);
            }
            cormin = cormin - tmpstep * parseInt(extranumber / 2);
        }
        cornumber = tmpnumber;
        return [cormax, cormin, cornumber];
    },
    /**
     * desc: 显示标题
     */
    showTitle: function () {
        this._showTitle();
        this.render();
    },
    /**
     * desc: 隐藏标题 （同时隐藏主、副标题）
     */
    hideTitle: function () {
        this._hideTitle();
        this.render();
    },
    showLegend: function () {
        this._showLegend();
        this.render();
    },
    hideLegend: function () {
        this._hideLegend();
        this.render();
    },
})
//  return E_Bullet_Basic_0;
// })
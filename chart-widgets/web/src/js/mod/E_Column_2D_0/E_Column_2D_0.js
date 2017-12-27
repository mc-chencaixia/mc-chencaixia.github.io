// define(['./E_Base'], function(E_Base){
'use strict';
/**
 * 	desc: 二维柱状图
 *  className: E_Column_2D_0
 *  auth: gaok
 */

var E_Column_2D_0 = function () {
    if (!(this instanceof E_Column_2D_0)) {
        return new E_Column_2D_0();
    }
}

E_Column_2D_0.prototype = $.extend(new E_Base(), {
        version: '0.0.1',
        defaultOption: {
            title: {
                show: true,
                text: '主标题',
                subtext: '副标题'
            },
            color: ['#2DBD32','#DF892A','#6090DC'],     
            legend: {
                show: true,
                bottom: 0,
                left:0,
                itemWidth: 8,
                itemHeight: 8,
                data: [
                        {
                            name: '',
                            icon: 'circle'
                        },
                        {
                            name: '',
                            icon: 'circle'
                        },
                        {
                            name: '',
                            icon: 'circle'
                        }
                     ]
            },
            grid: {
                left: '10%',
                top: 60,
                right: '10%',
                bottom: 100,
                width: 'auto',
                height: 'auto'
            },
            xAxis: {
                name: '',
                nameLocation: 'middle',
                type: 'category',
                data: (function () {
                    var i = 13;
                    var res = [];
                    while (--i) {
                        res.unshift(i + '月');
                    }
                    return res;
                }()),
                nameGap: 26
            },
            yAxis: {
                show: true,
                type: 'value',
                name: '',
                nameLocation: 'middle',
                nameRotate: 0,
                nameGap: 54
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            series: [
                {
                    name: '度量0',
                    type: 'bar',
                    data: []
                },
                {
                    name: '度量1',
                    type: 'bar',
                    data: []
                },
                {
                    name: '度量2',
                    type: 'bar',
                    data: []
                }
            ]
        },
        /**
         * desc: 初始化组件参数
         * @param {object} cfg 配置参数
         * @return {object: E_Column_2D_0} 组件实例
         */
        init: function (cfg) {
            var that = this;
            this._init(cfg);
            this.title = cfg.title || '';
            this.subTitle = cfg.subTitle || '';
            this.xAxisName = cfg.xAxisName || '';
            this.yAxisName = cfg.yAxisName || '';
            this.yAxisMin = cfg.yAxisMin || 0;
            this.xAxisData = cfg.xAxisData || this.defaultOption.xAxis.data;
            this.data = cfg.data || this.defaultOption.series;
            this.legendData = this.getLegendData(cfg.data)||this.defaultOption.legend.data;         
            this.isShowTitle = cfg.isShowTitle === false ? false : true;
            this.isShowSubtitle = cfg.isShowSubtitle === false ? false : true;
            this.isShowXLabel = cfg.isShowXLabel === false ? false : true;
            this.isShowYLabel = cfg.isShowYLabel === false ? false : true;
            this.isShowItemLabel = cfg.isShowItemLabel == false ? false : true;
            this.isShowXAxisName = cfg.isShowXAxisName === false ? false : true;
            this.isShowYAxisName = cfg.isShowYAxisName === false ? false : true;
            this.isShowLegend = cfg.isShowLegend === false ? false : true;
            this.layout = this.chartLayout();
            this.currentOption = $.extend(this.defaultOption, {
                title: {
                    show: this.isShowTitle,
                    text: this.title,
                    subtext: this.isShowSubtitle ? this.subTitle : '',
                },
                grid: this.layout,
                xAxis: $.extend(this.defaultOption.xAxis, {
                    // min: this.xAxisMin
                    // min: '3月'
                    name: this.isShowXAxisName ? this.limitNameLength(this.xAxisName) : '',
                    axisLabel: {
                        show: this.isShowXLabel,
                        formatter: function(value){
                            return that._formateLargeData(value);
                        },
                    },
                    data: this.xAxisData,
                }),
                yAxis: $.extend(this.defaultOption.yAxis, {
                    name: this.isShowYAxisName ? this._formatStr(this.limitNameLength(this.yAxisName)) : '',                    
                    axisLabel: {
                        show: this.isShowYLabel,
                        formatter: function(value){
                            return that._formateLargeData(value);
                        },
                    },
                    min: this.yAxisMin
                })
            });
            this.resize();
            
            return this;
        },
        /**
         * desc: 更新渲染图表参数
         * @param  {object} cfg 图表参数
         */
        update: function (cfg) {
            var that = this;
            this.dom = cfg.dom || this.dom;
            this.chart = cfg.chart || this.chart;
            this.title = cfg.title || this.title;
            this.subTitle = cfg.subTitle || this.subTitle;
            this.yAxisMin = cfg.yAxisMin || this.yAxisMin;
            this.xAxisName = cfg.xAxisName || this.xAxisName;
            this.yAxisName = cfg.yAxisName || this.yAxisName;
            this.xAxisData = cfg.xAxisData || this.xAxisData;
            this.data = cfg.data || this.data;
            this.legendData = this.getLegendData(cfg.data)||this.legendData;
            this.isShowTitle = cfg.isShowTitle === undefined ? this.isShowTitle : cfg.isShowTitle;
            this.isShowSubtitle = cfg.isShowSubtitle === undefined ? this.isShowSubtitle : cfg.isShowSubtitle;                               
            this.isShowXLabel = cfg.isShowXLabel === undefined ? this.isShowXLabel : cfg.isShowXLabel;
            this.isShowYLabel = cfg.isShowYLabel === undefined ? this.isShowYLabel : cfg.isShowYLabel;
            this.isShowItemLabel = cfg.isShowItemLabel === undefined ? this.isShowItemLabel : cfg.isShowItemLabel;
            this.isShowXAxisName = cfg.isShowXAxisName === undefined ? this.isShowXAxisName : cfg.isShowXAxisName;
            this.isShowYAxisName = cfg.isShowYAxisName === undefined ? this.isShowYAxisName : cfg.isShowYAxisName;
            this.isShowLegend = cfg.isShowLegend === undefined ? this.isShowLegend : cfg.isShowLegend;
            this.layout = this.chartLayout();
            this.currentOption = $.extend(this.defaultOption, {
                title: {
                    show: this.isShowTitle,
                    text: this.title,
                    subtext: this.isShowSubtitle ? this.subTitle : '',
                },
                grid: this.layout,
                xAxis: $.extend(this.defaultOption.xAxis, {
                    // min: this.xAxisMin
                    // min: '3月'
                    data: this.xAxisData,
                    name: this.isShowXAxisName ? this.limitNameLength(this.xAxisName) : '',
                    axisLabel: {
                        show: this.isShowXLabel,
                        formatter: function(value){
                            return that._formateLargeData(value);
                        },
                    },
                }),
                yAxis: $.extend(this.defaultOption.yAxis, {
                    min: this.yAxisMin,
                    name: this.isShowYAxisName ? this._formatStr(this.limitNameLength(this.yAxisName)) : '',               
                    axisLabel: {
                        show: this.isShowYLabel,
                        formatter: function(value){
                            return that._formateLargeData(value);
                        },
                    },
                }),
                legend:$.extend({}, this.defaultOption.legend, {
                    show: this.isShowLegend,
                    data: (function () {
                        var legendDataArr = [];
                        var colorLen = that.defaultOption.color.length;
                        $.each(that.legendData, function (k, v) {
                            legendDataArr.push({
                                name: v,
                                icon: 'circle'
                            });
                        })
                        return legendDataArr;
                    }()),
                }),
                series:  (function () {
                    var seriesArr = [];
                    $.each(that.data, function (k, v) {
                        var tempObj = {};
                        tempObj = $.extend({}, that.defaultOption.series[0], {
                            name: that.legendData[k],
                            data: v.data
                        });
                        seriesArr.push(tempObj);
                    })
                    return seriesArr;
                }()),
            });
        },
       /**
         * desc: 渲染图表
         */
        render: function () {
            var option = this.currentOption;
            this.chart.setOption(option);
        },
        setData: function (args) {
            if (!args || !(args instanceof Object)) return;
            this.update({
                data: args
            });
        },
        setXAxis: function (data) {
            if (!data || !(data instanceof Array)) return;
            this.update({
                xAxisData: data
            });
        },
        setYAxisMin: function (data) {
            if (!!data && typeof data == 'number') {
                this.update({
                    yAxisMin: data
                });
            }
        },
        resize: function () {
            this._resize();
        },
        /**
         * desc: 计算图标边框布局
         * @return {object} 计算好的边框布局参数
         */
        chartLayout: function () {
            return this._chartLayout();
        },
        getLegendData: function (data) {
            if (!data || data.length === 0) return;
            var legendDataArr = [];
            $.each(data, function (k, v) {
                legendDataArr.push(v.name);
            });
            return legendDataArr;
        },
        /**
         * desc: 显示标题
         */
        showTitle: function () {
            this._showTitle();
        },
        /**
         * desc: 隐藏标题 （同时隐藏主、副标题）
         */
        hideTitle: function () {
            this._hideTitle();
        },
        /**
         * desc: 显示y轴标签
         */
        showYLabel: function () {
            this._showYLabel();
        },
        /**
         * desc: 隐藏y轴标签
         */
        hideYLabel: function () {
            this._hideYLabel();
        },
        /**
         * desc: 显示x轴标签
         */
        showXLabel: function () {
            this._showXLabel();
        },
        /**
         * desc: 隐藏x轴标签
         */
        hideXLabel: function () {
            this._hideXLabel();
        },
        /**
         * desc: 显示x轴名称
         */
        showXAxisName: function () {
            this._showXAxisName();
        },
        /**
         * desc: 隐藏x轴名称
         */
        hideXAxisName: function () {
            this._hideXAxisName();
        },
        /**
         * desc: 显示y轴名称
         */
        showYAxisName: function () {
            this._showYAxisName();
        },
        /**
         * desc: 隐藏y轴名称
         */
        hideYAxisName: function () {
            this._hideYAxisName();
        },
        /**
        * desc: 数据标签-弹层-大于等于2位的小数四舍五入
        */
        decmicalsDataFormat : function (arr) {
            return this._decmicalsDataFormat(arr)
        },
        limitNameLength: function (name) {
            return this._limitNameLength(name)
        },
        showLegend: function () {
            this._showLegend()
        },
        hideLegend: function () {
            this._hideLegend()
        },
        /**
         * desc: 显示副标题
         */
        showSubtitle: function () {
            this._showSubtitle()
        },
        /**
         * desc: 隐藏副标题
         */
        hideSubtitle: function () {
            this._hideSubtitle()
        }
    })
// return E_Column_2D_0;
// });
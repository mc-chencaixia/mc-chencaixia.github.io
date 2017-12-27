// define(['./E_Base','./ecStat.min','./echarts-new'], function (E_Base,ecStat,echarts) {
    'use strict';
/**
 *  className: E_Histogram_Basic_1
 * 	desc: 直方图
 *  auth: gaok
 */
    var E_Histogram_Basic_1 = function () {
        if (!(this instanceof E_Histogram_Basic_1)) {
            return new E_Histogram_Basic_1();
        }
    }
    E_Histogram_Basic_1.prototype = $.extend(new E_Base(), {
        version: '0.0.1',
        defaultOption:{
            title: {
                show: true,
                text: 'Girths of Black Cherry Trees',
                subtext: 'By ecStat.histogram',
                sublink: 'https://github.com/ecomfe/echarts-stat',
                left: 'center',
                top: 10
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            color: ['#2DBD32','#DF892A','#6090DC'],
            grid: {
                left: '10%',
                top: 60,
                right: '10%',
                bottom: 100,
                width: 'auto',
                height: 'auto'
            },
            xAxis: {
                type: 'value',
                nameLocation:'middle',
                name: '',
                nameGap: 26                
                // min: min,
                // max: max,
                // interval: interval
            },
            yAxis: {
                name: '',                
                type: 'value',
                nameLocation:'middle',
                nameRotate: 0,
                nameGap: 54,
            },
            series: [{
                name: 'height',
                type: 'custom',
                // renderItem: renderItem,
                label: {
                    normal: {
                        show: true,
                        position: 'insideTop'
                    }
                },
                encode: {
                    x: [0, 1],
                    y: 2,
                    tooltip: 2,
                    label: 2
                },
                // data: dataHis
            }]
        },
        /**
         * desc: 初始化组件参数
         * @param {object} cfg 配置参数
         * @return {object: E_Column_2D_1} 组件实例
         */
        init: function (cfg) {
            this._init(cfg);
            this.title = cfg.title || '';
            this.subTitle = cfg.subTitle || '';
            this.xAxisName = cfg.xAxisName || '';
            this.yAxisName = cfg.yAxisName || '';
            this.yAxisData = cfg.yAxisData || this.defaultOption.yAxis.data;
            this.data = cfg.data || this.defaultOption.series;
            this.isShowTitle = cfg.isShowTitle === false ? false : true;
            this.isShowXLabel = cfg.isShowXLabel === false ? false : true;
            this.isShowYLabel = cfg.isShowYLabel === false ? false : true;
            this.isShowItemLabel = cfg.isShowItemLabel == false ? false : true;
            this.isShowXAxisName = cfg.isShowXAxisName === false ? false : true;
            this.isShowYAxisName = cfg.isShowYAxisName === false ? false : true;
            this.isShowSubtitle = cfg.isShowSubtitle === false ? false : true; 
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
                }),
                yAxis: $.extend(this.defaultOption.yAxis, {
                    name: this.isShowYAxisName ? this._formatStr(this.limitNameLength(this.yAxisName)) : '',                    
                    axisLabel: {
                        show: this.isShowYLabel,
                        formatter: function(value){
                            return that._formateLargeData(value);
                        },
                    },
                }),

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
            this.grith = cfg.data === undefined ? this.grith : cfg.data.data;
            // that.grith = this.grith
            var bins = ecStat.histogram(that.grith);
            
            var interval;
            var min = Infinity;
            var max = -Infinity;
            
            var dataHis = echarts.util.map(bins.data, function (item, index) {
                var x0 = bins.bins[index].x0;
                var x1 = bins.bins[index].x1;
                interval = x1 - x0;
                min = Math.min(min, x0);
                max = Math.max(max, x1);
                return [x0, x1, item[1]];
            });
            
            function renderItem(params, api) {
                var yValue = api.value(2);
                var start = api.coord([api.value(0), yValue]);
                var size = api.size([api.value(1) - api.value(0), yValue]);
                var style = api.style();
            
                return {
                    type: 'rect',
                    shape: {
                        x: start[0] + 1,
                        y: start[1],
                        width: size[0] - 2,
                        height: size[1]
                    },
                    style: style
                };
            }
            this.dataHis = dataHis;
            this.renderItem = renderItem;

            this.dom = cfg.dom || this.dom;
            this.chart = cfg.chart || this.chart;
            this.title = cfg.title || this.title;
            this.subTitle = cfg.subTitle || this.subTitle;
            this.xAxisMin = cfg.xAxisMin || this.xAxisMin;
            this.xAxisName = cfg.xAxisName || this.xAxisName;
            this.yAxisName = cfg.yAxisName || this.yAxisName;
            this.data = cfg.data || this.defaultOption.series;            
            this.isShowTitle = cfg.isShowTitle === undefined ? this.isShowTitle : cfg.isShowTitle;
            this.isShowSubtitle = cfg.isShowSubtitle === undefined ? this.isShowSubtitle : cfg.isShowSubtitle;            
            this.isShowXLabel = cfg.isShowXLabel === undefined ? this.isShowXLabel : cfg.isShowXLabel;
            this.isShowYLabel = cfg.isShowYLabel === undefined ? this.isShowYLabel : cfg.isShowYLabel;
            this.isShowItemLabel = cfg.isShowItemLabel === undefined ? this.isShowItemLabel : cfg.isShowItemLabel;
            this.isShowXAxisName = cfg.isShowXAxisName === undefined ? this.isShowXAxisName : cfg.isShowXAxisName;
            this.isShowYAxisName = cfg.isShowYAxisName === undefined ? this.isShowYAxisName : cfg.isShowYAxisName;
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
                }),
                yAxis: $.extend(this.defaultOption.yAxis, {
                    name: this.isShowYAxisName ? this._formatStr(this.limitNameLength(this.yAxisName)) : '',                    
                    axisLabel: {
                        show: this.isShowYLabel,
                        formatter: function(value){
                            return that._formateLargeData(value);
                        },
                    },
                }),
                series: [$.extend(this.defaultOption.series[0], {                      
                        data: this.dataHis,
                        renderItem: this.renderItem
                })],
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
        setXAxisMin: function (data) {
            if (!!data && typeof data == 'number') {
                this.update({
                    xAxisMin: data
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
         * desc: 隐藏x轴标签
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
//     return E_Histogram_Basic_1;
// })

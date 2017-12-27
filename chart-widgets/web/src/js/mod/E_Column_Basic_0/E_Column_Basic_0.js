// define(['./E_Base'], function(E_Base){
'use strict';
/**
 * desc: 基础柱状图
 * className: E_Column_Basic_0
 */
var E_Column_Basic_0 = function () {
    if (!(this instanceof E_Column_Basic_0)) {
        return new E_Column_Basic_0();
    }
}

E_Column_Basic_0.prototype = $.extend(new E_Base(), {
    version: '0.0.1',
    defaultOption: {
        color: ['#6090DC'],
        title: {
            show: true,
            text: '主标题',
            subtext: '副标题',
        },
        legend: {},
        tooltip: {},
        xAxis: {
            min: 0,
            data: (function () {
                var i = 13;
                var res = [];
                while (--i) {
                    res.unshift(i + '月');
                }
                return res;
            }()),
            axisLabel: {
                //inside: true,
                interval: false, 
                show: true,
                textStyle: {
                    color: '#000'
                },
                rotate: 0,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: true
            },
            nameLocation: 'middle',
            nameGap: 26
            // z: 10
        },
        yAxis: {
            min: 0,
            axisLine: {
                show: true
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#999'
                }
            },
            nameLocation: 'middle',
            nameTextStyle: {
                // color: '000',
                fontSize: '13',
                fontWeight: 500
            },
            nameRotate: 0,
            nameGap: 54,
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: [{
            name: 'example',
            type: 'bar',
            barWidth: '30%',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    // formatter: function(obj){return that.thousandBitSeparator(obj.data);},//that.thousandBitSeparator,
                    textStyle: {
                        color: '#43C2F2',
                        fontSize: '14'
                    }
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: '#FFF',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(96,144,220,0.6)'
                }
            },
            data: (function () {
                var i = 13;
                var res = [];
                while (--i) {
                    res.push(~~(Math.random() * 120));
                }
                return res;
            }())
        }]
    },
    /**
     * desc: 初始化组件参数
     * @param  {object} cfg 配置参数
     * @return {object: E_Column_Basic_0}     组件本身
     */
    init: function (cfg) {
        var that = this;
        this._init(cfg);
        this.title = cfg.title || '';
        this.subTitle = cfg.subTitle || '';
        this.yAxisMin = cfg.yAxisMin || 0;
        this.xAxisName = cfg.xAxisName || '';
        this.yAxisName = cfg.yAxisName || '';
        this.xAxisData = cfg.xAxisData || this.defaultOption.xAxis.data;
        this.data = cfg.data || this.defaultOption.series[0].data;
        this.isShowTitle = cfg.isShowTitle === false ? false : true;
        this.isShowSubtitle = cfg.isShowSubtitle === false ? false : true;
        this.isShowXLabel = cfg.isShowXLabel === false ? false : true;
        this.isShowYLabel = cfg.isShowYLabel === false ? false : true;
        this.isShowXAxisName = cfg.isShowXAxisName === false ? false : true;
        this.isShowYAxisName = cfg.isShowYAxisName === false ? false : true;
        this.isShowItemLabel = cfg.isShowItemLabel === false ? false : true;
        this.layout = this.chartLayout();
        this.currentOption = $.extend(this.defaultOption, {
            title: {
                show: this.isShowTitle,
                text: this.title,
                subtext: this.subTitle,
            },
            grid: this.layout,
            xAxis: $.extend(this.defaultOption.xAxis, {
                axisLabel: {
                    show: this.isShowXLabel,
                    formatter: function(value){
                        return that._limitDimensionLength(value);
                    },
                },
                data: this.xAxisData,
                name: this.isShowXAxisName ? this.limitNameLength(this.xAxisName) : '',
                triggerEvent: true,
            }),
            yAxis: $.extend(this.defaultOption.yAxis, {
                min: this.yAxisMin,
                axisLabel: {
                    show: this.isShowYLabel,
                    formatter: function(value){
                        return that._formateLargeData(value);
                    },
                },
                name: this.isShowYAxisName ? this._formatStr(this.limitNameLength(this.yAxisName)) : '',
            }),
            series: [$.extend(this.defaultOption.series[0], {
                type: 'bar',
                label: {
                    normal: {
                        show: this.isShowItemLabel,
                        position: 'top',
                        formatter: function(params){
                            return that._formateLargeData(params.value);
                        },
                    }
                },
                data: this.data.data,
                name: this.data.name,
            })],
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
        this.isShowTitle = cfg.isShowTitle === undefined ? this.isShowTitle : cfg.isShowTitle;
        this.isShowSubtitle = cfg.isShowSubtitle === undefined ? this.isShowSubtitle : cfg.isShowSubtitle;
        this.isShowXLabel = cfg.isShowXLabel === undefined ? this.isShowXLabel : cfg.isShowXLabel;
        this.isShowYLabel = cfg.isShowYLabel === undefined ? this.isShowYLabel : cfg.isShowYLabel;
        this.isShowXAxisName = cfg.isShowXAxisName === undefined ? this.isShowXAxisName : cfg.isShowXAxisName;
        this.isShowYAxisName = cfg.isShowYAxisName === undefined ? this.isShowYAxisName : cfg.isShowYAxisName;
        this.isShowItemLabel = cfg.isShowItemLabel === undefined ? this.isShowItemLabel : cfg.isShowItemLabel;
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
                        return that._limitDimensionLength(value);
                    },
                },
                data: this.xAxisData,
            }),
            yAxis: $.extend(this.defaultOption.yAxis, {
                name: this.isShowYAxisName ? this._formatStr(this.limitNameLength(this.yAxisName)) : '',
                min: this.yAxisMin,
                axisLabel: {
                    show: this.isShowYLabel,
                    formatter: function(value){
                        return that._formateLargeData(value);
                    },
                },
            }),
            series: [$.extend(this.defaultOption.series[0], {
                type: 'bar',
                label: {
                    normal: {
                        show: this.isShowItemLabel,
                        position: 'top',
                        formatter: function(params){
                            return that._formateLargeData(params.value);
                        },
                    }
                },
                data: this.data.data,
                name: this.data.name,
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
    /**
     * desc: 设置图表数据
     * @param {
     *     name: 'string', // 数据类名称
     *     data: [], // 数据数组
     * } args 图表数据对象
     */
    setData: function (args) {
        if (!args || !(args instanceof Object)) return;
        this.update({
            data: args
        });
    },
    /**
     * desc: 更新x轴标签数据
     * @param {array} data x轴标签数组
     */
    setXAxis: function (data) {
        if (!data || !(data instanceof Array)) return;
        this.update({
            xAxisData: data
        });
    },
    /**
     * desc: 设置y轴最小值
     * @param {number} data y轴最小数值
     */
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
    on: function(event, handler) {
        this._on(event, handler);
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
// return E_Column_Basic_0;
// });
// define(['./E_Base'], function (E_Base) {
    'use strict';
/**
 *  desc: 基础条形图
 *  className: E_Bar_Basic_0
 *  auth: gaok
 */

var E_Bar_Basic_0 = function () {
    if (!(this instanceof E_Bar_Basic_0)) {
        return new E_Bar_Basic_0();
    }
}
E_Bar_Basic_0.prototype = $.extend(new E_Base(), {
    version: '0.0.1',
    defaultOption: {
        title: {
            text: '世界人口总量',
            subtext: '数据来自网络'
        },
        color:['#6090DC'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['']
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
            type: 'value',
            boundaryGap: [0, 0.01],
            nameLocation:'middle',
            // min: 'dataMin'
            nameGap: 26
        },
        yAxis: {
            name: '',
            nameLocation: 'middle',
            nameRotate: 0,
            nameGap: 54,
            show: true,
            type: 'category',
            data: ['巴西','印尼','美国','印度','中国','世界人口(万)'],
            // nameLocation:'middle',
            // nameRotate:90,
            // nameGap:40
        },
        series: [
            {
                name: '',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            }
        ]
    },
    /**
     * desc: 初始化组件参数
     * @param {object} cfg 配置参数
     * @return {object: E_Column_2D_1} 组件实例
     */
    init: function (cfg) {
        var that = this;
        this._init(cfg);
        this.title = cfg.title || '';
        this.subTitle = cfg.subTitle || '';
        this.xAxisName = cfg.xAxisName || '';
        this.yAxisName = cfg.yAxisName || '';
        this.xAxisMin = cfg.xAxisMin || 0;
        this.yAxisData = cfg.yAxisData || this.defaultOption.yAxis.data;
        this.data = cfg.data || this.defaultOption.series;
        this.isShowTitle = cfg.isShowTitle === false ? false : true;
        this.isShowSubtitle = cfg.isShowSubtitle === false ? false : true;
        this.isShowXLabel = cfg.isShowXLabel === false ? false : true;
        this.isShowYLabel = cfg.isShowYLabel === false ? false : true;
        this.isShowItemLabel = cfg.isShowItemLabel == false ? false : true;
        this.isShowXAxisName = cfg.isShowXAxisName === false ? false : true;
        this.isShowYAxisName = cfg.isShowYAxisName === false ? false : true;
        this.layout = this.chartLayout();
        this.currentOption = $.extend(this.defaultOption, {
            title: {
                show: this.isShowTitle,
                text: this.title,
                subtext: this.subTitle,
            },
            grid: this.layout,
            xAxis: $.extend(this.defaultOption.xAxis, {
                // min: this.xAxisMin
                // min: '3月'
                min: this.xAxisMin,
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
                data: this.yAxisData
                // name: this.yAxisName
            }),
            series: [
                $.extend(this.defaultOption.series[0], {
                    name: this.data.name,                        
                    data: this.data.data,
                    label: {
                        normal: {
                            show: that.isShowItemLabel,
                            position: 'right',
                        }
                    },
                })
            ],
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
        this.xAxisMin = cfg.xAxisMin || this.xAxisMin;
        this.yAxisData = cfg.yAxisData || this.yAxisData;
        this.data = cfg.data || this.data;            
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
                subtext: this.isShowSubtitle?this.subTitle:'',
            },
            grid: this.layout,
            xAxis: $.extend(this.defaultOption.xAxis, {
                // min: this.xAxisMin
                // min: '3月'
                min: this.xAxisMin,
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
                data: this.yAxisData
            }),
            series: [
                $.extend(this.defaultOption.series[0], {
                    name: this.data.name,                        
                    data: this.data.data,
                    label: {
                        normal: {
                            show: that.isShowItemLabel,
                            position: 'right',
                        }
                    },
                })
            ],
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
    setYAxis: function (data) {
        if (!data || !(data instanceof Array)) return;
        this.update({
            yAxisData: data
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
//   return E_Bar_Basic_0
// })
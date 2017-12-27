// define(['./E_Base'], function(E_Base) {
'use strict';

var E_Bar_Polar_0 = function () {
    if (!(this instanceof E_Bar_Polar_0)) {
        return new E_Bar_Polar_0();
    }
}

E_Bar_Polar_0.prototype = $.extend(new E_Base(), {
    version: '0.0.1',
    defaultOption: {
        color: ['#F6732B', '#53CCFF', '#F67689', '#B1EB00'],
        angleAxis: {
            show: false,
        },
        radiusAxis: {
            type: 'category',
            data: ['A类', 'B类', 'C类', 'D类'],
            z: 10,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            }
        },
        tooltip: {
            show: true,
        },
        legend: {
            show: true,
            data: ['A', 'B', 'C', 'D'],
            left: 0,
            bottom: 0,
            itemWidth: 8,
            itemHeight: 8,
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: [1, 0, 0, 0],
            coordinateSystem: 'polar',
            name: 'A',
            stack: 'a',
            barWidth: '40%',
            itemStyle: {
                normal: {
                    barBorderRadius: 10,
                }
            }
        }, {
            type: 'bar',
            data: [0, 4, 0, 0],
            coordinateSystem: 'polar',
            name: 'B',
            stack: 'a',
            barWidth: '40%',
            itemStyle: {
                normal: {
                    barBorderRadius: 10,
                }
            }
        }, {
            type: 'bar',
            data: [0, 0, 3, 0],
            coordinateSystem: 'polar',
            name: 'C',
            stack: 'a',
            barWidth: '40%',
            itemStyle: {
                normal: {
                    barBorderRadius: 10,
                }
            }
        }, {
            type: 'bar',
            data: [0, 0, 0, 4],
            coordinateSystem: 'polar',
            name: 'D',
            stack: 'a',
            barWidth: '40%',
            itemStyle: {
                normal: {
                    barBorderRadius: [10, 10, 0, 0]
                }
            }
        }],
    },
    init: function (cfg) {
        var that = this;
        this._init(cfg);
        this.title = cfg.title || '';
        this.subTitle = cfg.subTitle || '';
        this.data = (cfg.data ? this.formatterData(cfg.data) : false) || [this.defaultOption.series[0].data, this.defaultOption.series[1].data, this.defaultOption.series[2].data, this.defaultOption.series[3].data];
        this.legendData = this.getLegendData(cfg.data) || this.defaultOption.legend.data;
        this.isShowTitle = cfg.isShowTitle === false ? false : true;
        this.isShowItemLabel = cfg.isShowItemLabel === false ? false : true;
        this.layout = this.chartLayout();
        this.currentOption = $.extend(true, {}, this.defaultOption);
        this.currentOption = $.extend({}, this.defaultOption, {
            title: {
                show: this.isShowTitle,
                text: this.title,
                subtext: this.subTitle,
            },
            radiusAxis: $.extend({}, this.defaultOption.radiusAxis, {
                data: (function () {
                    var legendDataArr = [];
                    $.each(that.legendData, function (k, v) {
                        legendDataArr.push(v);
                    })
                    return legendDataArr;
                }()),
            }),
            legend: $.extend({}, this.defaultOption.legend, {
                // data: this.legendData
                data: (function () {
                    var legendDataArr = [];
                    $.each(that.legendData, function (k, v) {
                        legendDataArr.push({
                            name: v,
                            icon: 'circle',
                            textStyle: {
                                color: that.defaultOption.color[k],
                            }
                        });
                    })
                    return legendDataArr;
                }()),
            }),
            grid: this.layout,
            // xAxis: $.extend(this.defaultOption.xAxis, {
            //     // min: this.xAxisMin
            //     axisLabel: {show: this.isShowXLabel},         
            // }),
            // yAxis: $.extend(this.defaultOption.yAxis, {
            //     min: this.yAxisMin,
            //     axisLabel: {show: this.isShowYLabel},
            // }),
            series: (function () {
                var temp = [];
                $.each(that.data, function (k, v) {
                    temp.push(
                        $.extend({}, that.defaultOption.series[0], {
                            name: that.legendData[k],
                            data: v,
                            label: {
                                normal: {
                                    show: that.isShowItemLabel,
                                    position: 'inside',
                                    formatter: (function (params) {
                                        if (!params || !(typeof params == 'object')) return;
                                        if ( params.value === Math.floor(params.value)) {
                                            return params.value;
                                        } else {
                                            return params.value.toFixed(2);
                                        }
                                    }()),
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
                        })
                    )
                    
                })
                return temp;
            }()),
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
        this.data = (cfg.data ? this.formatterData(cfg.data) : false) || this.data;
        this.legendData = this.getLegendData(cfg.data) || this.legendData;
        this.isShowTitle = cfg.isShowTitle === undefined ? this.isShowTitle : cfg.isShowTitle;
        this.isShowItemLabel = cfg.isShowItemLabel === undefined ? this.isShowItemLabel : cfg.isShowItemLabel;
        this.layout = this.chartLayout();
        this.currentOption = $.extend(this.defaultOption, {
            title: {
                show: this.isShowTitle,
                text: this.title,
                subtext: this.subTitle,
            },
            radiusAxis: $.extend(this.defaultOption.radiusAxis, {
                data: (function () {
                    var legendDataArr = [];
                    $.each(that.legendData, function (k, v) {
                        legendDataArr.push(v);
                    })
                    return legendDataArr;
                }()),
            }),
            legend: $.extend(this.defaultOption.legend, {
                // data: this.legendData
                data: (function () {
                    var legendDataArr = [];
                    $.each(that.legendData, function (k, v) {
                        legendDataArr.push({
                            name: v,
                            icon: 'circle',
                            textStyle: {
                                color: that.defaultOption.color[k],
                            }
                        });
                    })
                    return legendDataArr;
                }()),
            }),
            grid: this.layout,
            // xAxis: $.extend(this.defaultOption.xAxis, {
            //     axisLabel: {show: this.isShowXLabel},         
            // }),
            // yAxis: $.extend(this.defaultOption.yAxis, {
            //     min: this.yAxisMin,
            //     axisLabel: {show: this.isShowYLabel},
            // }),
            series: (function () {
                var temp = [];
                $.each(that.data, function (k, v) {
                    temp.push(
                        $.extend({}, that.defaultOption.series[0], {
                            name: that.legendData[k],
                            data: v,
                            label: {
                                normal: {
                                    show: that.isShowItemLabel,
                                    position: 'inside',
                                    formatter: (function (params) {
                                        if (!params || !(typeof params == 'object')) return;
                                        if ( params.value === Math.floor(params.value)) {
                                            return params.value;
                                        } else {
                                            return params.value.toFixed(2);
                                        }
                                    }()),
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
                        })
                    )
                    
                })
                temp[temp.length-1].itemStyle = {
                    normal: {
                        color: 'transparent'
                    }
                }
                return temp;
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
    /**
     * desc: 设置图表数据
     * @param [
     *     {
     *         name: 'string', // 数据类名称
     *         data: [], // 数据数组
     *     }
     * ] args 图表数据对象
     */
    setData: function (data) {
        if (!data || data.length === 0 || !(data instanceof Array)) return;
        data = _.sortBy(data, function(item){ return item.value});
        $.each(data, function (k, v) {
            var tempArr = Array(data.length+1);
            tempArr[k] = v.value;
            v['data'] = tempArr;
        })
        var temp = Array(data.length+1);
        var d = data[data.length-1].value*4/3;
        temp[temp.length-1] = d;
        data.push({
            name: '',
            value: d,
            data: temp,
        })
        this.update({data: data});
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
    getLegendData: function (data) {
        if (!data || data.length === 0) return;
        var legendDataArr = [];
        $.each(data, function (k, v) {
            legendDataArr.push(v.name);
        });
        return legendDataArr;
    },
    formatterData: function (data) {
        if (!data || data.length === 0) return;
        var array = [];
        $.each(data, function (k, v) {
            var tempArr = [];
            $.each(v.data, function (m, n) {
                tempArr.push({
                    name: v.name,
                    value: n,
                })
            })
            array.push(tempArr);
        });
        return array;
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
    /**
     * desc: 显示y轴标签
     */
    showYLabel: function () {
        this._showYLabel();
        this.render();
    },
    /**
     * desc: 隐藏y轴标签
     */
    hideYLabel: function () {
        this._hideYLabel();
        this.render();
    },
    /**
     * desc: 显示x轴标签
     */
    showXLabel: function () {
        this._showXLabel();
        this.render();
    },
    /**
     * desc: 隐藏x轴标签
     */
    hideXLabel: function () {
        this._hideXLabel();
        this.render();
    },
});
//   return E_Bar_Polar_0;

// })

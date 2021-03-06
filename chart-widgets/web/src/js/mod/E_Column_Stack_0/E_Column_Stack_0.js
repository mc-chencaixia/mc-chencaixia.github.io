// define(function () {
'use strict';
var E_Column_Stack_0 = function () {
	if (!(this instanceof E_Column_Stack_0)) {
		return new E_Column_Stack_0();
	}
};

E_Column_Stack_0.prototype = $.extend(new E_Base(), {
	version: '0.0.1',
    defaultOption: {
        color: ['#6090DC', '#DF892A', '#2DBD32'],
        title: {
            show: true,
            text: '主标题',
            subtext: '副标题',
        },
        legend: {
            show: true,
            data: [],
            left: 0,
            bottom: 0,
            itemWidth: 8,
            itemHeight: 8,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'null' // 默认为直线，可选为：'line' | 'shadow'
            },
            // formatter: function (params) {
            //     var nameStr,
            //         valueStr,
            //         contentStr = '',
            //         marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#;"></span>';
            //     $.each(params, function (k, v) {
            //         if (k === 0) {                  
            //             nameStr = v.name;
            //         }
            //         if ( v.value === Math.floor(v.value)) {
            //             valueStr = v.value;
            //         } else {
            //             valueStr = v.value.toFixed(2);
            //         }
            //         contentStr = contentStr + '<br>' + marker.replace('#', v.color) + v.seriesName + '：' + valueStr;
            //     })
            //     return nameStr + contentStr;
            // },
        },
        xAxis: {
            min: 0,
            data: (function () {
                var i = 8;
                var res = [];
                while (--i) {
                    res.unshift(i + '月');
                }
                return res;
            }()),
            name: '',
            nameGap: 30,
            nameLocation: 'middle',
            axisLabel: {
                //inside: true,
                interval: false, // 默认x轴标签不隐藏显示
                show: true,
                textStyle: {
                    color: '#000'
                },
                rotate: 0
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
            name: '',
            nameGap: 54,
            nameRotate: 0,
            nameLocation: 'middle',
            nameTextStyle: {
                color: '000',
                fontSize: '13',
                fontWeight: 500
            }
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: [
            {
                type: 'bar',
                stack: '参考数据',
                label: {
                    normal: {
                        show: false,
                        position: 'top',
                        // formatter: function(obj){return that.thousandBitSeparator(obj.data);},//that.thousandBitSeparator,
                        textStyle: {
                            color: '#43C2F2',
                            fontSize: '14'
                        }
                    }
                },
                data: [
                    {name: 'example1', value: 620}, 
                    {name: 'example1', value: 732}, 
                    {name: 'example1', value: 701}, 
                    {name: 'example1', value: 734}, 
                    {name: 'example1', value: 1090}, 
                    {name: 'example1', value: 1130}, 
                    {name: 'example1', value: 1120}
                ],
            },
            {
                type: 'bar',
                stack: '参考数据',
                label: {
                    normal: {
                        // show: String(args.itemLabel) != 'undefined' ? args.itemLabel : true,
                        position: 'right',
                        // formatter: function(obj){return that.thousandBitSeparator(obj.data);},//that.thousandBitSeparator,
                        textStyle: {
                            color: '#43C2F2',
                            fontSize: '14'
                        }
                    }
                },
                data: [
                    {name: 'example2', value: 620 * 0.2}, 
                    {name: 'example2', value: 732 * 0.2}, 
                    {name: 'example2', value: 701 * 0.2}, 
                    {name: 'example2', value: 734 * 0.2}, 
                    {name: 'example2', value: 1090 * 0.2}, 
                    {name: 'example2', value: 1130 * 0.2}, 
                    {name: 'example2', value: 1120 * 0.2}
                ],
            },
            {
                // name: 'example3',
                type: 'bar',
                stack: '参考数据',
                label: {
                    normal: {
                        // show: String(args.itemLabel) != 'undefined' ? args.itemLabel : true,
                        position: 'top',
                        // formatter: function(obj){return that.thousandBitSeparator(obj.data);},//that.thousandBitSeparator,
                        textStyle: {
                            color: '#43C2F2',
                            fontSize: '14'
                        }
                    }
                },
                data: [
                    {name: 'example3', value: 320}, 
                    {name: 'example3', value: 332}, 
                    {name: 'example3', value: 301}, 
                    {name: 'example3', value: 334}, 
                    {name: 'example3', value: 390}, 
                    {name: 'example3', value: 330}, 
                    {name: 'example3', value: 320}
                ],
                // barCategoryGap: '50%',
            },

        ]
    },
	init: function (cfg) {
        var that = this;
		this._init(cfg);
		this.title = cfg.title || '';
		this.subTitle = cfg.subTitle || '';
		this.yAxisMin = cfg.yAxisMin || 0;
        this.xAxisName = cfg.xAxisName || '';
        this.yAxisName = cfg.yAxisName || '';
        this.xAxisData = cfg.xAxisData || this.defaultOption.xAxis.data;
		this.data = this.formatterData(cfg.data) || [this.defaultOption.series[0].data, this.defaultOption.series[1].data, this.defaultOption.series[2].data];
        this.legendData = this.getLegendData(cfg.data) || this.defaultOption.legend.data;
		this.isShowTitle = cfg.isShowTitle === false ? false : true;
        this.isShowSubtitle = cfg.isShowSubtitle === false ? false : true;
        this.isShowXLabel = cfg.isShowXLabel === false ? false : true;
        this.isShowYLabel = cfg.isShowYLabel === false ? false : true;
        this.isShowXAxisName = cfg.isShowXAxisName === false ? false : true;
        this.isShowYAxisName = cfg.isShowYAxisName === false ? false : true;
        this.isShowItemLabel = cfg.isShowItemLabel === false ? false : true;
		this.layout = this.chartLayout();
		this.currentOption = $.extend({}, this.defaultOption, {
			title: {
				show: this.isShowTitle,
				text: this.title,
				subtext: this.subTitle,
			},
            legend: $.extend({}, this.defaultOption.legend, {
                data: (function () {
                    var legendDataArr = [];
                    var colorLen = that.defaultOption.color.length;
                    $.each(that.legendData, function (k, v) {
                        legendDataArr.push({
                            name: v,
                            icon: 'circle',
                            textStyle: {
                                color: that.defaultOption.color[k >= colorLen ? k - colorLen : k],
                            }
                        });
                    })
                    return legendDataArr;
                }()),
            }),
			grid: this.layout,
			xAxis: $.extend({}, this.defaultOption.xAxis, {
				// min: this.xAxisMin
                data: this.xAxisData,         
                axisLabel: {
                    show: this.isShowXLabel,
                    formatter: function(value){
                        return that._formateLargeData(value);
                    },
                },         
                name: this.isShowXAxisName ? this.limitNameLength(this.xAxisName) : '',
			}),
			yAxis: $.extend({}, this.defaultOption.yAxis, {
				min: this.yAxisMin,
                axisLabel: {
                    show: this.isShowYLabel,
                    formatter: function(value){
                        return that._formateLargeData(value);
                    },
                },
                name: this.isShowYAxisName ? this._formatStr(this.limitNameLength(this.yAxisName)) : '',
			}),
			series: (function () {
                var seriesArr = [];
                $.each(that.data, function (k, v) {
                    var tempObj = {};
                    tempObj = $.extend({}, that.defaultOption.series[0], {
                        name: that.legendData[k],
                        data: v,
                        label: {
                            normal: {
                                show: that.isShowItemLabel,
                                position: 'inside',
                                formatter: function(params){
                                    return that._formateLargeData(params.value);
                                },
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
                    });
                    seriesArr.push(tempObj);
                })
                return seriesArr;
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
        this.xAxisName = cfg.xAxisName || this.xAxisName;
        this.yAxisName = cfg.yAxisName || this.yAxisName;
		this.yAxisMin = cfg.yAxisMin || this.yAxisMin;
        this.xAxisData = cfg.xAxisData || this.xAxisData;
        this.data = this.formatterData(cfg.data) || this.data;
        this.legendData = this.getLegendData(cfg.data) || this.legendData;
		this.isShowTitle = cfg.isShowTitle === undefined ? this.isShowTitle : cfg.isShowTitle;
        this.isShowSubtitle = cfg.isShowSubtitle === undefined ? this.isShowSubtitle : cfg.isShowSubtitle;
		this.isShowXLabel = cfg.isShowXLabel === undefined ? this.isShowXLabel : cfg.isShowXLabel;
		this.isShowYLabel = cfg.isShowYLabel === undefined ? this.isShowYLabel : cfg.isShowYLabel;
        this.isShowXAxisName = cfg.isShowXAxisName === undefined ? this.isShowXAxisName : cfg.isShowXAxisName;
        this.isShowYAxisName = cfg.isShowYAxisName === undefined ? this.isShowYAxisName : cfg.isShowYAxisName;
		this.isShowItemLabel = cfg.isShowItemLabel === undefined ? this.isShowItemLabel : cfg.isShowItemLabel;
		this.layout = this.chartLayout();
        this.currentOption = $.extend(true, {}, this.defaultOption);
		this.currentOption = $.extend({}, this.defaultOption, {
			title: {
				show: this.isShowTitle,
				text: this.title,
				subtext: this.subTitle,
			},
            legend: $.extend({}, this.defaultOption.legend, {
                // data: this.legendData
                data: (function () {
                    var legendDataArr = [];
                    var colorLen = that.defaultOption.color.length;
                    $.each(that.legendData, function (k, v) {
                        legendDataArr.push({
                            name: v,
                            icon: 'circle',
                            textStyle: {
                                color: that.defaultOption.color[k >= colorLen ? k - colorLen : k],
                            }
                        });
                    })
                    return legendDataArr;
                }()),
            }),
			grid: this.layout,
			xAxis: $.extend({}, this.defaultOption.xAxis, {
                data: this.xAxisData,
                axisLabel: {
                    show: this.isShowXLabel,
                    formatter: function(value){
                        return that._formateLargeData(value);
                    },
                },     
                name: this.isShowXAxisName ? this.limitNameLength(this.xAxisName) : '', 
			}),
			yAxis: $.extend({}, this.defaultOption.yAxis, {
				min: this.yAxisMin,
                axisLabel: {
                    show: this.isShowYLabel,
                    formatter: function(value){
                        return that._formateLargeData(value);
                    },
                },
                name: this.isShowYAxisName ? this._formatStr(this.limitNameLength(this.yAxisName)) : '',
			}),
            series: (function () {
                var seriesArr = [];
                $.each(that.data, function (k, v) {
                    var tempObj = {};
                    tempObj = $.extend({}, that.defaultOption.series[0], {
                        name: that.legendData[k],
                        data: v,
                        label: {
                            normal: {
                                show: that.isShowItemLabel,
                                position: 'inside',
                                formatter: function(params){
                                    return that._formateLargeData(params.value);
                                },
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
        this.update({data: data});
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
			this.update({yAxisMin: data});
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
});
// return E_Column_Stack_0;
// });
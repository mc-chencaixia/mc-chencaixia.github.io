'use strict'

/**
 * [E_Column_Basic_0 description]
 */
function E_Column_Basic_0() {};
E_Column_Basic_0.prototype = new Base();

/**
 * desc: 初始化图表组件
 * @param  {
 *     dom: HTML dOM Document 对象,
 *     
 *     option: echarts图表的配置项,
 * } args 初始化图表的参数
 * 
 * @return {[type]}       [description]
 */
E_Column_Basic_0.prototype.init = function (args) {
	if (!args.dom || typeof args.dom !== 'object' || args.dom.nodeType !== 1) throw new Error('请传入正确的dom元素');
	this._dom_ = args.dom;
	var chart = echarts.init(this._dom_);
	var that = this;
	var option = {
		title: args.title ? {
			show: true,
			text: args.title,
			subtext: args.subTitle ? args.subTitle : '',
		} : {},
		legend: {},
		tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		grid: {
			left:  (function() {
				var offset = 0;
				if (args.yAxisLabel || String(args.yAxisLabel) == 'undefined') {
					offset = 55;
				} else {
					offset = 0;
				}
				return offset;
			}()),
			right: args.grid ? args.grid.right : 0,
			top: (function() {
				if (args.title) {
					if (args.subTitle) {
						return 55;
					}
					return 35;
				} else {
					return 6;
				}
			}()),
			bottom: (function() {
				if (args.xAxisLabel || String(args.xAxisLabel) == 'undefined') {
					return 35;
				} else {
					var offset = 0;
					args.yAxisLabel ? offset = 6 : offset = 1;
					return offset;
				}
			}()),
		},
		xAxis: {
			min: args.xAxisMin,
	        data: (function(){
	        	var i = 13;
	        	var res = [];
	        	while(--i){
	        		res.unshift(i + '月');
	        	}
	        	return res;
	        }()),
	        axisLabel: {
	            //inside: true,
	            interval: false, // 默认x轴标签不隐藏显示
	            show: String(args.xAxisLabel) != 'undefined' ? args.xAxisLabel : true,
	            textStyle: {
	                color: '#000'
	            },
	            rotate: args.isXTextRotate ? 45 : 0
	        },
	        splitLine:{
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
	    	min: args.yAxisMin,
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
	        	show: String(args.yAxisLabel) != 'undefined' ? args.yAxisLabel : true,
	            textStyle: {
	                color: '#999'
	            }
	        },
	        nameLocation: 'end',
	        nameTextStyle:{
	            color: '000',
	            fontSize: '13',
	            fontWeight: 500
	        }
	    },
	    dataZoom: [
	        {
	            type: 'inside'
	        }
	    ],
	    series: [
	        {
	        	name: 'example',
	            type: 'bar',
	            barWidth: '30%',
	            label:{
	            	normal:{
	            		show: String(args.itemLabel) != 'undefined' ? args.itemLabel : true,
	            		position: 'top',
	            		formatter: function(obj){return that.thousandBitSeparator(obj.data);},//that.thousandBitSeparator,
	            		textStyle:{
	            			color: '#43C2F2',
	            			fontSize: '14'
	            		}
	            	}
	            },
	            itemStyle: {
	                normal: {
	                    color: new echarts.graphic.LinearGradient(
	                        0, 0, 0, 1,
	                        [
	                            {offset: 0, color: '#43C2F2'},
	                            {offset: 0.5, color: '#56CFF6'},
	                            {offset: 1, color: '#81DFFB'}
	                        ]
	                    )
	                },
	                emphasis: {
	                    color: new echarts.graphic.LinearGradient(
	                        0, 0, 0, 1,
	                        [
	                            {offset: 0, color: '#43C2F2'},
	                            {offset: 0.7, color: '#56CFF6'},
	                            {offset: 1, color: '#83bff6'}
	                        ]
	                    )
	                }
	            },
	            data: (function(){
		        	var i = 13;
		        	var res = [];
		        	while(--i){
		        		res.push(~~(Math.random()*120));
		        	}
		        	return res;
		        }())
	        }
	    ]
	};
	!!args.option && (option = $.extend(option, args.option));
	this._option_ = option;
	this.chart = chart;
	if (args.data) {
		this.render(args.data);
	}
	this.resize();
};

/**
 * desc: 渲染图表
 * @param  {
 *     
 * } data [description]
 * @return {[type]}      [description]
 */
E_Column_Basic_0.prototype.render = function (args) {
	if (!!args) {}
	$.each(args, function (k, v) {

	});
	this._option_.xAxis.data = args['xAxis'];
	this._option_.series[0]['name'] = args['name'];
	this._option_.series[0]['data'] = args['data'];
	this.chart.setOption(this._option_);
};

/**
 * desc: 设置x轴信息
 * @param {
 *    name: 'x轴名称',
 *    data: [item1, item2, ...]
 * } opt x轴参数
 */
E_Column_Basic_0.prototype.setXAxis = function(opt){
	var option = this.chart.getOption();
	option.xAxis[0] = _.extend(option.xAxis[0], opt);
	this.chart.setOption(option);
}

/**
 * desc: 设置y轴的信息
 * @param {
 *    name: 'y轴名称',
 *    data: [item1, item2, ...]
 * } opt y轴参数
 */
E_Column_Basic_0.prototype.setYAxis = function(opt){
	var option = this.chart.getOption();
	option.yAxis[0] = _.extend(option.yAxis[0], opt);
	this.chart.setOption(option);
}

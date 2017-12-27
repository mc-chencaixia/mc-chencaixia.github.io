/**
 * desc: 堆叠柱形图
 * @className: E_Column_Stack_0
 */
function E_Column_Stack_0() {};
E_Column_Stack_0.prototype = new Base();

/**
 * desc: 初始化堆叠柱状图
 * @param  {
 *    dom: document.getElementById("J_Column_Basic_0"), // HTML元素节点
 *	  title: '主标题',	// 图表的主标题
 *    subTitle: '副标题',	// 图表的副标题
 *    yAxisLabel: true,	// X轴标签显示开关 默认为 true
 *    xAxisLabel: true,	// Y轴标签显示开关 默认为 true
 *    itemLabel: true,	// 图例item的标签
 *} args 初始化配置参数
 */
E_Column_Stack_0.prototype.init = function (args) {
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
	    series : [
	    {
	            name:'告警值',
	            type:'bar',
	            stack: '参考数据',
	            label:{
	            	normal:{
	            		// show: String(args.itemLabel) != 'undefined' ? args.itemLabel : true,
	            		position: 'top',
	            		// formatter: function(obj){return that.thousandBitSeparator(obj.data);},//that.thousandBitSeparator,
	            		textStyle:{
	            			color: '#43C2F2',
	            			fontSize: '14'
	            		}
	            	}
	            },
	            data:[
	            	{value:620, },
	            	{value:732,},
	            	{value:701} ,
	            	{value: 734}, 
	            	{value:1090}, 
	            	{value:1130}, 
	            	{value:1120},
	            ],
	            itemStyle:{
			    	normal:{
			    		'color':'#c23531',
			    	},
			    	emphasis:{
			    		'color':'#c23531',
			    	}
			    },

	        },
	        {
	            name:'基准值',
	            type:'bar',
	            stack: '参考数据',
	            label:{
	            	normal:{
	            		// show: String(args.itemLabel) != 'undefined' ? args.itemLabel : true,
	            		position: 'top',
	            		// formatter: function(obj){return that.thousandBitSeparator(obj.data);},//that.thousandBitSeparator,
	            		textStyle:{
	            			color: '#43C2F2',
	            			fontSize: '14'
	            		}
	            	}
	            },
	            data:[620*0.2, 732*0.2, 701*0.2, 734*0.2, 1090*0.2, 1130*0.2, 1120*0.2],
	            itemStyle:{
			    	normal:{
			    		'color':'#61a0a8',
			    	},
			    	emphasis:{
			    		'color':'#61a0a8',
			    	}
			    }
	            
	        },
	        {
	            name:'当前值',
	            type:'bar',
	            stack: '参考数据',
	            label:{
	            	normal:{
	            		// show: String(args.itemLabel) != 'undefined' ? args.itemLabel : true,
	            		position: 'top',
	            		// formatter: function(obj){return that.thousandBitSeparator(obj.data);},//that.thousandBitSeparator,
	            		textStyle:{
	            			color: '#43C2F2',
	            			fontSize: '14'
	            		}
	            	}
	            },
	            data:[
	            	{value:320, },
	            	{value:332,},
	            	{value:301} ,
	            	{value: 334}, 
	            	{value:390}, 
	            	{value:330}, 
	            	{value:320}],		            
			    barCategoryGap:'50%',	
			    itemStyle:{
			    	normal:{
			    		'color':'#2f4554',				    		
			    	},
			    	emphasis:{
			    		'color':'#2f4554',
			    	}
			    }
			                
	        },
	        
	    ]
	};

	!!args.option && (option = $.extend(option, args.option));
	this._option_ = option;
	this.chart = chart;
	if (args.data) {
		this.render(args.data);
	}
	this.resize();
}

/**
 * desc: 
 * @param  {
 * 
 * } args 渲染图标的参数
 */
E_Column_Stack_0.prototype.render = function (args) {
	var that = this;
	var legendData = [];
	$.each(args.data, function (k, v) {
		that._option_.series[k] = $.extend(that._option_.series[k], v);
		legendData.push(v.name);
	});
	this._option_.legend.data = legendData;
	this.chart.setOption(this._option_);
}

E_Column_Stack_0.prototype.setXAxis = function (args) {
	var option = this.chart.getOption();
	option.xAxis[0] = $.extend(option.xAxis[0], args);
	this.chart.setOption(option);
}
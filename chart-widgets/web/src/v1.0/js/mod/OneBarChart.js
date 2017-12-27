// 竖立柱状图
// var OneBarChart = {
// 	init: function(url, dom, cube, dimension, measure, title){

// 	}
// }
/**
 *  className: OneBarChart
 * 	desc: 竖立的柱状图
 *  auth: tangb
 */

function OneBarChart(){}
OneBarChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
	  title: {text:'', textStyle: {color:'', fontSize:'',..}, top: '', left: ''}
   	  data: {
		max: '500',
		current: '220',
		lastValue: '',
		percent : '',
		flag: true | false,
		color: '#26C6DA' | '#5C6BC0'
   	  },
   	  option: 
   }
 * desc: 初始化柱状图
 */

OneBarChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
	this._dom_ = opt.dom;
	var chart = echarts.init(this._dom_);
	var that = this;
	var option = {
	    title: opt.title,
	    grid: {
	    	left: 50,
	    	right: 60,
	    	top: '45%',
	    	bottom: '20%'
	    },
	    xAxis: {
	        type : 'value',
	        show: false,
	        axisLabel: {
	            //inside: true,
	            textStyle: {
	                color: '#111'
	            }
	        },
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false
	        },
	        splitLine: {
	            show: false
	        }
	    },
	    yAxis: {
	        type : 'category',
	        axisLine: {
	            show: false
	        },
	        axisTick: {
	            show: false
	        },
	        axisLabel: {
	            textStyle: {
	                color: '#999'
	            }
	        },
	        data: ['7']
	    },
	    dataZoom: [
	        {
	            type: 'inside'
	        }
	    ],
	    series: [
	        { // For shadow
	            type: 'bar',
	            itemStyle: {
	                normal: {color: 'rgba(0,0,0,0.05)'}
	            },
	            barGap:'-100%',
	            barWidth: 12,
	            barCategoryGap:'40%',
	            data: [500],
	            markLine : {
	                lineStyle: {
	                    normal: {
	                        type: 'solid',
	                        color: 'blue'
	                    }
	                },
	                label: {
	                	normal: {
	                		show: false
	                	}
	                },
	                symbol: ['none'],
	                symbolSize: 8,
	            	symbolRotate: 180,
	                data : [
	                    //{type : 'average', name: '平均值'},
	                    { xAxis: 170, yAxis: 10 }
	                ]
	            },
	            markPoint:{
	            	symbol: ['triangle'],
	            	symbolOffset: [0, -20],
	            	symbolSize: 8,
	            	symbolRotate: 180,
	            	label: {
	            		normal: {
	            			show: false
	            		}
	            	},
	            	itemStyle: {
	            		normal: {
	            			color: 'blue'
	            		}
	            	},
	            	data: [
	            		{x: 170}
	            	]
	            },
	            animation: false
	        },
	        {
	            type: 'bar',
	            data: [220],
	            barWidth: 12,
	            itemStyle: {
	            	normal: {
	            		// color: 'red'
	            	}
	            }
	        }
	    ]
	};
	!!opt.option && (option = _.extend(option, opt.option));
	//chart.setOption(option);
	this._option_ = option; 
	this.chart = chart;
	if(opt.data){
		this.render(opt.data);
	}

	this.resize();
}

/**
 *
 *  渲染
 	data:{
			name: '',
			xAxis: ['1月', '2月', ...],
			data: []
		},
		
 *
 */
OneBarChart.prototype.render = function(data){
	var ratio = 100 * (data['current'] - data['lastValue'])/data['current'];
	this._option_.yAxis.data = [(+data['current']).toFixed(1)];
	this._option_.series[0]['data'] = [data['max']];
	this._option_.series[0]['label'] = { 
        normal: {
            show: true,
	        position: 'right',
	        color: data.flag ? '#36C398' : '#F65161',
	        formatter: function() {
	        	return (ratio > 0 ? '▲ ' : '▼ ') + ratio.toFixed(1)+ '%'; 
	        }
        }
    };
	this._option_.series[0]['markLine']['data'] = [{ xAxis: (+data['lastValue']).toFixed(1) }];
	this._option_.series[0]['markLine']['lineStyle'] = {
		normal: {
            type: 'solid',
            color: data.flag ? '#36C398' : '#F65161'
        }
    };
    this._option_.series[0]['markPoint']['data'] = [{ xAxis: (+data['lastValue']).toFixed(1) }];
    this._option_.series[0]['markPoint']['itemStyle'] = {
		normal: {
            color: data.flag ? '#36C398' : '#F65161'
        }
    }
	this._option_.series[1]['data'] = [data['current']];
	this._option_.series[1]['itemStyle'] = {
		normal: {
			color: data.color || '#26C6DA'
		}
	};
	this._option_.yAxis.axisLabel = {
		textStyle: {
            color: data.color || '#26C6DA'
        }
	};
	this.chart.setOption(this._option_);
}
/**
 *
 *  设置数据
 *  data: {
		max: '500',
		current: '220',
		lastValue: '',
		percent : '',
		flag: true | false
   	  },
 */

OneBarChart.prototype.setData = function(data){
	this.render(data);
}
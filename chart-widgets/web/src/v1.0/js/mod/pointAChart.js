
/**
 *  className: PointAChart
 * 	desc: 散点图
 *  auth: tangb
 */

function PointAChart(){}
PointAChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
      title: {text:'', textStyle: {color:'', fontSize:'',..}, top: '', left: ''}
	  data: [],
      option: 参考 echart.option
   }
 * desc: 初始化折线图
 */

PointAChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
	this._dom_ = opt.dom;
	var chart = echarts.init(this._dom_);
	var option = {
        color: ['#8EE0F9', '#F9B4AE', '#EC9B00', '#88DC27', '#3EB193'],
        title: opt.title || {},
        legend: {
	        right: 10,
	        data: ['1990', '2015']
	    },
	    grid:{
	    	left: 60,
	    	right: 10,
	    	bottom: 50
	    },
	    xAxis: {
	        splitLine: {
	            lineStyle: {
	                type: 'dashed'
	            }
	        },
	        axisLabel: {
	        	textStyle:{
	        		color: '#424242',
	        		fontSize: 13,
	        		fontWeight: 600
	        	},
	        	rotate: 45
	        }
	    },
	    yAxis: {
	        splitLine: {
	            lineStyle: {
	                type: 'dashed'
	            }
	        },
	        axisLabel: {
	        	textStyle:{
	        		color: '#424242',
	        		fontSize: 13,
	        		fontWeight: 600
	        	},
	        	formatter: function(param){
	        		var res;
	        		if(param > 1000){
	        			if(param > 10000){
	        				res = (param/10000).toFixed(1) + '万';
	        			}else{
	        				res = (param/1000).toFixed(1) + '千';
	        			}
	        		}
	        		return res;
	        	}
	        },
	        scale: true
	    },
	    series: [{
	        name: '1990',
	        type: 'scatter',
	        // symbolSize: function (data) {
	        //     return Math.log(data)*2;
	        // },
	        label: {
	            emphasis: {
	                show: true,
	                formatter: function (param) {
	                    return param.data[3];
	                },
	                position: 'top'
	            }
	        }
	    }]
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
/*
    图形绘制
    data:[
        {
            name:'',
            xAxis: [],
            data: []
        },
        {
            name: '',
            data: [],
        },...
    ]
*/
PointAChart.prototype.render = function(data){
    this._option_.legend['data'] = [];
    var series = this._option_.series[0];
    var results = [];
    for(var i=0;i<data.length;i++){
        this._option_.legend['data'].push(data[i]['name']);
        if(data[i]['xAxis']){
            this._option_.xAxis['data'] = data[i]['xAxis'];
        }
        var obj = _.extend({}, series);
        obj.name = data[i].name;
        obj.data = (function(item){
        	var res = [];
        	for(var i=0; i<item.length; ++i){
        		var tmp = {};
        		tmp.value = item[i][0];
        		tmp.symbolSize = Math.log(item[i][1])*2;
        		res.push(tmp);
        	}
        	return res;
        }(data[i]['data']));
        results.push(obj);
    }
    this._option_.series = results;
    this.chart.setOption(this._option_);
}
/**
 *
 *  设置数据
 *  data: [[12,21,...],...]
 */

PointAChart.prototype.setData = function(data){
	var option = this.chart.getOption();
	if(data.length !== option.series.length) throw new Error("数据长度不一致");
	for(var i=0; i<option.series.length; i++){
		option.series[i]['data'] = data[i];
	}
	this.chart.setOption(option);
}
/**
 *
 * 设置 x轴数据
 * data: ['1月', '2月', ...]
 */

PointAChart.prototype.setXAxis = function(data){
	var option = this.chart.getOption();
	option.xAxis[0]['data'] = data;
	chart.setOption(option);
}
/**
 *
 *  设置 y轴数据 (一般不用设置通过echarts自己运算得出)
 *	data: ['100','200', '...']
 */
PointAChart.prototype.setYAxis = function(){
	var option = this.chart.getOption();
	option.yAxis[0]['data'] = data;
	chart.setOption(option);
}
/**
 * 获取echart图表实例
 * 
*/
PointAChart.prototype.getChart = function(){
	return this.chart;
}



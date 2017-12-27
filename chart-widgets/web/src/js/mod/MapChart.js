/**
 *  className: MapChart
 *  dependence: [
		uderscore.1.8.3,
 	]
 * 	desc: echarts地图
 *  auth: tangb
 */

function MapChart(){}
MapChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
	  title: {text:'', textStyle: {color:'', fontSize:'',..}, top: '', left: ''}
   	  data: [],
   	  option: 
   }
 * desc: 初始化柱状图
 */

MapChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
	this._dom_ = opt.dom;
	var chart = echarts.init(this._dom_);
	var that = this;
	var option = {
		color: ['#3EB193', '#88DC27', '#FF6D60','#EC9B00', '#F46B5D'],
	    tooltip: {
	        trigger: 'item'
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	    },
	    visualMap: {
	        min: 0,
	        max: 2500,
	        left: '5%',
	        top: 'bottom',
	        text: ['高','低'],           // 文本，默认为数值文本
	        calculable: true,
	        color:['#FF6D60','#43C2F0']
	    },
	    // toolbox: {
	    //     show: true,
	    //     orient: 'vertical',
	    //     left: 'right',
	    //     top: 'center',
	    //     feature: {
	    //         dataView: {readOnly: false},
	    //         restore: {},
	    //         saveAsImage: {}
	    //     }
	    // },
	    series: [
	        {
	            type: 'map',
	            mapType: 'china',
	            roam: false,
	            itemStyle: {
		            normal: {
		                //areaColor: '#323c48',
		                borderColor: '#aaa'
		            },
		            emphasis: {
		                areaColor: '#eee'
		            }
		        },
	            label: {
	                normal: {
	                    show: true
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	            data:[],
	        }
	    ]
	};
	!!opt.option && (option = _.extend(option, opt.option));
	// chart.setOption(option);
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
 	data:[
		{name: '浙江', value: ''}
 	]
		
 *
 */
MapChart.prototype.render = function(data){
	data = data.sort(function(a, b){
		return b.value - a.value;
	});
	var max = ~~(+data[0].value  + 10);
	this._option_.visualMap.max = max;
	this._option_.series[0]['data'] = data;
	this.chart.setOption(this._option_);
}
/**
 *
 *  设置数据
 *  data: [12,21,...]
 */

MapChart.prototype.setData = function(data){
	var option = this.chart.getOption();
	option.series[0]['data'] = data;
	this.chart.setOption(option);
}



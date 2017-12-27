/**
 *  className: PolylineChart
 * 	desc: 折线图
 *  auth: tangb
 */

function PolylineChart(){}
PolylineChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
      title: {text:'', textStyle: {color:'', fontSize:'',..}, top: '', left: ''}
	  option: 参考 echarts.option,
      data: 
   }
 * desc: 初始化折线图
 */

PolylineChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
    this._dom_ = opt.dom;
    var chart = echarts.init(this._dom_);
	var option = {
        tooltip: {
            trigger: 'axis',
        },
        grid:{
            top:'8%',
            bottom: '8%',
            left: '8%',
            right: '2%'
        },
        legend: {
            top: 'top',
            right: '10%',
            data:['门诊人次', '门诊收入']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            nameTextStyle: {
                color: "#000"
            },
            data: (function (){
                var now = new Date();
                var res = [];
                var len = 13;
                while (--len) {
                    res.unshift(len + "月");
                }
                return res;
            })()
        },
        yAxis: {
            type: 'value',
            //boundaryGap: [0, '20%'],
            axisLabel: {
                textStyle: {
                    color: '#000'
                },
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: ['#40404A']
                },
            }
        },
        series: [
            {
                name:'门诊人次',
                type:'line',
                smooth: false,
                symbol: 'circle',
                sampling: 'average',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: '#4FCBF2'
                    }
                },
                lineStyle:{
                	normal:{
                		color: '#4FCBF2'
                	}
                },
                data: (function(){
                	var count = 12;
                	var res = [];
                	while(count--){
                		res.push(Math.random() * 100);
                	}
                	return res;
                })()
            },
            {
                name:'门诊收入',
                type:'line',
                smooth: false,
                symbol: 'circle',
                sampling: 'average',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: '#F4C471'
                    }
                },
                lineStyle:{
                	normal:{
                		color: '#F4C471'
                	}
                },
                data: (function(){
                	var count = 12;
                	var res = [];
                	while(count--){
                		res.push(Math.random() * 100);
                	}
                	return res;
                })()
            }
        ]
    };
	!!opt.option && (option = this._extend(option, opt.option));
    //chart.setOption(option);
    this._option_ = option;
    this.chart = chart;
    if(opt.data){
        this.render(opt.data);
    }
}

/**
 *
 * 图形渲染
 *
 */
PolylineChart.prototype.render = function(data){
    this._option_.legend['data'] = [];
    for(var i=0; i<data.length; i++){
        this._option_.legend['data'].push(data[i]['name']);
        if(data[i]['xAxis']){
            this._option_.xAxis['data'] = data[i]['xAxis'];
        }
        this._option_.series[i]['name'] = data[i]['name'];
        this._option_.series[i]['data'] = data[i]['data'];
    }
    this.chart.setOption(this._option_);
}
/**
 *
 *  设置数据
 *  data: [[12,21,...],...]
 */

PolylineChart.prototype.setData = function(data){
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

PolylineChart.prototype.setXAxis = function(data){
	var option = this.chart.getOption();
	option.xAxis[0]['data'] = data;
	chart.setOption(option);
}
/**
 *
 *  设置 y轴数据 (一般不用设置通过echarts自己运算得出)
 *	data: ['100','200', '...']
 */
PolylineChart.prototype.setYAxis = function(){
	var option = this.chart.getOption();
	option.yAxis[0]['data'] = data;
	chart.setOption(option);
}
/**
 * 获取echart图表实例
 * 
*/
PolylineChart.prototype.getChart = function(){
	return this.chart;
}





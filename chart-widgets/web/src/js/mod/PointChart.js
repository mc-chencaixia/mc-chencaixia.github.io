/**
 *  className: PointChart
 * 	desc: 折线图
 *  auth: tangb
 */

function PointChart(){}
PointChart.prototype = new Base();
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

PointChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
	this._dom_ = opt.dom;
	var chart = echarts.init(this._dom_);
	var option = {
        color: ['#42C1F1', '#F66B5A', '#88DC27', '#3EB193', '#4A8FDD'],
        title: opt.title || {},
        legend: {
            right: '10%',
            data: ['exampleName']
        },
        grid:{
            left: 65,
            right: 20,
            bottom: 50
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#000',
                    type: 'solid',
                    width: 2,
                }
            },
            axisLabel:{
                show: false,
                textStyle:{
                    color: '#000'
                }
            },
            axisTick:{
                show: false
            },
            data: ['1','2'],
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: {
                formatter: function(obj){
                    return Math.abs(obj*100) + '%';
                },
                textStyle:{
                    color: function(item){
                        return +item >= 0 ? '#42C1F1' : '#F66B5A'
                    }   
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#EAEAEA',
                    type: 'solid',
                    width: 2,
                }
            },
            scale: true
        },
        series: [
            {
                name: 'exampleName',
                data: [1,2,3],
                type: 'scatter',
                symbolSize: function (data) {
                    return 10;
                },
                label: {
                    emphasis: {
                        show: true,
                        formatter: function (param) {
                            return param.data[2];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(120, 36, 50, 0.5)',
                        shadowOffsetY: 5,
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
PointChart.prototype.render = function(data){
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
        obj.data = data[i].data;
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

PointChart.prototype.setData = function(data){
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

PointChart.prototype.setXAxis = function(data){
	var option = this.chart.getOption();
	option.xAxis[0]['data'] = data;
	chart.setOption(option);
}
/**
 *
 *  设置 y轴数据 (一般不用设置通过echarts自己运算得出)
 *	data: ['100','200', '...']
 */
PointChart.prototype.setYAxis = function(){
	var option = this.chart.getOption();
	option.yAxis[0]['data'] = data;
	chart.setOption(option);
}
/**
 * 获取echart图表实例
 * 
*/
PointChart.prototype.getChart = function(){
	return this.chart;
}

/**
 *
 * 事件监听
 *
 */
 PointChart.prototype.on = function(name, handler){
    this.chart.on(name, handler);
 }


/**
 *  className: AreaLineChart
 * 	desc: 折线图
 *  auth: tangb
 */

function AreaLineChart(){}
AreaLineChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
      title: {text:'', textStyle: {color:'', fontSize:'',..}, top: '', left: ''}
	  data: [{
        name: '',
        isLine: true,
        smooth: true,
        hasPoint: false,
        xAxis: ['1月'，...],
        data: [23, 34,....]
      }],
      yAxis: [{},{}]
      option: 参考 echarts.option
   }
 * desc: 初始化折线图
 */

AreaLineChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
    this._dom_ = opt.dom;
    var chart = echarts.init(this._dom_);
	var option = {
        color: ['#43C2F2', '#FBEACB', '#FF6D60', '#8EE0F9', '#D44834', '#EC9B00', '#F46B5D'],
        title: opt.title || {},
        tooltip: {
            //trigger: 'axis',
        },
        grid:{
            left: 65,
            right: 65,
            bottom: 50
        },
        legend: {
            top: 'top',
            right: '10%',
            data:['今年', '去年', '目标']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            nameTextStyle: {
                color: "#333"
            },
            axisLine:{
                show: true,
                lineStyle: {
                    color:'#ccc'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#333'
                },
            },
            axisTick:{
                show: false
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
                    color: '#333'
                },
            },
            nameLocation: 'end',
            nameTextStyle: {
                color: "#333"
            },
            axisTick:{
                show: false
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
                name:'去年',
                type:'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                sampling: 'average',
                itemStyle: {
                    normal: {
                        //color: '#F4C471',
                        opacity: 0
                    },
                    emphasis: {
                        //color: '#F4C471',
                        opacity: 1
                    }
                },
                areaStyle: {
                    normal: {
                        //color: '#FBEACB'
                    }
                },
                lineStyle:{
                    normal:{
                        //color: '#F4C471'
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
                name:'去年',
                type:'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                sampling: 'average',
                itemStyle: {
                    normal: {
                        //color: '#F4C471',
                        opacity: 0
                    },
                    emphasis: {
                        //color: '#F4C471',
                        opacity: 1
                    }
                },
                areaStyle: {
                    normal: {
                        //color: '#FBEACB'
                    }
                },
                lineStyle:{
                    normal:{
                        //color: '#F4C471'
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
                name:'目标',
                type:'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                sampling: 'average',
                itemStyle: {
                    normal: {
                        //color: '#E49388',
                        opacity: 0,
                    },
                    emphasis: {
                        //color: '#E49388',
                        opacity: 1,
                    }
                },
                lineStyle:{
                    normal:{
                        type: 'solid',
                        //color: '#E49388',
                    }
                },
                data: (function(){
                    var count = 12;
                    var res = [];
                    while(count--){
                        res.push(80);
                    }
                    return res;
                })()
            }
        ]
    };
	!!opt.option && (option = _.extend(option, opt.option));
    this.area = {
        name:'去年',
        type:'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        sampling: 'average',
        itemStyle: {
            normal: {
                //color: '#F4C471',
                opacity: 0,
                borderColor: '#fff',
                borderWidth: 2
            },
            emphasis: {
                //color: '#F4C471',
                opacity: 1
            }
        },
        areaStyle: {
            normal: {
                //color: '#FBEACB'
            }
        },
        lineStyle:{
            normal:{
                //color: '#F4C471'
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
    };
    this.line = {
        name:'目标',
        type:'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: 8,
        sampling: 'average',
        itemStyle: {
            normal: {
                //color: '#E49388',
                opacity: 0,
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                //color: '#E49388',
                opacity: 1,
            }
        },
        lineStyle:{
            normal:{
                type: 'solid',
                //color: '#E49388',
            }
        },
        data: (function(){
            var count = 12;
            var res = [];
            while(count--){
                res.push(80);
            }
            return res;
        })()
    };

    this._option_ = option;
    this.chart = chart;
    if(opt.data){
        this.render(opt.data);
    }
    
    this.resize();
}
/**
 *
 *  图形渲染
 *
 */

AreaLineChart.prototype.render = function(data){
    this._option_.legend['data'] = [];
    // 数据处理
    // this.parseData(data);
    // 处理完的数据结构
    /*
        data: [{
            name: '',
            xAxis: ['1月'，...],
            isLine: true | false,
            data: [23, 34,....]
      },...]
    */
    // 是否双轴
    var yAxis = _.extend({}, this._option_['yAxis']),
        yAxisArr = [];
    var yAxisTmp = this.parseData(data);
    if(yAxisTmp.length>1){
        for(var i=0;i<yAxisTmp.length; i++){
            var yAx = _.extend(yAxisTmp[i], yAxis);
            yAxisArr.push(yAx);
        }
    }
    var series = [],
        legend = [];
    for(var i=0; i<data.length; i++){
        // 判断是区域图还是点图
        var star = "area";
        data[i].isLine ? star = "line" : star;
        if(data[i]['xAxis']){
            this._option_['xAxis']['data'] = data[i]['xAxis'];
        }
        var obj = _.extend({}, this[star]);
        obj = _.extend(obj, data[i]);
        if(data[i]['data'].length<2){
            obj['itemStyle']['normal']['opacity'] = 1;
        }

        // 是否显示线上的点
        if(data[i]['hasPoint']){
            obj['itemStyle']['normal']['opacity'] = 1;
        }
        // 是否平滑
        (typeof(data[i]['smooth']) != "undefined") && (obj['smooth'] = data[i]['smooth']);
        legend.push(data[i].name);
        series.push(obj);
    }
    yAxisArr.length ? (this._option_.yAxis = yAxisArr) : '';
    this._option_.legend['data'] = legend;
    this._option_.series = series;
    
    // for(var i=0; i<data.length; i++){
    //     this._option_.legend['data'].push(data[i]['name']);
    //     if(data[i]['xAxis']){
    //         this._option_.xAxis['data'] = data[i]['xAxis'];
    //     }
    //     this._option_.series[i]['name'] = data[i]['name'];
    //     this._option_.series[i]['data'] = data[i]['data'];
    // }
    this.chart.setOption(this._option_);
}
/**
 *
 * 数据处理
 */
AreaLineChart.prototype.parseData = function(data){
    var index = [];
    for(var i=0;i<data.length;i++){
        if(typeof(data[i].yAxisIndex) !== "undefined"){
            index.push({yAxisIndex: data[i].yAxisIndex, name: !!data[i].name ? data[i].name : '' });
        }
    }
    _.uniq(index, function(item){return item.yAxisIndex})

    return index;
}
/**
 *
 *  设置数据
 *  data: [[12,21,...],...]
 */

AreaLineChart.prototype.setData = function(data){
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

AreaLineChart.prototype.setXAxis = function(data){
	var option = this.chart.getOption();
	option.xAxis[0]['data'] = data;
	chart.setOption(option);
}
/**
 *
 *  设置 y轴数据 (一般不用设置通过echarts自己运算得出)
 *	data: ['100','200', '...']
 */
AreaLineChart.prototype.setYAxis = function(){
	var option = this.chart.getOption();
	option.yAxis[0]['data'] = data;
	chart.setOption(option);
}
/**
 * 获取echart图表实例
 * 
*/
AreaLineChart.prototype.getChart = function(){
	return this.chart;
}





/**
 *  className: CircleChart
    dependences: [
        uderscore.1.8.3,
    ]
 * 	desc: 折线图
 *  auth: tangb
 */

function CircleChart(){}
CircleChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
	  title: echarts.title,
      status: false, // 指定颜色为红色或绿色,
      data: [{name:'', value:''},{name:'', value:''}]
      option: 参考 echarts.option
   }
 * desc: 初始化折线图
 */

CircleChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
	this._dom_ = opt.dom;
    var that = this;
	var chart = echarts.init(this._dom_);
    var color = ['#FF6D60', '#43C2F0'];
    var status = opt.status || false;
    var size = this.getSize(this._dom_);
    var fonts = size.h < size.w ? size.h : size.w;
    fonts = fonts / 14;
	var option = {
        // tooltip: {
        //     trigger: 'item',
        //     formatter: "{a} <br/>{b}: {c} ({d}%)"
        // },
        title: opt.title || {},
        legend: {
            orient: 'vertical',
            x: 'left',
            data: []
        },
        series: [
            {
                type:'pie',
                selectedMode: 'single',
                radius: [0, '50%'],
                selectedOffset: 0,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        formatter: function(item){
                            var value = (item.value * 100);
                            value = value.toFixed(2) + '%';
                            return value +'\n' + item.name;
                        },
                        textStyle:{
                            color: '#fff',
                            fontSize: opt.fontSize || fonts,
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data:[
                    {value:335, name: '男性占比', itemStyle:{normal:{color:color[+status] || status}}},
                ]
            },
            {
                type:'pie',
                radius: ['60%', '65%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle:{
                            color: '#fff',
                            fontSize: 30
                        }
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data:[
                    {value:335, itemStyle:{normal:{color:color[+status] || status}}},{value:234, itemStyle:{normal:{color:'#CCCCCC'}}}
                ]
            }
        ]
    };
	!!this.opt && (option = _.extend(option, this.opt));
	this.chart = chart;
    this.chart.aResize = function(e){
        var dom = chart.getDom(),
        size = that.getSize(dom),
        r = size.h < size.w ? size.h : size.w,
        fontSize = r / 14,
        option = chart.getOption();
        chart.setOption({
            series: [
            {
                label: {
                    normal: {
                        textStyle:{
                            fontSize: fontSize,
                        }
                    }
                }
            }]
        });
        chart.resize(e);
    }
    window.addEventListener("resize", chart.aResize);
    this._option_ = option;
    if(opt.data){
        this.render(opt.data);
    }
}
/**
 * 渲染视图
 * data: [{name:'', value:''},{name:'', value:''}]
 */
CircleChart.prototype.render = function(data){
    var total = 0;
    data.forEach(function(v, i){
        total += (+v.value);
    });
    data.map(function(v){
        v.value = +v.value / total;
    })
    this._option_.series[0]['data'][0] = _.extend(this._option_.series[0]['data'][0], data[0]);
    for(var i=0; i<this._option_.series[1]['data'].length; i++){
        this._option_.series[1]['data'][i] = _.extend(this._option_.series[1]['data'][i], data[i]);
    }
    this.chart.setOption(this._option_);
}
/**
 *
 *  设置数据
 *  data: [{name:'', value:''},{name:'', value:''}]
 */

CircleChart.prototype.setData = function(data){
	var option = this.chart.getOption();
    option.series[0]['data'][0] = _.extend(option.series[0]['data'][0], data[0]);
    option.series[1]['data'] = _.extend(option.series[1]['data'], data);
    this.chart.setOption(option);
}
/**
 * 获取echart图表实例
 * 
*/
CircleChart.prototype.getChart = function(){
	return this.chart;
}



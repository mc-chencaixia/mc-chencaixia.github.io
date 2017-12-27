/**
 *  className: PieChart,
    dependences: {uderscore.1.8.3}
 * 	desc: 饼图
 *  auth: tangb
 */

function PieChart(){}
PieChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
	  title: 参考 echarts.option.title,
      data: [{
        name: '', value: '',
        name: '', value: ''
      }],
      option: 参考echarts.option
   }
 * desc: 初始化饼图
 */

PieChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
    this._dom_ = opt.dom;
	var chart = echarts.init(this._dom_);
	var option = {
        color: ['#EC9B00', '#F66B5C', '#43C2F2', '#3FB391'],
        title: opt.title || {},
        calculable : true,
        itemStyle:{
            normal:{
                borderColor: '#fff',
                borderWidth: 2,
                shadowColor: '#CDCCCA',
                shadowBlur: 4,
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        },
        series : [
            {
                name: 'example',
                type:'pie',
                radius : [0,'45%'],
                center : ['50%', '50%'],
                roseType : 'area',
                label: {
                    normal: {
                        show: true,
                        formatter: '{b} {d}%',
                        textStyle: {
                            fontSize: 12,
                            fontWeight: 500
                        }
                    },
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 10,
                        length2: 10
                    }
                },
                data:[
                    {value:10, name:'转诊'},
                    {value:5, name:'预约'},
                    {value:15, name:'挂号'}
                ]
            }
        ]
    };
	!!opt.option && (option = _.extend(option, opt.option));
    this._option_ = option;
	this.chart = chart;
    
    if(opt.data){
        this.render(opt.data);
    }

    this.resize();
}
/**
 * 图形渲染
 * [{name: '', value: ''}]
 */
PieChart.prototype.render = function(data){
    // this._option_.series[0] = _.extend(this._option_.series[0], data);
    // this.chart.setOption(this._option_);
    this._option_.series[0].data = data;
    this.chart.setOption(this._option_);
}
/**
 *
 *  设置数据
 *  data: [{value: 10, name: '转诊'},{}]
 */

PieChart.prototype.setData = function(data){
	var option = this.chart.getOption();
	option.series[0]['data'] = data;
	this.chart.setOption(option);
}
/**
 * 获取echart图表实例
 * 
*/
PieChart.prototype.getChart = function(){
	return this.chart;
}



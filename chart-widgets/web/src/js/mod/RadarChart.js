/**
 *  className: RadarChart
 * 	desc: 折线图
 *  auth: tangb
 */

function RadarChart(){}
RadarChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
	  option: 参考 echarts.option,
      title: {text:'', textStyle: {color:'', fontSize:'',..}, top: '', left: ''}
      data:{
        radar:[{indicator: [
            {text: '医生数', max: 100},
            {text: '医生出勤率', max: 100},
            {text: '护士数', max: 100},
            {text: '医护比', max: 100},
            {text: '诊间开放率', max: 100}
        ]}],
        data: [
            {
                value: [67, 96.7, 85, 33, 94.2] 
                //name: '某软件'
            },
        ]
      }
   }
 * desc: 初始化雷达图
 */

RadarChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
    this._dom_ = opt.dom;
    var chart = echarts.init(this._dom_);
	var option = {
        color: ['#3EB193', '#88DC27', '#4A8FDD', '#EC9B00', '#F46B5D'],
        title: opt.title || {},
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'center',
            //data:['某软件', '某主食手机', '某水果手机', '降水量', '蒸发量']
        },
        radar: [
            {
                indicator: [
                    {text: '医生数', max: 100},
                    {text: '医生出勤率', max: 100},
                    {text: '护士数', max: 100},
                    {text: '医护比', max: 100},
                    {text: '诊间开放率', max: 100}
                ],
                //radius: 80,
                center: ['50%','50%'],
            }
        ],
        series: [
            {
                type: 'radar',
                 tooltip: {
                    trigger: 'item'
                },
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default',
                            color: 'rgb(158,225,246)'
                        },
                        color: function(item){
                            var color = ['#3EB193', '#88DC27', '#4A8FDD', '#EC9B00', '#F46B5D'];
                            console.log(item)
                            return color[item['dataIndex']];
                        }
                    }
                },
                data: [
                    {
                        value: [67, 96.7, 85, 33, 94.2] 
                        //name: '某软件'
                    },
                ]
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

RadarChart.prototype.render = function(data){
    if(data.radar){
        this._option_.radar = data['radar'];
    }
    if(data.data){
        this._option_.series[0]['data'] = data['data'];
    }
    this.chart.setOption(this._option_);
}
/**
 *
 *  设置数据
 *  data: [[12,21,...],...]
 */

RadarChart.prototype.setData = function(data){
	var option = this.chart.getOption();
	if(data.length !== option.series.length) throw new Error("数据长度不一致");
	for(var i=0; i<option.series.length; i++){
		option.series[i]['data'] = data[i];
	}
	this.chart.setOption(option);
}
// /**
//  *
//  * 设置 x轴数据
//  * data: ['1月', '2月', ...]
//  */

// RadarChart.prototype.setXAxis = function(data){
// 	var option = this.chart.getOption();
// 	option.xAxis[0]['data'] = data;
// 	chart.setOption(option);
// }
// *
//  *
//  *  设置 y轴数据 (一般不用设置通过echarts自己运算得出)
//  *	data: ['100','200', '...']
 
// RadarChart.prototype.setYAxis = function(){
// 	var option = this.chart.getOption();
// 	option.yAxis[0]['data'] = data;
// 	chart.setOption(option);
// }
/**
 * 获取echart图表实例
 * 
*/
RadarChart.prototype.getChart = function(){
	return this.chart;
}





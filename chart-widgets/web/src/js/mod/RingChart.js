/**
 *  className: RingChart
 * 	desc: 环状饼图
 *  auth: tangb
 */

function RingChart(){}
RingChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
	  option: 参考 echarts.option,
      title: {text:'', textStyle: {color:'', fontSize:'',..}, top: '', left: ''}
      data: [
        [
            {value:335, name:'直达',},
            {value:679, name:'营销广告'},
            {value:1548, name:'搜索引擎'}
        ],
        [
            {value:335, name:'直达'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'}
        ]
      ]
   }
 * desc: 初始化雷达图
 */

RingChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
    this._dom_ = opt.dom;
    var chart = echarts.init(this._dom_);
	var option = {
        color: ['#3DB207', '#EEC500', '#EC9B00', '#3FB293', '#43C2F2', '#F66B5C'],
        title: opt.title || {},
        tooltip: {
            trigger: 'axis'
        },
        series: [
            {
                type:'pie',
                selectedMode: 'single',
                radius: [0, '35%'],

                label: {
                    normal: {
                        position: 'inner',
                        formatter: function(s){
                            console.log(s);
                            return s.name + '\n' + s.percent + '%';
                        }
                    }
                },
                itemStyle:{
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:74, name:'住院收入'},
                    {value:66, name:'门诊收入'},
                ]
            },
            {
                type:'pie',
                radius: ['45%', '55%'],
                label: {
                    normal: {
                        position: 'outer',
                        formatter: function(s){
                            console.log(s);
                            return s.name + s.percent + '%';
                        }
                    }
                },
                lableLine: {
                    normal: {
                        show: true,
                        length: 10,
                        length2: 10
                    }
                },
                itemStyle:{
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                },
                data:[
                    {value:32, name:'住院药品'},
                    {value:12, name:'住院诊疗'},
                    {value:30, name:'门诊诊疗'},
                    {value:26, name:'门诊药品'},
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

RingChart.prototype.render = function(data){
    if(!data){
        this.chart.setOption(this._option_);
        return this;
    }
    for(var i=0;i<data.length;i++){
        this._option_.series[i]['data'] = data[i];
    }
    this.chart.setOption(this._option_);
}
/**
 *
 *  设置数据
 *  data: [[12,21,...],...]
 */

RingChart.prototype.setData = function(data){
	var option = this.chart.getOption();
	if(data.length !== option.series.length) throw new Error("数据长度不一致");
	for(var i=0;i<data.length;i++){
        option.series[i]['data'] = data[i];
    }
	this.chart.setOption(option);
}
RingChart.prototype.getChart = function(){
	return this.chart;
}





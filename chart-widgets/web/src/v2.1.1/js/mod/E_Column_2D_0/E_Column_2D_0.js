/**
 *  className: E_Column_2D_0
 * 	desc: 二维柱状图
 *  auth: gaok
 */

function E_Column_2D_0(){}

/**
 * desc: 初始化二维柱状图 
 */

E_Column_2D_0.prototype.init = function(opt){
    this._dom = opt.dom||''
    var chart = echarts.init(this._dom)
    var option = {
        title:[{
            show:true,
            text:'主标题',
            subtext:'副标题'
        }],
        color: ['#FFB300', '#5C6BC0', '#FF6D60', '#8EE0F9', '#D44834', '#EC9B00', '#F46B5D'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            show:true,
            bottom:10,
            data:[
                {
                    name: '',
                    icon: 'circle'
                },
                {
                    name: '',
                    icon: 'circle'
                },
                {
                    name: '',
                    icon: 'circle'
                }
            ]
        },
        xAxis: [
            {
                name:'',
                nameLocation:'middle',
                type: 'category',
                data: [],
                axisPointer: {
                    type: 'shadow'
                },
                axisTick:{
                    show: false
                },
                axisLine:{
                    show:true
                }
            }
        ],
        yAxis: [
            {
                show: true,
                type: 'value',
                name: '',
                nameLocation:'middle',
                nameRotate:90,
                nameGap:40,
                min: 'dataMin',
                // max: 'dataMax',
                axisLabel: {
                    show:true,
                    formatter: '{value}'
                },
                axisTick:{
                    show: true
                },
                axisLine: {
                    show: true
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#DCE6EC',
                        width: 1.2
                    }
                }
            }
        ],
        series: [
            {
                name:'度量0',
                type:'bar',
                data:[]
            },
            {
                name:'度量1',
                type:'bar',
                data:[]
            },
            {
                name:'度量2',
                type:'bar',
                data:[]
            }
        ]
    };
    
    chart.setOption(option);  
    this.chart = chart
    this.option = option
}

/**
 * desc: 渲染图表
 */

 E_Column_2D_0.prototype.render = function(data){
    this.setTitle(data)
    this.setXAxisLabel(data)
    this.setXAxisData(data)
    this.setYAxisLabel(data)
    this.setYAxisData(data,0)
    this.setYAxisData(data,1)
    this.setYAxisData(data,2)   
    this.setLegend(data)  
 }

/**
 * desc: 设置主副标题
 */

E_Column_2D_0.prototype.setTitle = function(data){
    var option = this.chart.getOption();
    var title = data.title
    var subtitle = data.subtitle

    title.show ? 
        (function(){
            option.title[0].show = true;
            option.title[0].text = title.text;
            subtitle.show ? 
                (option.title[0].subtext = subtitle.text)
                : (option.title[0].subtext = null)
        })() 
        :(option.title[0].show = false) 
	this.chart.setOption(option); 
}

/**
 * desc: 设置X轴标签
 */
E_Column_2D_0.prototype.setXAxisLabel = function(data){
    var option = this.chart.getOption();
    var name = data.xAxis.name
    name.show ?
        (function(){
            name.value&&(name.value.length<=10) ? (option.xAxis[0].name = name.value) : console.warn("X轴标签名未输入或长度超过10！")      
        })()
        : (option.xAxis[0].name = null) 
	this.chart.setOption(option);
}

/**
 * desc: 设置X轴数据
 */
E_Column_2D_0.prototype.setXAxisData = function(data){
    var option = this.chart.getOption();
    var stdArr = data['xAxis']['data'].map(function(cv){
        // if(cv.length > 6){
        //     return '...'
        // }else{
        //     return cv
        // }
        return cv
    })
	option.xAxis[0]['data'] = stdArr;
	this.chart.setOption(option);
}

/** 
 *  desc: 设置Y轴标签
 */
E_Column_2D_0.prototype.setYAxisLabel = function(data){
    var option = this.chart.getOption();
    var name = data.yAxis.name
    name.show ?
        /*Y轴标签名程度限制*/      
        (function(){
            name.value&&(name.value.length<=10) ? (option.yAxis[0].name = name.value) : console.warn("Y轴标签名未输入或长度超过10！")      
        })()
        : (option.yAxis[0].name = null) 
	this.chart.setOption(option);
}


/**
 * desc: 设置Y轴数据
 */
E_Column_2D_0.prototype.setYAxisData = function(data,index){
    var yAxisData = data.yAxis.data
    var option = this.chart.getOption(); 
    /*Y轴取最大值*/
    var i = index
    // var maxArr = []
    // data.yAxis.data.forEach(function(obj){
    //     maxArr.push(Math.max.apply(null,obj.data))
    // })
    // var max = Math.max.apply(null,maxArr)
    // var standardMax = Math.ceil(max/10)*10
    // option.yAxis[0]['max'] = standardMax;
    option.series[i]['name'] = yAxisData[i]['name'];
    /*数据标签-弹层-小数四舍五入*/
    var stdArr = yAxisData[i]['data'].map(function(cv){
        if((cv+'').split('.').length==2){
            if((cv+'').split('.')[1].length>=2){
                return cv.toFixed(2)                
            }
            else{
                return cv
            }
        }else{
            return cv            
        }
    })
    option.series[i]['data'] = stdArr
    this.chart.setOption(option);
}

/**
 * desc: 设置图例
 */
E_Column_2D_0.prototype.setLegend = function(data){
    var option = this.chart.getOption();
    var legendShow = data.legend.show
    legendShow ? void 0 : (option.legend[0].show = false)
    var nameArr = data.legend.data.map(function(obj){
        return obj.name
    })
    for(var i=0;i<nameArr.length;i++){
        option.legend[0].data[i].name = nameArr[i]
    }
    this.chart.setOption(option);
}

/**
 * last modified time: 2017年12月5日10:49
 */
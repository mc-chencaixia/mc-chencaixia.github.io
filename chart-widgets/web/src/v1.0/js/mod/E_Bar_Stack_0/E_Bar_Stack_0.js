/**
 *  className: E_Bar_Stack_0
 * 	desc: 堆叠条形图
 *  auth: gaok
 */

function E_Bar_Stack_0(){}
/**
 * desc: 初始化堆叠条形图
 */

E_Bar_Stack_0.prototype.init = function(opt){
    this._dom = opt.dom||''
    var chart = echarts.init(this._dom)
    var option = {
        title: {
            text: '世界人口总量',
            subtext: '数据来自网络'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show:true,
            bottom:0,
            // padding:20,
            data: [{
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
            }]
        },
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        // },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            nameLocation:'middle',
            min: 'dataMin',
            // offset:10
        },
        yAxis: {
            show: true,
            type: 'category',
            data: ['巴西','印尼','美国','印度','中国','世界人口(万)'],
            nameLocation:'middle',
            nameRotate:90,
            nameGap:40
        },
        series: [
            {
                name: 'foo',
                type: 'bar',
                stack: '总量',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: 'bar',
                type: 'bar',
                stack: '总量',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: 'baz',
                type: 'bar',
                stack: '总量',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
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

 E_Bar_Stack_0.prototype.render = function(data){
    this.setTitle(data)
    this.setXAxisLabel(data)
    this.setXAxisData(data,0)
    this.setXAxisData(data,1)
    this.setXAxisData(data,2)    
    this.setYAxisLabel(data)
    this.setYAxisData(data)   
    this.setLegend(data)  
 }

/**
 * desc: 设置主副标题
 */

E_Bar_Stack_0.prototype.setTitle = function(data){
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
E_Bar_Stack_0.prototype.setXAxisLabel = function(data){
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
E_Bar_Stack_0.prototype.setYAxisData = function(data){
    var option = this.chart.getOption();
    var stdArr = data['yAxis']['data'].map(function(cv){
        // if(cv.length > 6){
        //     return '...'
        // }else{
        //     return cv
        // }
        return cv
    })
	option.yAxis[0]['data'] = stdArr;
	this.chart.setOption(option);
}

/** 
 *  desc: 设置Y轴标签
 */
E_Bar_Stack_0.prototype.setYAxisLabel = function(data){
    var option = this.chart.getOption();
    var name = data.yAxis.name
    name.show ?
        /*Y轴标签名长度限制*/      
        (function(){
            name.value&&(name.value.length<=10) ? (option.yAxis[0].name = name.value) : console.warn("Y轴标签名未输入或长度超过10！")      
        })()
        : (option.yAxis[0].name = null) 
	this.chart.setOption(option);
}


/**
 * desc: 设置Y轴数据
 */
E_Bar_Stack_0.prototype.setXAxisData = function(data,index){
    var xAxisData = data.xAxis.data
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
    option.series[i]['name'] = xAxisData[i]['name'];
    /*数据标签-弹层-小数四舍五入*/
    var stdArr = xAxisData[i]['data'].map(function(cv){
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
E_Bar_Stack_0.prototype.setLegend = function(data){
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
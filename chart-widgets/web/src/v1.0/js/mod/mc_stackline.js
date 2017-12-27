/*
 * 医疗可视化平台-进度条组件
 * date：2017-01-04
 * 
 */
var mStackline = function(){
	if( !(this instanceof mStackline) ){
		return new mStackline();
	}	
};

mStackline.prototype = $.extend( new MCBASE(), {
		version:'0.0.1',		
		defaultOption:{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: function(params){
		        	var num = params[1].data.value + params[0].data.value;
		        	var temp = params[0].name;
		        	temp += '<br><span style="display: inline-block; margin-right: 5px; width: 10px; height: 10px; border-radius: 5px; background-color:' + params[0].color + ';"></span>' + params[0].seriesName + '：' + params[0].data.value +
		        			'<br><span style="display: inline-block; margin-right: 5px; width: 10px; height: 10px; border-radius: 5px; background-color:' + params[1].color + ';"></span>' + params[1].seriesName + '：' + num +
		        			'<br><span style="display: inline-block; margin-right: 5px; width: 10px; height: 10px; border-radius: 5px; background-color:' + params[2].color + ';"></span>' + params[2].seriesName + '：' + params[2].data.value;
		        	return temp
		        },
		    },
		    legend: {
		        data:[{
		        	name:'告警值',
		        },{
		        	name:'基准值',
		        },{
		        	name:'当前值',

		        }],
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },		    
		    xAxis : [
		        {
		            type : 'category',
		            data : ['一','二','三','四','五','六','七'],
		            axisLabel:{interval: 0},
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'告警值',
		            type:'bar',
		            stack: '参考数据',
		            data:[
		            	{value:620, },
		            	{value:732,},
		            	{value:701} ,
		            	{value: 734}, 
		            	{value:1090}, 
		            	{value:1130}, 
		            	{value:1120},
		            ],
		            itemStyle:{
				    	normal:{
				    		'color':'#c23531',
				    	},
				    	emphasis:{
				    		'color':'#c23531',
				    	}
				    },

		        },
		        {
		            name:'基准值',
		            type:'bar',
		            stack: '参考数据',
		            data:[620*0.2, 732*0.2, 701*0.2, 734*0.2, 1090*0.2, 1130*0.2, 1120*0.2],
		            itemStyle:{
				    	normal:{
				    		'color':'#61a0a8',
				    	},
				    	emphasis:{
				    		'color':'#61a0a8',
				    	}
				    }
		            
		        },
		        {
		            name:'当前值',
		            type:'bar',		           
		            data:[
		            	{value:320, },
		            	{value:332,},
		            	{value:301} ,
		            	{value: 334}, 
		            	{value:390}, 
		            	{value:330}, 
		            	{value:320}],		            
				    barCategoryGap:'50%',	
				    itemStyle:{
				    	normal:{
				    		'color':'#2f4554',				    		
				    	},
				    	emphasis:{
				    		'color':'#2f4554',
				    	}
				    }
				                
		        },
		    ]
		},
		init: function(cfg){ 	
			cfg = cfg || {};                
        	cfg.option = cfg.option || {};
        	this.setOption( cfg.option );
	        if( cfg.dom ){
	            this.setDom( cfg.dom );             
	        }
	        if( cfg.clickCallback ){
	            this.setClickCallback( cfg.clickCallback );
	        }  			
		},
		setClickCallback:function( fn ){
			// console.log(fn);
			this.clickCallback = fn || null;	
		},
		bindEvent:function(){
			var self = this;
			if( !this.chart ){
				return false;
			};
			this.chart.on('click', function (params) {
				if( self.clickCallback ){
					self.clickCallback(params);
				}else{
					console.log(params);
				}			    
			});
			this.chart.on('legendselectchanged', function (params) {
			    console.log(params);
			});
					

		},		
		setDom: function( dom ){
			if( !dom ){
				console.log('配置项缺失');
				return false;
			}
			this.chart = echarts.init(dom);			
			this.bindEvent();
			this.render();
		},
		setOption: function( option ){
			option =  _.defaults( option, this.defaultOption);
			this.option = $.extend( this.option, option );
		},
		setData: function( data ){
			// console.log(data);
			if(!data || !data.length){
				return false;
			}
			var xAxisData = [];
			var dataCurrent = [];
			var dataWaraning = [];
			var dataBaseline = [];
			$.each( data, function(k,v){
				xAxisData.push(v.name);
				dataCurrent.push({value:v.data[0]});
				dataWaraning.push({value:v.data[1]});
				dataBaseline.push({value:v.data[2]-v.data[1]});
			});
			this.option.xAxis[0].data = $.extend( xAxisData, []);
			this.option.series[2].data = $.extend( dataCurrent, []);
			this.option.series[0].data = $.extend( dataWaraning, []);
			this.option.series[1].data = $.extend( dataBaseline, []);
			this.render();

		},
		render: function( data ){
			this.chart.setOption(this.option);
		},
});
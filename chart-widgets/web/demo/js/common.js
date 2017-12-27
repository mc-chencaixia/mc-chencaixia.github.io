(function(){
	/* 
		author: tangb
		name: 'adjustmentBody',
		@param:{
		},
		desc: '屏幕高度适配'
	*/
	function adjustmentBody(){
		var offset = 0;
		var height = document.documentElement.clientHeight;
		var header = document.getElementsByClassName("mc-header");
		var len = header.length;
		len && (offset = 64); //头部高度
		var bottom = height - offset;
		var fontSize = bottom/12 + "px";
		$("html").css("font-size", fontSize);
		$(".roll-sign").trigger("adjustHeight");
	}
	adjustmentBody();
	window.addEventListener("resize", adjustmentBody);
}());

var commUtil = {
	/* 
		author: tangb
		name: 'init',
		@param:{
			host: 'host + port',
		},
		desc: '数字分隔符, 将超过三位的数字用‘,’隔开'
	*/
	Host :'http://192.168.200.140:8084', 
	/* 
		author: tangb
		name: 'postData',
		@param:{
			url: '接口路径',
			method: '请求方式，get,post...',
			param: 'json格式的请求参数',
			fnSuccess: '请求成功后的回调函数',
			fnError: '请求失败的回调函数'
		},
		desc: 'ajax请求数据'
	*/
	postData: function(url, method, param, fnSuccess, fnError){
		var defer = $.Deferred();
		url = this.Host + url;
		$.ajax({
			url: url,
			method: method,
			data: param,
			dataType: 'json'
		}).success(function(data, status, headers, config){
			if(data && typeof(data) !== "object"){
				data = JSON.parse(data);
			}
			fnSuccess && fnSuccess(data);
			defer.resolve(data);
		}).error(function(data, status, headers, config){
			fnError && fnError(status);
		});
		return defer.promise;
	},
	/* 
		author: tangb
		name: 'thousandBitSeparator',
		@param:{
			num: '欲转化的数字',
		},
		desc: '数字分隔符, 将超过三位的数字用‘,’隔开'
	*/
	thousandBitSeparator: function(num) {
	    return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
	},
	/* 
		author: tangb
		name: 'extend',
		@param:{
			dest: '目标对象',
			src: '源对象'
		},
		desc: '对象继承'
	*/
	extend: function(dest, src){
	    var _complete,
	    _extend,
	    _isObject;
	    _isObject = function(o){
	        return (Object.prototype.toString.call(o) === '[object Object]' || Object.prototype.toString.call(o) === '[object Array]');
	    },
	    _extend = function self(destination, source) {
	        var property;
	        for (property in destination) {
	            if (destination.hasOwnProperty(property)) {

	                // 若destination[property]和sourc[property]都是对象，则递归
	                if (_isObject(destination[property]) && _isObject(source[property])) {
	                    self(destination[property], source[property]);
	                };

	                // 若sourc[property]已存在，则跳过
	                if (source.hasOwnProperty(property)) {
	                    continue;
	                } else {
	                    source[property] = destination[property];
	                }
	            }
	        }
	    },
	    _complete = function(){
	        var arr = arguments,
	            result = {},
	            i;

	        if (!arr.length) return {};

	        for (i = arr.length - 1; i >= 0; i--) {
	            if (_isObject(arr[i])) {
	                _extend(arr[i], result);
	            };
	        }

	        arr[0] = result;
	        return result;
	    };
	    return _complete(dest, src);
	},
	/* 
		author: tangb
		name: 'drawBoard',
		@param:{
			dom: 'HTMLDocumentElement',
			option: '参考echarts.option的配置规则'
		},
		desc: '仪表盘图(代表比率)'
	*/
	drawBoard: function(dom, option){
		var chart = echarts.init(dom);
		var opt = {
		    tooltip : {
		        formatter: "{a} <br/>{c} {b}"
		    },
		    series: [
		        {
		            type: 'gauge',
		            center : ['50%', '60%'],    // 默认全局居中
		            radius : '95%',
		            min: 0,
		            max: 1,
		            startAngle: 180,
		            endAngle: 0,
		            splitNumber: 2,
		            axisLine: {            // 坐标轴线
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    width: 40,
		                    color:[[0,'#00B5AD'],[0.6,'#00B5AD'],[1,'#F2F2F2']]
		                }
		            },
		            axisTick: {            // 坐标轴小标记
		                show: false
		            },
		            axisLabel: {
		                show:false
		            },
		            splitLine: {
		                show:false
		            },
		            itemStyle:{
		            	normal:{
		            		color:"#000"
		            	}
		            },
		            pointer: {
		                width:3,
		                color:'#000'
		            },
		            title: {
		                show: false
		            },
		            detail: {
		                show: true,
		                formatter: function(value){
		                	return (value*100).toFixed(2)+'%'
		                },
		                textStyle:{
		                	fontSize: '12px'
		                }
		            },
		            data:[{value: 0.6, name: '哈哈'}]
		        }
		    ]
		};
		opt = commUtil.extend(opt ,option);
		chart.setOption(opt);
	},
	/* 
		author: tangb
		name: 'drawLineChart',
		@param:{
			dom: 'HTMLDocumentElement',
			option: '参考echarts.option的配置规则'
		},
		desc: '折线图(代表趋势)'
	*/
	drawLineChart: function(dom, option){
		var chart, opt, flag;
		chart = echarts.init(dom);
		opt = {
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:[]
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {}
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [
		        
		    ],
		    //color:['#A48AD4', '#F9A30F', '#AEC785', '#FF6C60']
		};
		flag = !!option;
		flag && (opt = commUtil.extend(opt, option));
		chart.setOption(opt);
		return chart;
	},
	/* 
		author: tangb
		name: 'drawPieChart',
		@param:{
			dom: 'HTMLDocumentElement',
			option: '参考echarts.option的配置规则'
		},
		desc: '饼图(代表组成)'
	*/
	drawPieChart: function(dom, option){
		var chart, opt, flag;
		chart = echarts.init(dom);
		opt = {
		    // title : {
		    //     text: '某站点用户访问来源',
		    //     subtext: '纯属虚构',
		    //     x:'center'
		    // },
		    //color:['#A48AD4', '#F9A30F', '#AEC785'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'horizontal',
		        left: 'center',
		        data: ['预约','挂号','转诊']
		    },
		    series : [
		        {
		            name: '门诊来源',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:335, name:'预约'},
		                {value:310, name:'挂号'},
		                {value:234, name:'转诊'},
		            ],
		           	label: {
		                normal: {
		                    position: 'outside',
		                    formatter:function(a){
			                	return a['name']+" ("+ a['percent'] +"%)";
			                }
		                },
		            },
		            itemStyle: {
		            	normal:{
		            		borderColor: '#fff',
		                	borderWidth: '2',
		            	},
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 4,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		flag = !!option;
		flag && (opt = commUtil.extend(opt, option));
		chart.setOption(opt);
		return chart;
	},
	/* 
		author: tangb
		name: 'drawPieChart',
		@param:{
			dom: 'HTMLDocumentElement',
			option: '参考echarts.option的配置规则'
		},
		desc: '饼图(代表组成)'
	*/
	drawVBarChart: function(dom, option){
		var chart, opt, flag;
		chart = echarts.init(dom);
		opt = {
		    color: ['#1FB5AD'],
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [],
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLabel:{
		            	interval:0
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:"",
		            type:'bar',
		            barGap: '80%',
		            data:[]
		        }
		    ]
		};
		flag = !!option;
		flag && (opt = commUtil.extend(opt, option));
		chart.setOption(opt);
		return chart;
	},
	/*
	    name: 'drawCircle',
	    params: {
	        dom: 节点，
	        text1: '显示比例，例: 80%'
	        text2: '显示总体比例，例：100%'
	        ratio: 
	        bool: 
	    }
	*/
	drawCircle: function(dom,text1,text2,ratio,bool){
		dom.innerHTML = "";
	    var height = dom.clientHeight;
	    var width = dom.clientWidth;
	    var padding_left = getComputedStyle(dom)['padding-left'];
	    var padding_right = getComputedStyle(dom)['padding-right'];
	    var padding_top = getComputedStyle(dom)['padding-top'];
	    var padding_bottom = getComputedStyle(dom)['padding-bottom'];
	    padding_left = +padding_left.substring(0, padding_left.length-2);
	    padding_right = +padding_right.substring(0, padding_right.length-2);
	    padding_top = +padding_top.substring(0, padding_top.length-2);
	    padding_bottom = +padding_bottom.substring(0, padding_bottom.length-2);
	    var canvas = document.createElement("canvas");
	    canvas.height = height - padding_top - padding_bottom;
	    canvas.width = width - padding_left - padding_right;
	    dom.appendChild(canvas);
	    var ctx=canvas.getContext("2d");;
	    var radius = canvas.width <= canvas.height ? (canvas.width-15)/2 : (canvas.height-15)/2;
	    var center = {
	        x: canvas.width/2,
	        y: canvas.height/2
	    }
	    ctx.beginPath();
	    ctx.lineWidth = 5;
	    ctx.arc(center.x,center.y,radius,0,2*Math.PI*ratio, false);
	    ctx.textAlign = 'center';
	    ctx.textBaseline="middle";
	    ctx.fillStyle = '#A8A8A8';
	    // ctx.fillText(text2,center.x, center.y);
	    ctx.textBaseline="center";
	    if(bool){
	        ctx.fillStyle = '#1FB5AD';
	    }else{
	        ctx.fillStyle = '#FF6C60';
	    }
	    ctx.font="16px 微软雅黑";
	    ctx.fillText(text1,center.x, center.y);
	    //ctx.strokeStyle = "#FF6C60";
	    if(bool){
	        ctx.strokeStyle = '#1FB5AD';
	    }else{
	        ctx.strokeStyle = '#FF6C60';
	    }
	    ctx.stroke();
	    ctx.beginPath();
	    if(ratio == 0){
	        ctx.arc(center.x,center.y,radius,0,2*Math.PI, true);
	    }else{
	        ctx.arc(center.x,center.y,radius,0,2*Math.PI*ratio, true);
	    }
	    ctx.strokeStyle = '#F0EFF0';
	    ctx.stroke();
	    ctx.closePath();
	}
}
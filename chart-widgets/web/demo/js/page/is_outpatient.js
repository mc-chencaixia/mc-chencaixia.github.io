(function(commUtil, $, _, echarts){
	/*
		name: 'menzRc',
		interface: 'mzrc/mzrc_kpi',
		@param:{
			
		},
		desc:'门诊人次'
	*/
	(function menzRc(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzrc/mzrc_kpi',
		},
		fnSuccess = function(data) {
			var template = _.template($("#J_target_general").html());
			$("#J_target_zzl").children().filter(":not(.top-item)").remove();

			var obj = {
				name: data[0]['KPIname'],
				value: commUtil.thousandBitSeparator(+data[0]['KPIvalue']),
				target: commUtil.thousandBitSeparator(+data[0]['KPIvalue']),
				sameRadio: commUtil.thousandBitSeparator(+data[0]['KPIyearvalue']),
				circleRadio: commUtil.thousandBitSeparator(+data[0]['KPImonthvalue']),
				redirection_year: +data[0]['KPIyearvalue'],
				redirection_month: +data[0]['KPImonthvalue'],
				index: 1
			}
			$("#J_target_zzl").append(template(obj));
		};
		commUtil.postData(url, method, param, fnSuccess);
	})();
	/*
		name: 'menzRc_qs',
		interface: 'mzrc/mzrc_kpi_qs',
		@param:{
			
		},
		desc:'门诊人次指标趋势图'
	*/
	(function menzRc_qs(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzrc/mzrc_kpi_qs',
		},
		fnSuccess = function(data) {
			var currYear , lastYear, months , dom, option;
			currYear = {
				name: "今年",
				type: "line",
				data: []
			};
			lastYear = {
				name: "去年",
				type: "line",
				data: [],
			};
			months = [];
			for(var i=0; i<data.length; i++){
				currYear['data'].push(data[i]['KPIvalue']);
				lastYear['data'].push(data[i]['KPIyearvalue']);
				months.push(data[i]['month']+'月');
			}
			dom = $("#chart_target_trend")[0];
			option = {
				color:['#A48AD4', '#F9A30F', '#AEC785'],
				legend:{
					data:['今年', '去年']
				},
				xAxis: {
					data: months
				},
				series: [
			        currYear,
			        lastYear
			    ]
			}
			commUtil.drawLineChart(dom, option);
		};
		commUtil.postData(url, method, param, fnSuccess);
	})();
	/*
		name: 'menzRc_butyy',
		interface: 'mzrc/mzrc_dw',
		@param:{
			
		},
		desc:'不同医院对比'
	*/
	(function menzRc_butyy(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzrc/mzrc_dw',
		},
		fnSuccess = function(data) {
			var dom, values=0, template;
			oDom = $("#J_btyy_cmp");
			template = _.template($("#J_target_bars").html());
			oDom.empty();
			data.sort(function(a, b){
				return b['KPIvalue'] - a['KPIvalue'];
			});
			values = +data[0]['KPIvalue'];
			for(var i=0; i<data.length; i++){
				var obj = {name: data[i]['hosname'], ratio: ((+data[i]['KPIvalue'])*100/values).toFixed(4), value: data[i]['KPIvalue']};
				var text = template(obj);
				oDom.append(text);
			}
		};
		commUtil.postData(url, method, param, fnSuccess);
	})();
	/*
		name: 'menzRc_menzly',
		interface: 'mzrc/mzrc_dw_qs',
		@param:{
				
		},
		desc:'门诊来源组成'
	*/
	(function menzRc_menzly(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzrc/mzrc_mzly',
		},
		fnSuccess = function(data) {
			var dom = $("#chart_src_outcmp")[0];
			var option = {
				color:['#A48AD4', '#F9A30F', '#AEC785', '#FF6C60'],
				legend: {
					data:(function(){
						var arr = [];
						for(var i=0;i<data.length;i++){
							arr.push(data[i]['group']);
						}
						return arr;
					}())
				},
				series:[
					{
						data:(function(){
							var arr = [];
							for(var i=0;i<data.length;i++){
								arr.push({value: data[i]['value'], name: data[i]['group']});
							}
							return arr;
						}()),
					}
				]
			}
			commUtil.drawPieChart(dom, option);
		};
		commUtil.postData(url, method, param, fnSuccess);
	})();
	/*
		name: 'menzRc_ruymd',
		interface: 'mzrc/mzrc_dw_qs',
		@param:{
				
		},
		desc:'入院目的组成'
	*/
	(function menzRc_ruymd(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzrc/mzrc_lymd',
		},
		fnSuccess = function(data) {
			var dom = $("#chart_src_goalcmp")[0];
			var option = {
				color:['#A48AD4', '#F9A30F', '#AEC785', '#FF6C60'],
				legend: {data:(function(){
						var arr = [];
						for(var i=0;i<data.length;i++){
							arr.push(data[i]['group']);
						}
						return arr;
					}())
				},
				series:[
					{
						data:(function(){
							var arr = [];
							for(var i=0;i<data.length;i++){
								arr.push({value: data[i]['value'], name: data[i]['group']});
							}
							return arr;
						}()),
					}
				]
			}
			commUtil.drawPieChart(dom, option);
		};
		commUtil.postData(url, method, param, fnSuccess);
	})();
	/*
		name: 'menzRc_ruymd',
		interface: 'mzrc/mzrc_zdjg',
		@param:{
			
		},
		desc:'诊断结果组成'
	*/
	(function menzRc_zhendjg(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzrc/mzrc_zdjg',
		},
		fnSuccess = function(data) {
			var dom = $("#chart_src_resultcmp")[0];
			var option = {
				color:['#A48AD4', '#F9A30F', '#AEC785', '#FF6C60'],
				legend: {
						data:(function(){
						var arr = [];
						for(var i=0;i<data.length;i++){
							arr.push(data[i]['group']);
						}
						return arr;
					}())
				},
				series:[
					{
						data:(function(){
							var arr = [];
							for(var i=0;i<data.length;i++){
								arr.push({value: data[i]['value'], name: data[i]['group']});
							}
							return arr;
						}()),
					}
				]
			}
			commUtil.drawPieChart(dom, option);
		};
		commUtil.postData(url, method, param, fnSuccess);
	})();
	/*
		name: 'menzRc_kesdb',
		interface: 'mzrc/mzrc_kst5',
		@param:{
				
		},
		desc:'科室门诊人次top5'
	*/
	(function menzRc_kesdb(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzrc/mzrc_kst5',
		},
		fnSuccess = function(data) {
			var dom, values=0, template;
			oDom = $("#J_keshi_cmp");
			template = _.template($("#J_target_bars").html());
			oDom.empty();

			// for(var i=0; i<data.length; i++){
			// 	values += +data[i]['KPIvalue'];
			// }
			data.sort(function(a, b){
				return b['KPIvalue'] - a['KPIvalue'];
			});
			values = +data[0]['KPIvalue'];
			for(var i=0; i<data.length; i++){
				var obj = {name: data[i]['ksname'], ratio: ((+data[i]['KPIvalue'])*100/values).toFixed(4), value: data[i]['KPIvalue']};
				var text = template(obj);
				oDom.append(text);
			}
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());

	/*
		name: menzRc_trend,
		interface: '',
		@param:{
	
		},
		desc: '相关性指标趋势'
	*/
	(function menzRc_trend(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzrc/mzrc_kst5',
		},
		fnSuccess = function(data) {
			var dom = $("#chart_src_targettrend")[0];
			var option = {
				color:['#A48AD4', '#F9A30F', '#AEC785', '#FF6C60'],
				legend:{
					data:['门诊收入', '诊断符合率', '入院就诊耗时', '平均等待时间', '均次门诊费用', '平均等待人数', '人均医生诊疗人次'],
					selected: {
					    '门诊人次': true,
					    '门诊收入': true, 
					    '诊断符合率': false, 
					    '入院就诊耗时': false, 
					    '平均等待时间': false, 
					    '均次门诊费用': false, 
					    '平均等待人数': false, 
					    '人均医生诊疗人次': false
					}
				},
				yAxis: [
					{
			            //name: '降雨量(mm)',
			            nameLocation: 'start',
			            type: 'value',
			        },
			        {
			        	//name: '降雨量(mm)',
			            nameLocation: 'start',
			            type: 'value',
			        }
				],
				series: [
					{
						naem: '门诊人次',
						yAxisIndex:0,
						type: 'line',
						data: [320, 332, 301, 334, 390, 330, 320, 340, 367, 393, 311, 382]
					},
					{
			            name:'门诊收入',
			            yAxisIndex:1,
			            type:'line',
			            data:[320, 332, 301, 334, 390, 330, 320, 340, 367, 393, 311, 382]
			        },
			        {
			            name:'诊断符合率',
			            yAxisIndex:1,
			            type:'line',
			            data:[320, 332, 301, 334, 390, 330, 320, 340, 367, 393, 311, 382]
			        },
			        {
			            name:'入院就诊耗时',
			            type:'line',
			            yAxisIndex:1,
			            data:[440, 320, 380, 280, 348, 369, 370, 323, 360, 378, 359, 392]
			        },
			        {
			            name:'平均等待时间',
			            type:'line',
			            yAxisIndex:1,
			            data:[240, 120, 380, 230, 38, 300, 320, 223, 390, 268, 309, 192]
			        },
			        {
			            name:'均次门诊费用',
			            type:'line',
			            yAxisIndex:1,
			            data:[132, 277, 327, 79, 96, 264, 220, 219, 188, 257, 125, 260]
			        },
			        {
			            name:'平均等待人数',
			            type:'line',
			            yAxisIndex:1,
			            data:[132, 277, 327, 79, 96, 264, 220, 219, 188, 257, 125, 260]
			        },
			        {
			            name:'人均医生诊疗人次',
			            type:'line',
			            yAxisIndex:1,
			            data:[132, 277, 327, 79, 96, 264, 220, 219, 188, 257, 125, 260]
			        }
			    ]
			}
			var chart = commUtil.drawLineChart(dom, option);
			chart.on('legendselectchanged', function (params) {
			    var se = params['name'];
			    var oSelect = params['selected'];
			    for(var i in oSelect){
			    	if(i == se) continue;
			    	oSelect[i] = false;
			    }
			    var opt = chart.getOption(); 
			    opt.legend[0]['selected'] = oSelect;
			    chart.setOption(opt);
			});
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'menzRc_nlzc',
		interface: 'mzrc/mzrc_kst10',
		@param:{
				
		},
		desc:'患者年龄组成'
	*/
	(function menzRc_nlzc(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzrc/mzrc_nld',
		},
		fnSuccess = function(data) {
			var dom = $("#chart_src_classifycmp")[0];
			var option = {
				//color:['#A48AD4', '#F9A30F', '#AEC785', '#FF6C60'],
				xAxis: [
					{
						data:(function(){
							var arr = [];
							for(var i=0;i<data.length;i++){
								arr.push(data[i]['group']);
							}
							return arr;
						}())
					}
				],
				series:[
					{
						name: '患者年龄组成',
						data: (function(){
							var arr = [];
							for(var i=0;i<10;i++){
								arr.push(data[i]['value']);
							}
							return arr;
						}())
					}
				]
			}
			commUtil.drawVBarChart(dom, option);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	// 输入框
	(function(){
		var start = {
		    dateCell: '#J_date_start',
		    format: 'YYYY-MM-DD hh:mm',
		    minDate: '2014-06-16 23:59:59', //设定最小日期为当前日期
			festival:true,
		    maxDate: '2099-06-16 23:59:59', //最大日期
		   isTime: true,
		    choosefun: function(datas){
		         end.minDate = datas; //开始日选好后，重置结束日的最小日期
		    }
		};
		var end = {
		    dateCell: '#J_date_end',
		    format: 'YYYY-MM-DD hh:mm',
		    minDate: jeDate.now(0), //设定最小日期为当前日期
			festival:true,
		    maxDate: '2099-06-16 23:59:59', //最大日期
		    isTime: true,
		    choosefun: function(datas){
		         start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
		    },
			okfun:function(val){alert(val)}
		};
		jeDate(start);
		jeDate(end);
	}())
})(commUtil, $, _, echarts)
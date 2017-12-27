$(".logo-menu").on("click", function(e){
	var cls = $(".wrapper").attr("class");
	var flag = cls.indexOf("active-menu");
	if(flag == -1){
		$(".wrapper").addClass("active-menu");
		$(".analysis-menu").animate({opacity:0}, 300, function(){
			$(".analysis-menu").hide();
		});
	}else{
		$(".wrapper").removeClass("active-menu");
		$(".analysis-menu").animate({opacity:1}, 600, function(){
			$(".analysis-menu").show();
		});
	}
});

// 请求页面数据
(function(commUtil, $, _, echarts){
	/*
		 name:'financial_content',
		interface:'zhjk/cw/jsjy_kpi',
		@param:{
			tmp: 模板的父元素
			dest: '目标放置的对象',
			interface: '接口',
		},
		desc: '填充整体绩效的文字内容'
	*/
	function indicator_content(tmp, dest, interface){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: interface || 'mzfx/mzrc_kpi'
		},
		fnSuccess = function(data) {
			console.log(data);
			var template = _.template($(tmp).html());
			$(dest).empty();
			var obj = {
				name: data[0]['KPIname'],
				value: commUtil.thousandBitSeparator(data[0]['KPIvalue']),
				target: commUtil.thousandBitSeparator(data[0]['KPItarget']),
				circleR: commUtil.thousandBitSeparator(data[0]['KPImonthvalue']),
				sameR: commUtil.thousandBitSeparator(data[0]['KPIyearvalue'])
			}
			$(dest).append(template(obj));
		};
		commUtil.postData(url, method, param, fnSuccess);
	};
	/*
		name: 'getOutpatientVisitsData',
		interface: 'mzfx/mzrc_kpi',
		@param:{
			
		},
		desc:'门诊人次'
	*/
	indicator_content("#J_outpatient_visit", "#J_analysis_outpat_visit", "mzfx/mzrc_kpi");
	/*
		name: 'getOutpatientVisitsTrendData',
		interface: 'mzfx/mzrc_kpi_qs',
		@param:{
			
		},
		desc:'门诊人次（趋势）'
	*/
	(function getOutpatientVisitsTrendData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzfx/mzrc_kpi_qs'
		},
		fnSuccess = function(data) {
			var dom, names=[], option, months=[], lastYear=[], nowYear=[], series=[];
			lastYear = {
				name: '去年',
				type: 'line',
				data: []
			}
			nowYear = {
				name: '今年',
				type: 'line',
				data: []
			}
			dom = $("#J_chart_outpatient_visits")[0];
			names = ["今年","去年"];
			for(var i=0; i<data.length; i++){
				lastYear['data'].push(data[i]['KPIyearvalue']);
				nowYear['data'].push(data[i]['KPIvalue']);
				months.push(data[i]['month']);
			}
			series.push(nowYear,lastYear);
			option = {
				color:['#00A9A7', '#F9A30F'],
				legend:{
					data: names
				},
				xAxis: {
					data: months
				},
				series: series
			}
			commUtil.drawLineChart(dom, option);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getOutpatientVisitsTopFiveData',
		interface: 'mzfx/mzrc_kst10',
		@param:{
			
		},
		desc:'门诊人次 Top5'
	*/
	(function getOutpatientVisitsTopFiveData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzfx/mzrc_kst10'
		},
		fnSuccess = function(data) {
			data.sort(function(a, b){
				return b['KPIvalue'] - a['KPIvalue'];
			});
			var maxValue = +data[0]['KPIvalue'];
			var outpVisitArr = [];
			for (var i = 0; i < data.length; i++) {
				var obj = {
					name: data[i]['ksname'],
					width: ((+data[i]['KPIvalue'] / maxValue) * 100).toFixed(2) + '%',
					value: commUtil.thousandBitSeparator(data[i]['KPIvalue'])
				}
				outpVisitArr.push(obj);
			}
			var template = _.template($("#J_analysis_line").html());
			$("#J_analysis_child_zzl").empty();

			for (var i = 0; i < data.length; i++) {
				$("#J_analysis_child_zzl").append(template(outpVisitArr[i]));
			}
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getOutpatientRevenueData',
		interface: 'mzfx/mzsr_kpi',
		@param:{
			
		},
		desc:'门诊收入'
	*/
	indicator_content("#J_outpatient_visit", "#J_analysis_outpat_revenue", "mzfx/mzsr_kpi");
	/*
		name: 'getOutpatientRevenueTrendData',
		interface: 'mzfx/mzsr_kst10_qs',
		@param:{
			
		},
		desc:'门诊收入（趋势）'
	*/
	(function getOutpatientRevenueTrendData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzfx/mzsr_kpi_qs'
		},
		fnSuccess = function(data) {
			var dom, names=[], option, months=[], lastYear=[], nowYear=[], series=[];
			lastYear = {
				name: '去年',
				type: 'line',
				data: []
			}
			nowYear = {
				name: '今年',
				type: 'line',
				data: []
			}
			names = ['今年', '去年'];
			dom = $("#J_chart_outpatient_revenue")[0];
			for (var i = 0; i < data.length; i++) {
				lastYear['data'].push((+data[i]['KPIyearvalue']).toFixed(2));
				nowYear['data'].push((+data[i]['KPIvalue']).toFixed(2));
				months.push(data[i]['month']);
			}
			series.push(nowYear,lastYear);
			option = {
				color:['#00A9A7', '#F9A30F'],
				legend:{
					data: names
				},
				xAxis: {
					data: months
				},
				series: series
			}
			commUtil.drawLineChart(dom, option);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getOutpatientRevenueTopFiveData',
		interface: 'mzfx/mzsr_kst10',
		@param:{
			
		},
		desc:'门诊收入（科室top5）'
	*/
	(function getOutpatientRevenueTopFiveData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzfx/mzsr_kst10'
		},
		fnSuccess = function(data) {
			var maxValue, outpRevenArr;
			data.sort(function(a, b){
				return b['KPIvalue'] - a['KPIvalue'];
			});
			maxValue = +data[0]['KPIvalue'];
			outpRevenArr = [];
			for (var i = 0; i < data.length; i++) {
				var obj = {
					name: data[i]['ksname'],
					width: ((+data[i]['KPIvalue'] / maxValue) * 100).toFixed(2) + '%',
					value: commUtil.thousandBitSeparator((+data[i]['KPIvalue']).toFixed(2))
				}
				outpRevenArr.push(obj);
			}
			var template = _.template($("#J_analysis_line").html());
			$("#J_outpat_revenue").empty();

			for (var i = 0; i < data.length; i++) {
				$("#J_outpat_revenue").append(template(outpRevenArr[i]));
			}
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getOutpatientExpenseData',
		interface: '',
		@param: {
	
		},
		desc: '门诊费用'
	*/
	(function getOutpatientExpenseData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data){
			console.log(data);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getOutpatientExpenseTrendData',
		interface: '',
		@param: {
	
		},
		desc: '门诊费用趋势'
	*/
	(function getOutpatientExpenseTrendData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data) {
			console.log(data);
		};
		var dom = $('#J_chart_outpatient_expense')[0];
		var option = {
			color:['#00A9A7', '#F9A30F'],
			legend:{
				data: ['今年', '去年']
			},
			xAxis: {
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
			},
			series: [
				{
					name: '今年',
					type: 'line',
					data: ['500', '323', '151', '436', '989', '800', '823', '500', '643']
				},
				{
					name: '去年',
					type: 'line',
					data: ['500', '643', '500', '323', '500', '643', '500', '323', '323']
				}
			]
		}
		commUtil.drawLineChart(dom, option);
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getOutpatientExpenseTopFiveData',
		interface: '',
		@param: {
	
		},
		desc: '门诊费用top5'
	*/
	(function getOutpatientExpenseTopFiveData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data) {
			console.log(data);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getDiagnosticComplianceData',
		interface: '',
		@param: {
		
		},
		desc: '就诊符合率'
	*/
	(function getDiagnosticComplianceData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data) {

		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getDiagnosticComplianceTrendData',
		interface: '',
		@param: {
	
		},
		desc: '就诊符合率趋势'
	*/
	(function getDiagnosticComplianceTrendData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data) {
			console.log(data);
		};
		var dom = $('#J_chart_diagnostic_compliance')[0];
		var option = {
			color:['#00A9A7', '#F9A30F'],
			legend:{
				data: ['今年', '去年']
			},
			xAxis: {
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
			},
			series: [
				{
					name: '今年',
					type: 'line',
					data: ['500', '323', '151', '436', '989', '800', '823', '500', '643']
				},
				{
					name: '去年',
					type: 'line',
					data: ['500', '643', '500', '323', '500', '643', '500', '323', '323']
				}
			]
		}
		commUtil.drawLineChart(dom, option);
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getDiagnosticComplianceTopFiveData',
		interface: '',
		@param = {
	
		},
		desc: '就诊符合率top5'
	*/
	(function getDiagnosticComplianceTopFiveData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data) {
			console.log(data);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getAverageTreatmentTimeData',
		interface: '',
		@param = {
	
		},
		desc: '平均诊疗耗时'
	*/
	(function getAverageTreatmentTimeData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param  = {
			jkName: ''
		},
		fnSuccess = function(data) {
			console.log(data);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getAverageTreatmentTimeTrendData',
		interface: '',
		@param = {
	
		},
		desc: '平均诊疗耗时趋势'
	*/
	(function getAverageTreatmentTimeTrendData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data) {
			console.log(data);
		};
		var dom = $('#J_chart_average_treatment')[0];
		var option = {
			color:['#00A9A7', '#F9A30F'],
			legend:{
				data: ['今年', '去年']
			},
			xAxis: {
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
			},
			series: [
				{
					name: '今年',
					type: 'line',
					data: ['500', '323', '151', '436', '989', '800', '823', '500', '643']
				},
				{
					name: '去年',
					type: 'line',
					data: ['500', '643', '500', '323', '500', '643', '500', '323', '323']
				}
			]
		}
		commUtil.drawLineChart(dom, option);
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getAverageTreatmentTimeTopFiveData',
		interface: '',
		@param = {
	
		},
		desc: '平均诊疗耗时top5'
	*/
	(function getAverageTreatmentTimeTopFiveData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data) {
			console.log(data);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getAverageWaitTimeData',
		interface: '',
		@param = {
	
		},
		desc: '平均等待时间'
	*/
	(function getAverageWaitTimeData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data) {
			console.log(data);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getAverageWaitTimeTrendData',
		interface: '',
		@param = {
	
		},
		desc: '平均等待时间趋势'
	*/
	(function getAverageWaitTimeTrendData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data) {
			console.log(data);
		};
		var dom = $('#J_chart_average_wait')[0];
		var option = {
			color:['#00A9A7', '#F9A30F'],
			legend:{
				data: ['今年', '去年']
			},
			xAxis: {
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
			},
			series: [
				{
					name: '今年',
					type: 'line',
					data: ['500', '323', '151', '436', '989', '800', '823', '500', '643']
				},
				{
					name: '去年',
					type: 'line',
					data: ['500', '643', '500', '323', '500', '643', '500', '323', '323']
				}
			]
		}
		commUtil.drawLineChart(dom, option);
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getAverageWaitTimeTopFiveData',
		interface: '',
		@param = {
	
		},
		desc: '平均等待时间top5'
	*/
	(function getAverageWaitTimeTopFiveData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: ''
		},
		fnSuccess = function(data) {
			console.log(data);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getDoctorNumData',
		interface: 'mzfx/yssl_kpi',
		@param:{
			
		},
		desc:'医生数量'
	*/
	(function getDoctorNumData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzfx/yssl_kpi'
		},
		fnSuccess = function(data) {
			var template = _.template($("#J_analysis_fenxzlzhnl").html());
			$("#J_analysis_doctorNum").empty();
			var obj = {
				name: data[0]['KPIname'],
				value: data[0]['KPIvalue'],
				sameR: data[0]['KPIyearvalue'] + '%'
			}
			$("#J_analysis_doctorNum").append(template(obj));
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getNurseNumData',
		interface: 'mzfx/hssl_kpi',
		@param:{
			
		},
		desc:'护士数量'
	*/
	(function getNurseNumData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzfx/hssl_kpi'
		},
		fnSuccess = function(data) {
			var template = _.template($("#J_analysis_fenxzlzhnl").html());
			$("#J_analysis_NurseNum").empty();
			var obj = {
				name: data[0]['KPIname'],
				value: data[0]['KPIvalue'],
				sameR: data[0]['KPIyearvalue'] + '%'
			}
			$("#J_analysis_NurseNum").append(template(obj));
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getDoctorAndNurseRadioData',
		interface: 'mzfx/yhb_kpi',
		@param:{
			
		},
		desc:'医护比'
	*/
	(function getDoctorAndNurseRadioData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzfx/yhb_kpi'
		},
		fnSuccess = function(data) {
			var template = _.template($("#J_analysis_fenxzlzhnl").html());
			$("#J_analysis_DoctorAndNurseRadio").empty();
			var obj = {
				name: data[0]['KPIname'],
				value: ((data[0]['KPIvalue']) * 100).toFixed(1) + '%',
				sameR: data[0]['KPIyearvalue'] + '%'
			}
			$("#J_analysis_DoctorAndNurseRadio").append(template(obj));
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getOpenRatioData',
		interface: 'mzfx/zjkfl_kpi',
		desc: '诊间开放率'
	*/
	(function getOpenRatioData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzfx/zjkfl_kpi'
		},
		fnSuccess = function(data) {
			var dom, text, value;
			dom = $('.middle-item-c1')[0];
			text = (+data[0]['KPIvalue'] * 100).toFixed(1) + '%';
			value = (+data[0]['KPIvalue']).toFixed(2);
			commUtil.drawCircle(dom, text, '', value, true);
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	/*
		name: 'getDoctorAttendanceData',
		interface: 'mzfx/yscql_kpi',
		desc: '医生出勤率'
	*/
	(function getDoctorAttendanceData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzfx/yscql_kpi'
		},
		fnSuccess = function(data) {
			var dom, text, value;
			dom = $('.middle-item-c2')[0];
			text = (+data[0]['KPIvalue'] * 100).toFixed(1) + '%';
			value = (+data[0]['KPIvalue']).toFixed(2);
			commUtil.drawCircle(dom, text, '', value, false);
		};

		commUtil.postData(url, method, param, fnSuccess);
	}());
})(commUtil, $, _, echarts)
// 获取数据
(function(commUtil, $, _, echarts, ech2) {
	/* 
		getOutpatientVisitsData: 函数名（自定义）,
		jkName: 接口参数
		value: 
		target: 目标,
		circleR: 环比,
		sameR: 同比
	*/
	// 门诊人次
	(function getOutpatientVisitsData() {
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'mzfx/mzrc_kpi'
		},
		fnSuccess = function(data) {
			var template = _.template($("#J_outpatient_visit").html());
			$("#J_analysis_outpat_visit").empty();
			var obj = {
				value: data[0]['KPIvalue'],
				target: data[0]['KPItarget'],
				circleR: data[0]['KPImonthvalue'],
				sameR: data[0]['KPIyearvalue']
			}
			$("#J_analysis_outpat_visit").append(template(obj));
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());
	// 均收结余
	// 入院目的组成
	// (function(){
	// 	var dom = $("#J_collected_balance")[0];
	// 	var option = {
	// 	    series: [
	// 	        {
	// 	            min: 0,
	// 	            max: 1,
	// 	            axisLine: {            // 坐标轴线
	// 	                lineStyle: {       // 属性lineStyle控制线条样式
	// 	                    width: 15,
	// 	                    color:[[0,'#00B5AD'],[0.6,'#00B5AD'],[1,'#F2F2F2']]
	// 	                }
	// 	            },
	// 	            data:[{value: 0.6, name: '呵呵'}]
	// 	        }
	// 	    ]
	// 	};
	// 	commUtil.drawBoard(dom, option);
	// }());
	/*
		name: 'all_inside',
		interface: '',
		@param{
			
		},
		desc: '绘制比例圆环',
	*/
	function all_inside(interface, dom, bool){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: interface || 'zhjk/cw/jsjy_kpi'
		},
		fnSuccess = function(data) {
			drawCircle(dom);
		};
		commUtil.postData(url, method, param, fnSuccess);
		// test 
		commUtil.drawCircle(dom, "80%", '100%', 0.8, bool);
	}
	$(".per-chart .middle-item").each(function(index, dom){
		commUtil.drawCircle(dom, "80%", '100%', 0.8, index%2);
	});
	/*
		name: 'quota_list',
		interface: '',
		@param{
			
		},
		desc: '异常指标列表',
	*/
	(function quota_list(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: interface || 'zhjk/cw/jsjy_kpi'
		},
		fnSuccess = function(data) {
			
		};
		commUtil.postData(url, method, param, fnSuccess);
	}());

	/*
		name: 'quota_standard',
		interface: '',
		@param{
			
		},
		desc: '指标达标率趋势',
	*/
	(function quota_standard(interface){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: interface || 'zhjk/cw/jsjy_kpi'
		},
		fnSuccess = function(data) {
			
		};
		commUtil.postData(url, method, param, fnSuccess);
		var dom = $("#J_an_standard")[0];
		var option = {
			color:['#A48AD4', '#F9A30F', '#AEC785', '#FF6C60'],
			legend:{
				data:['财务营收' ,'患者服务', '运营流程', '临床质量', '合规管理', '医护管理'],
			},
			yAxis: [
				{
		            //name: '降雨量(mm)',
		            nameLocation: 'start',
		            type: 'value',
		        }
			],
			series: [
				{
					naem: '财务营收',
					type: 'line',
					data: [320, 332, 301, 334, 390, 330, 320, 340, 367, 393, 311, 382]
				},
				{
		            name:'患者服务',
		            type:'line',
		            data:[320, 332, 301, 334, 390, 330, 320, 340, 367, 393, 311, 382]
		        },
		        {
		            name:'运营流程',
		            type:'line',
		            data:[320, 332, 301, 334, 390, 330, 320, 340, 367, 393, 311, 382]
		        },
		        {
		            name:'临床质量',
		            type:'line',
		            data:[440, 320, 380, 280, 348, 369, 370, 323, 360, 378, 359, 392]
		        },
		        {
		            name:'合规管理',
		            type:'line',
		            data:[240, 120, 380, 230, 38, 300, 320, 223, 390, 268, 309, 192]
		        },
		        {
		            name:'医护管理',
		            type:'line',
		            data:[132, 277, 327, 79, 96, 264, 220, 219, 188, 257, 125, 260]
		        }
		    ]
		}
		var chart = commUtil.drawLineChart(dom, option);
	}());
	/*
		name: 'quota_nostandard',
		interface: '',
		@param{
			
		},
		desc: '指标为达标数趋势',
	*/
	(function quota_nostandard(interface){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: interface || 'zhjk/cw/jsjy_kpi'
		},
		fnSuccess = function(data) {
			drawCircle(dom);
		};
		commUtil.postData(url, method, param, fnSuccess);
		var dom = $("#J_an_nostandard")[0];
		var option = {
			color:['#A48AD4', '#F9A30F', '#AEC785', '#FF6C60'],
			legend:{
				data:['财务营收' ,'患者服务', '运营流程', '临床质量', '合规管理', '医护管理'],
			},
			yAxis: [
				{
		            //name: '降雨量(mm)',
		            nameLocation: 'start',
		            type: 'value',
		        }
			],
			series: [
				{
					naem: '财务营收',
					type: 'line',
					data: [320, 332, 301, 334, 390, 330, 320, 340, 367, 393, 311, 382]
				},
				{
		            name:'患者服务',
		            type:'line',
		            data:[320, 332, 301, 334, 390, 330, 320, 340, 367, 393, 311, 382]
		        },
		        {
		            name:'运营流程',
		            type:'line',
		            data:[320, 332, 301, 334, 390, 330, 320, 340, 367, 393, 311, 382]
		        },
		        {
		            name:'临床质量',
		            type:'line',
		            data:[440, 320, 380, 280, 348, 369, 370, 323, 360, 378, 359, 392]
		        },
		        {
		            name:'合规管理',
		            type:'line',
		            data:[240, 120, 380, 230, 38, 300, 320, 223, 390, 268, 309, 192]
		        },
		        {
		            name:'医护管理',
		            type:'line',
		            data:[132, 277, 327, 79, 96, 264, 220, 219, 188, 257, 125, 260]
		        }
		    ]
		}
		var chart = commUtil.drawLineChart(dom, option);
	}());
	/*
		name:'financial_content',
		interface:'zhjk/cw/jsjy_kpi',
		@param:{
			tmp: 模板的父元素
			dest: '目标放置的对象',
			interface: '接口',
			flag: true代表仪表盘
		},
		desc: '填充整体绩效的文字内容'
	*/
	function financial_content(tmp, dest, interface, flag){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: interface || 'zhjk/cw/jsjy_kpi'
		},
		fnSuccess = function(data) {
			var template = _.template($(tmp).html());
			var obj = {
				name: data[0]["KPIname"],
				value: commUtil.thousandBitSeparator(~~data[0]["KPIvalue"]),
				target: ~~Math.abs(data[0]["KPItarget"]),
				sameRadio: ~~Math.abs(data[0]["KPIyearvalue"]),
				circleRadio: ~~Math.abs(data[0]["KPImonthvalue"]),
				redirection_year: +data[0]["KPIyearvalue"],
				redirection_month: +data[0]["KPImonthvalue"],
				redirection_target: +data[0]["KPItarget"]
			}
			var status = !(+data[0]["KPIstatus"]);
			var clr = status ? '#00B5AD' : "#FF6C60";
			$(dest).html(template(obj));
			if(flag){
				var option = {
					series: [
				        {
				            min: 0,
				            max: 1,
				            axisLine: {            // 坐标轴线
				                lineStyle: {       // 属性lineStyle控制线条样式
				                    width: 25,
				                    color:[[0,clr], [data[0]["KPIvalue"],clr], [1,'#F2F2F2']]
				                }
				            },
				            data:[{value: data[0]["KPIvalue"], name: data[0]["KPIname"]}]
				        }
				    ]
				};
				var dom = $(dest).children('.middle-item')[0];
				commUtil.drawBoard(dom, option);
			}
		};
		commUtil.postData(url, method, param, fnSuccess);
	};
	/* 财务 */
	// 门诊收入
	financial_content("#J_target_general", "#J_financial_menzsr", "zhjk/cwys/mzsr_kpi");
	// 均收结余
	financial_content("#J_target_general", "#J_financial_junsjy", "zhjk/cwys/jsjy_kpi");
	// 日均床位费
	financial_content("#J_target_general", "#J_financial_rijcwf", "zhjk/cwys/mcrpjfy_kpi");
	// 药品收入比
	financial_content("#J_target_general", "#J_financial_yaopsrb", "zhjk/cwys/ypsrzb_kpi", true);
	
	/* 临床质量 */
	// 非计划手术重返率
	financial_content("#J_target_general", "#J_qusa_fjhsscfl", "zhjk/lczl/fjhcf_kpi", true);
	// 抗菌药物处方比率
	// financial_content("#J_target_general", "#J_qusa_kjywcfbl", "zhjk/zlyaq/kjycfbl_kpi", true);
	// 并发症发病率
	financial_content("#J_target_general", "#J_qusa_bfzfbl", "zhjk/lczl/bfzfsl_kpi", true);
	// 不良事件上报例次
	financial_content("#J_target_general", "#J_qusa_blsjsblc", "zhjk/lczl/blsj_kpi");
	// 手术死亡人次
	// financial_content("#J_target_general", "#J_qusa_ssswrc", "zhjk/lczl/ssswrc_kpi");
	// 手术死亡率
	financial_content("#J_target_general", "#J_qusa_ssswl", "zhjk/lczl/ssswl_kpi", true);

	/* 运营流程*/
	// 门诊人次
	financial_content("#J_target_general", "#J_opef_mzrc", "zhjk/yylc/mzrc_kpi");
	// 手术人次
	financial_content("#J_target_general", "#J_opef_ssrc", "zhjk/yylc/ssrc_kpi");
	// 急诊人次
	financial_content("#J_target_general", "#J_opef_jzrc", "zhjk/yylc/jzrc_kpi");
	// 床位使用率
	financial_content("#J_target_general", "#J_opef_cwsyl", "zhjk/yylc/cwsyl_kpi", true);
	
	/* 患者服务 */
	//出院人均费用
	financial_content("#J_target_general", "#J_patient_cyrjfy", "zhjk/hzfw/cyrjfy_kpi");
	// 门诊人均费用
	financial_content("#J_target_general", "#J_patient_mzrjfy", "zhjk/hzfw/mzrjfy_kpi");
	// 诊疗等待时间
	financial_content("#J_target_general", "#J_patient_zlddsj", "zhjk/hzfw/zlddsj_kpi");
	// // 诊疗时间
	// financial_content("#J_target_general", "#J_patient_zlsj", "zhjk/hz/zlsj_kpi");
	// // 诊疗总时间
	// financial_content("#J_target_general", "#J_patient_zlzsj", "zhjk/hz/zlzsj_kpi");
	// 超声逾期2日比
	financial_content("#J_target_general", "#J_patient_cs2bl", "zhjk/hzfw/cs2tbl_kpi", true);	
	// // MR逾期2日比
	// financial_content("#J_target_general", "#J_patient_mr2tbl", "zhjk/hz/mr2tbl_kpi", true);
	// // CT逾期2日比
	// financial_content("#J_target_general", "#J_patient_ct2tbl", "zhjk/hz/ct2tbl_kpi", true);	

	/* 医护管理 */
	// 外出进修
	financial_content("#J_target_general", "#J_patient_wcjx", "zhjk/yhgl/wcjx_kpi");
	// 住院医师规范化培训合格率
	financial_content("#J_target_general", "#J_patient_zyysgfpx", "zhjk/yhgl/zyysgfpx_kpi");
	// 一级及以上论文发表数量
	financial_content("#J_target_general", "#J_patient_lwfbs", "zhjk/yhgl/lwfbs_kpi");
	// 职工住院人次
	financial_content("#J_target_general", "#J_patient_ygzy", "zhjk/yhgl/ygzy_kpi");

	/* 合规管理 */
	// 门诊抗菌药处方占比
	financial_content("#J_target_general", "#J_standard_kjycfbl", "zhjk/hggl/kjycfbl_kpi");
	// 抗菌药使用强度
	financial_content("#J_target_general", "#J_standard_kjysyqd", "zhjk/hggl/dddz_kpi");
})(commUtil, $, _, echarts, ech2)
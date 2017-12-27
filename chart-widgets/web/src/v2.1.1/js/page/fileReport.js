$(function(){
	/*=============================================
	=            选择报表 start            =
	=============================================*/
	$("#J_select_report")
	.on('click', function() {
		$('.report-panel-handler').slideToggle();
	})	
	
	$("#J_full_screen")
	.on('click', function() {
		var flag =  $("#J_modal_screen").is(":visible");
		$("#J_full_screen").text(flag ? "全屏显示" : "退出全屏");
		$("#J_modal_screen").toggle();
		$(".full-screen").toggleClass('pop-screen');

	})
	/*===========      选择报表 start     ======*/

	/*================================
	=            构造tab切换条       =
	================================*/
	
	var tablist = new TabList();
	tablist.init({
		'dom': $("#J_tablist"),
        'clickCallback': function(obj){console.log(this);console.log(obj);},
        'option': {
            'data': [
                {text:'报表名称嘿嘿1',id:'1'},
                {text:'报表名称嘿嘿2',id:'2'},
                {text:'报表名称嘿嘿3',id:'3'},
                {text:'报表名称嘿嘿4',id:'4'},
                {text:'报表名称嘿嘿5',id:'5'},
                {text:'报表名称嘿嘿6',id:'6'},
                {text:'报表名称嘿嘿7',id:'7'},
                {text:'报表名称嘿嘿8',id:'8'},
                {text:'报表名称嘿嘿9',id:'9'},
                {text:'报表名称嘿嘿10',id:'10'},
                {text:'报表名称嘿嘿11',id:'11'},
                {text:'报表名称嘿嘿12',id:'12'},
                {text:'报表名称嘿嘿13',id:'13'}
            ],
        }
	});
	tablist.render()
	
	
	/*=====  End of 构造tab切换条 ===*/
	
	/*=============================================
	=             构造tab切换条            =
	=============================================*/
	
	var sreport = new SelectReport();
	sreport.init({
		'dom': $(".content"),
        'clickCallback': function(obj){console.log(this);console.log(obj);},
        'option': {
            'data': [
                {
                    module:'模块嘿嘿1',
                    id:'1', 
                    report:[
                        {report: '报表嘿嘿11',id: '11'},
                        {report: '报表嘿嘿12',id: '12'},
                        {report: '报表嘿嘿13',id: '13'},
                        {report: '报表嘿嘿14',id: '14'},
                        {report: '报表嘿嘿15',id: '15'},
                        {report: '报表嘿嘿16',id: '16'},
                        {report: '报表嘿嘿17',id: '17'},
                        {report: '报表嘿嘿18',id: '18'},
                        {report: '报表嘿嘿19',id: '19'},
                        {report: '报表嘿嘿110',id: '20'}
                    ]
                },
                {
                    module:'模块嘿嘿2',
                    id:'2', 
                    report:[
                        {report: '报表嘿嘿21',id: '11'},
                        {report: '报表嘿嘿22',id: '12'},
                        {report: '报表嘿嘿23',id: '13'},
                        {report: '报表嘿嘿24',id: '14'},
                        {report: '报表嘿嘿25',id: '15'},
                        {report: '报表嘿嘿26',id: '16'},
                        {report: '报表嘿嘿27',id: '17'},
                        {report: '报表嘿嘿28',id: '18'},
                        {report: '报表嘿嘿29',id: '19'},
                        {report: '报表嘿嘿210',id: '20'}
                    ]
                },
                {
                    module:'模块嘿嘿1',
                    id:'3', 
                    report:[
                        {report: '报表嘿嘿31',id: '11'},
                        {report: '报表嘿嘿32',id: '12'},
                        {report: '报表嘿嘿33',id: '13'},
                        {report: '报表嘿嘿34',id: '14'},
                        {report: '报表嘿嘿35',id: '15'},
                        {report: '报表嘿嘿36',id: '16'},
                        {report: '报表嘿嘿37',id: '17'},
                        {report: '报表嘿嘿38',id: '18'},
                        {report: '报表嘿嘿39',id: '19'},
                        {report: '报表嘿嘿310',id: '20'}
                    ]
                }
            ]
        }
	});
	
	/*=====  End of 构造tab切换条  ======*/
	
})
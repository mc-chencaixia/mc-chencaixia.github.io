/*
 *  合理用药pharmacy页面
 */
$(function(){

    /*=================================
    =     面板组件start            =
    =================================*/
    var panelArray = [];
    
    var myOption = [
        {
            'data': {'title': '门诊收入', 'num': '1156007899.89', 'unit': '元', 'trend': 'down', 'tongbi': '70%', 'imgType': '1', 'colorType': '2'}
        },
        {
            'data': {'title': '门诊人次', 'num': '115600', 'unit': '元', 'trend': 'down', 'tongbi': '70%', 'imgType': '2', 'colorType': '3'}
        },
        {
            'data': {'title': '门诊人次', 'num': '115600', 'unit': '元', 'trend': 'down', 'tongbi': '70%', 'imgType': '3', 'colorType': '4'}
        },
        {
           'data': {'title': '门诊人次', 'num': '115600', 'unit': '元', 'trend': 'down', 'tongbi': '70%', 'imgType': '4', 'colorType': '5'}
        }

    ]
    $.each(myOption, function(index, option){
        var myPanelOne = new mPanel();      // 注意在循环内部new对象        
        myPanelOne.init({
            'dom': $('.j-panel').eq(index),
            'option': option
        })
        //console.log(option);
        panelArray.push( myPanelOne );
    })
    // console.log(panelArray[1].option.data.title);
    
    /*=====  面板end  ======*/
    
    /*=================================
    =     指标趋势start            =
    =================================*/
    var domTrend = $(".patient-polyline"),
    dataTrend = [
        {
            name: '今年', 
            xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            isLine: false,
            data: [43, 23, 92, 60, 94, 110, 63, 26, 7, 33, 112, 42]
        },
        {
            name: '去年', 
            isLine: false,
            data: [60, 107, 28, 4, 87, 6, 47, 10, 27, 89, 3, 31]
        },
        {
            name: '目标',
            isLine: true,
            data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
        }
    ], 
    title = {text:'指标趋势', textStyle: {color:'#000', fontSize:'15',fontWight: 600}, top: '2%', left: '3%'},
    areaLineChart = new AreaLineChart();
    
    areaLineChart.init({dom:domTrend[0], title: title});
    
    areaLineChart.render(dataTrend);

    /*=====  指标趋势end  ======*/


    /*=====================================
    =     科室门诊综合能力 start            =
    =====================================*/
    
    var myTableOne = new mTable();
    var myOption = {
        'data': {
            'title': ['指标名称', '单位  ', '指标值', '同比值', '环比值', '目标值'],
            'content': [ 
                ['药品收入占比', '42', '21', '19', '45' , '45.6%'], 
                ['门诊处方合格率', '42', '21', '19', '45' , '45.6%'],
                ['急诊患者抗菌药处方比例', '42', '21', '19', '45' , '45.6%'], 
                ['抗菌药使用处方不合格率', '42', '21', '19', '45' , '45.6%'],
                ['每天就诊人均用药品种数', '42', '21', '19', '45' , '45.6%'], 
                ['每天就诊人均药费', '42', '21', '19', '45' , '45.6%'],
                ['基本药物占处方用药的百分率', '42', '21', '19', '45' , '45.6%'],
            ]
        }
    }
    myTableOne.init({
        'dom': '#J_tableOne',
        'option': myOption
    })

    /*=====  科室门诊综合能力end  ======*/



    /* 科室排名（进度条） */
    var deptRankProgressList = new mRankProgress();
    deptRankProgressList.init({
        'dom':'#J_deptRankProgressList',
        'option':{
            'prefixClass':'pg',
            'unit':'k',
        }
    });
    var testData = [
        {'name':'消化内科','score':'164.31','target':'45','account':'15',},
        {'name':'妇产科','score':'151.66','target':'45','account':'15',},
        {'name':'神经内科','score':'141.05','target':'45','account':'15',},
        {'name':'耳鼻咽喉科','score':'134.61','target':'45','account':'15',},
        {'name':'急诊科','score':'124.19','target':'45','account':'15',},
        {'name':'皮肤科','score':'119.12','target':'45','account':'15',},
        {'name':'儿科二','score':'114.31','target':'45','account':'15',},
        {'name':'小儿科','score':'107.38','target':'45','account':'15',},
        {'name':'中医科','score':'99.53','target':'45','account':'15',},
        {'name':'儿科','score':'96.08','target':'45','account':'15',},
    ];
    deptRankProgressList.setData( testData ); // 动态赋值,数值可以不按顺序排列
    deptRankProgressList.render(); // 触发渲染
    


})

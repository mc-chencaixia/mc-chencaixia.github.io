$(function(){



    var myTableOne = new mTable();
    var myOption = {
        'data': {
            'title': ['KPI小类', 'KPI名称', '实际值', '单位', '是否达标', '目标值', '同比值', '同比'],
            'content': [ 
                ['中医中药', '中医处方药', '5.770', '张数', '未完成', '512', '342,090', '下降80.8%'], 
                ['中医中药', '中医处方药', '5.770', '张数', '未完成', '512', '342,090', '下降80.8%'], 
                ['中医中药', '中医处方药', '5.770', '张数', '未完成', '512', '342,090', '下降80.8%'], 
                ['中医中药', '中医处方药', '5.770', '张数', '未完成', '512', '342,090', '下降80.8%'], 
                ['中医中药', '中医处方药', '5.770', '张数', '未完成', '512', '342,090', '下降80.8%'], 
                ['中医中药', '中医处方药', '5.770', '张数', '未完成', '512', '342,090', '下降80.8%'], 
            ]
        }
    }
    myTableOne.init({
        'dom': '#J_tableOne',
        'option': myOption
    })


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
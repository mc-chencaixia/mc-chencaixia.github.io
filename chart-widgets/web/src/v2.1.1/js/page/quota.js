/*
 *  xx指标页面
 */
$(function(){   

	/* 科室排名 */    
    var deptRanklist = new mRanklist();
    var deptRanklistOption = {
    	'prefixClass':'sm',
    	'unit':'人次',
        'data': [
            {'name':'儿科','score':'2344',},
            {'name':'妇产科','score':'1324',},
            {'name':'外科','score':'1266',},
            {'name':'内科','score':'1098',},
            {'name':'药剂科','score':'868',},
            {'name':'骨科','score':'798',},
        ],
    };
    deptRanklist.init({
        'dom':$('#J_deptRanklist'),
        'option': deptRanklistOption,   // 初始化的时候就赋值
    });
    deptRanklist.render();

    /*=================================
    =     指标趋势start            =
    =================================*/
    var dataLine = [
        {
            name: '实际值', 
            xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            isLine: false,
            data: [43, 23, 92, 60, 94, 110, 63, 26, 7, 33, 112, 42]
        },
        {
            name: '去年值', 
            isLine: false,
            data: [60, 107, 28, 4, 87, 6, 47, 10, 27, 89, 3, 31]
        },
        {
            name: '目标值',
            isLine: true,
            data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
        }
    ],
    title = {text:'指标趋势', textStyle: {color:'#000', fontSize:'15',fontWight: 600}, top: '1%', left: '3%'},
    // 区域折线图
    areaLineChart = new AreaLineChart();
    
    areaLineChart.init({dom: $(".quota-line")[0], title: title});
    
    areaLineChart.render(dataLine);

    /*=====  指标趋势start  ======*/

    /*====================================
    =     病种排序直方图 start            =
    ====================================*/
    
    var data = {
        name: '预约', 
        xAxis: ['恶性肿瘤维\n持性化学时间', '冠状动脉粥样\n硬化性心脏病', '新生儿高胆\n红素血症', '胎儿宫内窘迫', '头位顺产', '乳腺良性肿瘤', '妊娠合并\n子宫瘢痕', '卵巢良性肿瘤', '腋臭'],
        data: [29184, 46304, 19728, 20733, 15778, 13152, 57152, 18352, 55763]
    },
    title = {text:'确诊病种(万/人次)', textStyle: {color:'#000', fontSize:'15',fontWight: 600}, top: '1%', left: '3%'},
    // 柱状图
    barChart = new BarChart();

    barChart.init({dom:$(".quota-bar")[0], title: title});
    
    barChart.render(data);
    
    /*=====  病种排序直方图 end  ======*/
    
    /*====================================
    =     入院目的饼图 start            =
    ====================================*/
    var dataPie1 = [
        {name: '初诊', value: 54},
        {name: '复诊', value: 34},
        {name: '一般检查', value: 12}
    ],
    pieChart1 = new PieChart();
    
    pieChart1.init({dom: $(".quota-pie-goal")[0]});
    
    pieChart1.render(dataPie1);
    
    /*=====  入院目的饼图 end  ======*/
    
     /*====================================
    =     门诊来源饼图 start            =
    ====================================*/
    var dataPie2 = [
        {name: '预约', value: 53},
        {name: '挂号', value: 41},
        {name: '转诊', value: 6}
    ],
    pieChart2 = new PieChart();
    
    pieChart2.init({dom: $(".quota-pie-source")[0]});
    
    pieChart2.render(dataPie2);
    
    /*=====  门诊来源饼图 end  ======*/
    
     /*====================================
    =     门诊结果饼图 start            =
    ====================================*/
    var dataPie3 = [
        {name: '确诊', value: 43},
        {name: '住院', value: 27},
        {name: '转诊', value: 30}
    ],
    pieChart3 = new PieChart();
    
    pieChart3.init({dom: $(".quota-pie-result")[0]});
    
    pieChart3.render(dataPie3);
    
    /*=====  门诊结果饼图 end  ======*/

    /*==================================
    =     患者地图 start            =
    ==================================*/
    
    var dataMap = [
        {name: '北京',value: Math.random()*1000 },
        {name: '天津',value: Math.random()*1000 },
        {name: '上海',value: Math.random()*1000 },
        {name: '重庆',value: Math.random()*1000 },
        {name: '河北',value: Math.random()*1000 },
        {name: '河南',value: Math.random()*1000 },
        {name: '云南',value: Math.random()*1000 },
        {name: '辽宁',value: Math.random()*1000 },
        {name: '黑龙江',value: Math.random()*1000 },
        {name: '湖南',value: Math.random()*1000 },
        {name: '安徽',value: Math.random()*1000 },
        {name: '山东',value: Math.random()*1000 },
        {name: '新疆',value: Math.random()*1000 },
        {name: '江苏',value: Math.random()*1000 },
        {name: '浙江',value: Math.random()*1000 },
        {name: '江西',value: Math.random()*1000 },
        {name: '湖北',value: Math.random()*1000 },
        {name: '广西',value: Math.random()*1000 },
        {name: '甘肃',value: Math.random()*1000 },
        {name: '山西',value: Math.random()*1000 },
        {name: '内蒙古',value: Math.random()*1000 },
        {name: '陕西',value: Math.random()*1000 },
        {name: '吉林',value: Math.random()*1000 },
        {name: '福建',value: Math.random()*1000 },
        {name: '贵州',value: Math.random()*1000 },
        {name: '广东',value: Math.random()*1000 },
        {name: '青海',value: Math.random()*1000 },
        {name: '西藏',value: Math.random()*1000 },
        {name: '四川',value: Math.random()*1000 },
        {name: '宁夏',value: Math.random()*1000 },
        {name: '海南',value: Math.random()*1000 },
        {name: '台湾',value: Math.random()*1000 },
        {name: '香港',value: Math.random()*1000 },
        {name: '澳门',value: Math.random()*1000 }
    ],
    mapChart = new MapChart();
    mapChart.init({dom: $(".quota-map")[0]});
    mapChart.render(dataMap);
    
    /*=====  患者地图 end  ======*/
    
    /*====================================
    =     患者性别组成 start            =
    ====================================*/
    var data1 = [
        {name: '男', value: 234},
        {value: 132}
    ],
    circle1 = new CircleChart();
    circle1.init({dom: $(".quota-ring-1")[0], status: true});
    circle1.render(data1);
    
    var data2 = [
        {name: '女', value: 132},
        {value: 234}
    ];
    // 圆环图
    var circle2 = new CircleChart();
    circle2.init({dom:$(".quota-ring-2")[0], status: false});
    circle2.render(data2);
    
    /*=====  患者性别组成 end  ======*/
    
    

    /*==========================================
    =     门诊人次-门诊收入折线图 start            =
    ==========================================*/
    var data = [
        {
            name: '今年', 
            xAxis: ['2016.01', '2016.02', '2016.03', '2016.04', '2016.05', '2016.06', '2016.07', '2016.08', '2016.09', '2016.10', '2016.11', '2016.12'],
            isLine: true,
            yAxisIndex: 0,
            name: '门诊人次(人)',
            hasPoint: true,
            data: [43, 23, 92, 60, 94, 110, 63, 26, 7, 33, 112, 42]
        },
        {
            name: '去年', 
            isLine: true,
            yAxisIndex: 1,
            name: '门诊收入(万元)',
            hasPoint:true,
            data: [60, 107, 28, 4, 87, 6, 47, 10, 27, 89, 3, 31]
        }
    ],
    areaLineChart = new AreaLineChart();
    
    areaLineChart.init({dom:$(".quota-polyline-patient")[0]});
    
    areaLineChart.render(data);
    
    
    /*=====  门诊人次-门诊收入折线图 end  ======*/
    
    /*==========================================
    =     门诊人次人均费用 直方图 start            =
    ==========================================*/
    var data = {
        name: '预约', 
        xAxis: ['0-500', '500-1k', '1k-1.5k', '1.5k-2k', '2k-2.5k', '2.5k-3k', '3k-3.5k', '3.5k-4k', '4k-4.5k', '4.5k+'],
        data: [29184, 46304, 19728, 20733, 15778, 13152, 57152, 18352, 55763, 24524]
    },
    barChart = new BarChart();
    
    barChart.init({
        dom: $(".quota-bar-patient")[0], 
        title:{text:"y:人次(千人) x:人均费用(元)", textStyle:{color:'#000', fontWight:600, fontSize: 14}, right: '2%'},
        isXTextRotate: true
    });
    
    barChart.render(data);
        
    /*=====  门诊人次人均费用 直方图 end  ======*/

    /*====================================
    =     排序条形图 start            =
    ====================================*/       
    var mySortBarOne = new mSortBar();
    var myOption = {
        'colorConfig':{'colorStart':'#00c1f0','colorEnd':'#03c3f0'},
        'data': [
            {'name':'0-10岁','core':'12.6%','value':'110',},
            {'name':'10-20岁','core':'60.2%','value':'260',},
            {'name':'20-30岁','core':'80.6%','value':'850',},
            {'name':'30-40岁','core':'76%','value':'760',},
            {'name':'40-50岁','core':'22.3%','value':'308',},
            {'name':'50-60岁','core':'18.6%','value':'250',}
        ],
    };
    mySortBarOne.init({
        'option': myOption,   // 初始化的时候就赋值
    });
    mySortBarOne.setDom("#J_sortBarOne");
    mySortBarOne.render();
    /*=====  排序条形图 end     ======*/
    
})

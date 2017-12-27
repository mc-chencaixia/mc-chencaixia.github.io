/*
 *  监控页面
 */
$(function(){

    



    /* 科室绩效排名 */    
    var deptRanklist = new mRanklist();
    var deptRanklistOption = {
        'data': [
            {'name':'血液净化中心','score':'96',},
            {'name':'胃肠外科','score':'94',},
            {'name':'台州中心医院','score':'92',},
            {'name':'血管胰脾疝科','score':'90',},
            {'name':'血液肿瘤内科','score':'85',},
            {'name':'内分泌内科','score':'80',},
            {'name':'乳腺甲状腺病区（5F）','score':'68',},
            {'name':'肝胆外科（11F）','score':'65',},
            {'name':'院办公室','score':'55',},
            {'name':'乳腺甲状腺外科','score':'45',},
        ],
    };
    deptRanklist.init({
        'dom':$('#J_deptRanklist'),
        'option': deptRanklistOption,   // 初始化的时候就赋值
    });
    deptRanklist.render();



    
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
    mapChart.init({dom: $(".monitor-map")[0]});
    mapChart.render(dataMap);
    
    /*=====  患者地图 end  ======*/
    
      /*=====  患者地图 end  ======*/
    
    /*====================================
    =     患者性别组成 start            =
    ====================================*/
    var data1 = [
        {name: '男', value: 234},
        {value: 132}
    ],
    circle1 = new CircleChart();
    circle1.init({dom: $(".monitor-ring-1")[0], status: true});
    circle1.render(data1);
    
    var data2 = [
        {name: '女', value: 132},
        {value: 234}
    ];
    // 圆环图
    var circle2 = new CircleChart();
    circle2.init({dom:$(".monitor-ring-2")[0], status: false});
    circle2.render(data2);
    
    /*=====  患者性别组成 end  ======*/

    




})

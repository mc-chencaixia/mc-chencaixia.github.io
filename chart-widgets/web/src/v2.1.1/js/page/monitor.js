/*
 *  监控页面
 */
$(function(){

    /*=================================
    =     面板组件start            =
    =================================*/
    var myPanelOne = new mPanel();
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
        myPanelOne.init({
            'dom': $('.j-panel').eq(index),
            'option': option
        })
    })

    /*=====  面板组件end ======*/

    /*=================================
    =     表格组件start            =
    =================================*/

    var myTableOne = new mTable();
    var myOption = {
        'flag': {
            'color': 'red'
        },
        'data': {
            'title': ['日期', '科室', '病案号', '病人姓名', '年龄', '疾病'],
            'content': [ 
                ['10-01', '呼吸内科', '00867312', '王简单', '45岁' , '慢性阻塞性肺病'], 
                ['10-02', '急诊病区', '00867312', '李都是', '43岁' , '弥漫性脑损伤'],
                ['10-03', '重症病学科', '00867312', '张规范', '56岁' , '脑出血'], 
                ['10-04', '放疗科', '00867312', '王打开', '23岁' , '前列腺恶性肿瘤'],
                ['10-05', '呼吸内科', '00867312', '赵监控', '56岁' , '慢性阻塞性肺病'], 
                ['10-06', '放疗科', '00867312', '钱老师', '67岁' , '脑出血'],
                ['10-07', '急诊病区', '00867312', '吴欧尼', '14岁' , '前列腺恶性肿瘤'],
            ]
        }
    }
    myTableOne.init({
        'dom': '#J_tableTwo',
        'option': myOption
    })

    /*=====  表格组件end ======*/

    /* 6类指标完成情况统计 */
    var quotaProgress = new mProgress();
    var quotaOption = {
        //'colors':['#00c1f0','#1ab293',],
        'data': [
            {'name':'运营效率2','target':'77','account':'56',},
            {'name':'财务3','target':'74','account':'68',},
            {'name':'质量2','target':'99','account':'12',},
            {'name':'安全3','target':'93','account':'28',},
            {'name':'患者4','target':'44','account':'16',},
            {'name':'学习和成长4','target':'30','account':'18',},
            {'name':'质量2','target':'99','account':'12',},
            {'name':'安全3','target':'93','account':'28',},
            {'name':'患者4','target':'44','account':'16',}
        ],
    };
    quotaProgress.init({
        'dom':'#J_sixQuota',
        'option': quotaOption,   // 初始化的时候就赋值
    });
    quotaProgress.render();

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


    /* 违规事件--棒棒糖 */         
    var violations = new mLollipop();
    var violationsOption = {
        'levelConfig':[{'level':'1','color':'#ff6c60'},
                    {'level':'2','color':'#f39c12'},
                    {'level':'3','color':'#00c1f0'},
                    {'level':'4','color':'#000000'}
                    ],
        'data': [{'name':'摔倒事件0','level':'3','date':'2017-1-9','detail':'某某在卫生间摔倒','time':'12:53:05'},
                 {'name':'摔倒事件1','level':'1','date':'2017-1-9','detail':'某某在卫生间摔倒','time':'12:53:05'},
                {'name':'摔倒事件2','level':'1','date':'2017-1-9','detail':'某某在卫生间摔倒','time':'12:53:05'},
                {'name':'摔倒事件3','level':'2','date':'2017-1-9','detail':'某某在卫生间摔倒','time':'12:53:05'},
                {'name':'摔倒事件4','level':'2','date':'2017-1-9','detail':'某某在卫生间摔倒','time':'12:53:05'},
                {'name':'摔倒事件5','level':'3','date':'2017-1-9','detail':'某某在卫生间摔倒','time':'12:53:05'},
                {'name':'摔倒事件6','level':'3','date':'2017-1-9','detail':'某某在卫生间摔倒','time':'12:53:05'}
            ]
    };
    violations.init({
        'dom':$('#J_violations'),
        'option': violationsOption,   // 初始化的时候就赋值
    });
    violations.render();

    /*==================================
    =     指标完成趋势 折线图 start    =
    ==================================*/
    var data = [
        {
            //name: '今年', 
            xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            isLine: false,
            hasPoint: true,
            smooth: false,
            data: [43, 23, 92, 60, 94, 110, 63, 26, 7, 33, 112, 42]
        },
    ],
    areaLineChart = new AreaLineChart();
    
    areaLineChart.init({dom:$(".monitor-polyline")[0], title:{text:"完成指标数/个", textStyle:{color:'#43C2F2', fontWight:600, fontSize: 14}, right: '2%'}});
    
    areaLineChart.render(data);
    
    
    /*=====  指标完成趋势 折线图 end ======*/
    
    /*=========================================
    =     指标完成情况统计散点图 start        =
    =========================================*/
    var data = [
            {
                name: '已达标: '+75 +'个',
                data: (function(){
                    var result = [];
                    for(var i=1;i<150;i+=2){
                        result.push([i, (Math.random()).toFixed(2),'指标名称'+i,'已达标: '+150 +'个']);
                    }
                    return result;
                }())
            },{
                name: '未达标: '+75 +'个',
                data: (function(){
                    var result = [];
                    for(var i=0;i<150;i+=2){
                        result.push([i, (-Math.random()).toFixed(2),'指标名称'+i,'未达标: '+150 +'个']);
                    }
                    return result;
                }())
            }
        ],
        pointChart = new PointChart();
        
        pointChart.init({dom: $(".monitor-point")[0]});
        
        pointChart.render(data);
      
    /*=====  指标完成情况统计散点图 end ======*/
    
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

    /*=============================================
    =     收入与患者属性关系统计 散点图 start      =
    ==============================================*/
    
    var data = [
            {
                name: '男性',
                xAxis: ['0-10', '10-20', '20-30', '30-40', '40-50',
                    '50-60', '60-70', '70-80', '80-90', '90+'
                ],
                data: (function(){
                    var res = [];
                    for(var i=0;i<10;i++){
                        var mad = [];
                        mad.push(~~(Math.random()*200000));
                        mad.push(~~(Math.random()*20000));
                        res.push(mad);
                    }
                    return res;
                }())
            },
            {
                name: '女性',
                data: (function(){
                    var res = [];
                    for(var i=0;i<10;i++){
                        var mad = [];
                        mad.push(~~(Math.random()*200000));
                        mad.push(~~(Math.random()*20000));
                        res.push(mad);
                    }
                    return res;
                }())
            }
        ];
        var chart = new PointAChart();
        chart.init({dom:$(".monitor-Apoint")[0], title: {text:'y:收入(万元)  x:年龄(岁)', textStyle: {color:'#111', fontSize:'14'}, top: '2%', left: '10%'}});
        chart.render(data);
    
    /*=====  收入与患者属性关系统计 散点图 end ======*/
    

    /*====================================
    =     收入组成饼图 start            =
    ====================================*/
     var data = [
            [
                {value:44, name:'住院收入'},
                {value:56, name:'门诊收入'}
            ],
            [
                {value:32, name:'住院药品'},
                {value:12, name:'住院诊疗'},
                {value:30, name:'门诊诊疗'},
                {value:26, name:'门诊药品'}
            ]
        ],
        ringChart = new RingChart();
    
    ringChart.init({dom: $(".monitor-ring")[0]});
    
    ringChart.render(data);
    
    /*=====  收入组成饼图 end     ======*/


   /*====================================
    =     排序条形图 start            =
    ====================================*/       
    var mySortBarOne = new mSortBar();
    var myOption = {
        'colorConfig':{'colorStart':'#00c1f0','colorEnd':'#03c3f0'},
        'data': [
            {'name':'0-10岁','value':'110',},
            {'name':'10-20岁','value':'260',},
            {'name':'20-30岁','value':'850',},
            {'name':'30-40岁','value':'760',},
            {'name':'40-50岁','value':'308',},
            {'name':'50-60岁','value':'250',}
        ],
    };
    mySortBarOne.init({
        'option': myOption,   // 初始化的时候就赋值
    });
    mySortBarOne.setDom("#J_sortBarOne");
    mySortBarOne.render();
    /*=====  排序条形图 end     ======*/

})

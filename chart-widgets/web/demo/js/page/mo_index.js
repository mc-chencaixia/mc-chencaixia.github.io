(function() {
    /*
        name: 'getBedsNumData',
        interface: 'ssjk/zy/kfcws',
        desc: '开放床位数'
    */
    (function getBedsNumData() {
        // var url = '/getBIEEData.public',
        // method = 'get',
        // param = {
        //     jkName: 'ssjk/zy/kfcws'
        // },
        // fnSuccess = function(data) {
        //     var dom, hold, all;
        //     dom = document.getElementById("J_circle_ratio1");
        //     hold = +data[0]['valuehold'];
        //     all = +data[0]['valueall'];
        //     var circle = new CircleWater(dom);
        //     circle.setOption({
        //         name:'名称',
        //         radius: 30,
        //         ratio:[[+(hold / all).toFixed(1), hold],[0.5, all - hold]],
        //         legend:{
        //             '#00A9A7': '开放',
        //             '#FFFFFF': '闲置'
        //         }
        //     });
        // };
        var dom, hold, all;
        dom = document.getElementById("J_circle_ratio1");
        hold = 42;
        all = 72;
        var circle = new CircleWater(dom);
        circle.setOption({
            name:'名称',
            radius: 30,
            ratio:[[+(hold / all).toFixed(1), hold],[0.5, all - hold]],
            legend:{
                '#00A9A7': '开放',
                '#FFFFFF': '闲置'
            }
        });
        // commUtil.postData(url, method, param, fnSuccess);
    }());
        /*
        出院分类饼图
    */
    (function() {
        var dom = $("#J_out_hospital")[0];
        var option = {

            color:['#A48AD4', '#F9A30F', '#AEC785', '#FF6C60'],
            legend: {
                orient: 'horizontal',
                // left: 'left',
                // width: '100',
                itemWidth: 8,
                itemHeight: 8,
                height: '8',
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 12,
                },
                data: ['正常','死亡','转院','弃疗']
            },
            series : [{
                name: '出院分类',
                label: {
                    normal: {
                        formatter: function (name) {
                            return name.value;
                        },
                        position: 'inner'
                    }
                },
                data:[
                    {value:34, name:'正常'},
                    {value:23, name:'死亡'},
                    {value:54, name:'转院'},
                    {value:12, name:'弃疗'}
                ]
            }]
        }
        currentIndex = -1;
        setInterval(function() {
            var dataLen = option.series[0].data.length;
            // 取消之前高亮的图形
            chart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: currentIndex
            });
            currentIndex = (currentIndex + 1) % dataLen;
            // 高亮当前图形
            chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: currentIndex
            });
            // 显示 tooltip
            chart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: currentIndex
            });
        }, 2000);
        var chart = commUtil.drawPieChart(dom, option);
    }());
    /*
        圆环占比
    */
    (function() {
        var dom = $("#middle-item-c1")[0];
        commUtil.drawCircle(dom, '80%', '', 0.8, true);
    }());
    /*
        name: 'getOutpatientVisitData',
        interface: 'ssjk/mz/mzrc_kpi',
        desc: '门诊人次'
    */
    (function getOutpatientVisiData() {
        var url = '/getBIEEData.public',
        method = 'get',
        param = {
            jkName: 'ssjk/mz/mzrc_kpi'
        },
        fnSuccess = function(data){
            var dom = $('.top-outpatient .middle-item');
            dom.text(data[0]['KPIvalue']);
        };
        commUtil.postData(url, method, param, fnSuccess);
    }());
    /*
        name: 'getOutpatientVisitData',
        interface: 'ssjk/mz/mzrc_kpi',
        desc: '门诊人次'
    */
    (function getOutpatientVisiData() {
        var url = '/getBIEEData.public',
        method = 'get',
        param = {
            jkName: 'ssjk/mz/mzrc_kpi'
        },
        fnSuccess = function(data){
            var dom = $('.top-outpatient .middle-item');
            dom.text(data[0]['KPIvalue']);
        };
        commUtil.postData(url, method, param, fnSuccess);
    }());
    /*
        name: 'getOutpatientVisitTrendData',
        interface: 'ssjk/mz/mzrc_kpi',
        desc: '门诊人次趋势图'
    */
    (function getOutpatientVisitTrendData() {
        // var url = '/getBIEEData.public',
        // method = 'get',
        // param = {
        //     jkName: 'ssjk/mz/mzrc_qs'
        // },
        // fnSuccess = function(data){
        //     var hours=[], values=[];
        //     for (var i = 0; i < data.length; i++) {
        //         hours.push(data[i]['hours']);
        //         values.push(data[i]['KPIvalue']);
        //     }
        //     var dom = $("#J_monitor_outpat_visit")[0];
        //     var chart = echarts.init(dom);
        //     option = {
        //         tooltip: {
        //             trigger: 'axis',
        //             position: function (pt) {
        //                 return [pt[0], '10%'];
        //             }
        //         },
        //         grid:{
        //             top:'5%',
        //             bottom: '20%'
        //         },
        //         legend: {
        //             top: 'bottom',
        //             data:['意向'],
        //             textStyle: {
        //                 color: "#FFFFFF"
        //             }
        //         },
        //         xAxis: {
        //             type: 'category',
        //             boundaryGap: false,
        //             nameTextStyle: {
        //                 color: "#FFFFFF"
        //             },
        //             axisLabel: {
        //                 textStyle: {
        //                     color: 'white'
        //                 },
        //             },
        //             data: hours
        //         },
        //         yAxis: {
        //             type: 'value',
        //             boundaryGap: [0, '20%'],
        //             axisLabel: {
        //                 textStyle: {
        //                     color: 'white'
        //                 },
        //             },
        //             splitLine: {
        //                 show: true,
        //                 lineStyle: {
        //                     color: ['#40404A']
        //                 },
        //             }
        //         },
        //         series: [
        //             {
        //                 name:'模拟数据',
        //                 type:'line',
        //                 smooth: true,
        //                 symbol: 'none',
        //                 sampling: 'average',
        //                 itemStyle: {
        //                     normal: {
        //                         color: '#00ADA7'
        //                     }
        //                 },
        //                 areaStyle: {
        //                     normal: {
        //                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                             offset: 0,
        //                             color: '#1B7172'
        //                         }, {
        //                             offset: 1,
        //                             color: '#25333E'
        //                         }])
        //                     }
        //                 },
        //                 data: values
        //             }
        //         ]
        //     };
        //     chart.setOption(option);
        // };
        var yvalues = [];
        for (var i = 0; i < 24; i++) {
            yvalues.push((Math.random() * 150).toFixed(0));
        }
        var dom = $("#J_monitor_outpat_visit")[0];
            var chart = echarts.init(dom);
            option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                grid:{
                    top:'5%',
                    bottom: '20%'
                },
                legend: {
                    top: 'bottom',
                    data:['意向'],
                    textStyle: {
                        color: "#FFFFFF"
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    nameTextStyle: {
                        color: "#FFFFFF"
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        },
                    },
                    data: (function (){
                        var now = new Date();
                        var res = [];
                        var len = 24;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '20%'],
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#40404A']
                        },
                    }
                },
                series: [
                    {
                        name:'模拟数据',
                        type:'line',
                        smooth: true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: '#00ADA7'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#1B7172'
                                }, {
                                    offset: 1,
                                    color: '#25333E'
                                }])
                            }
                        },
                        data: yvalues
                    }
                ]
            };
            chart.setOption(option);
            var index = 0;
            setInterval(function() {
                axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
                var data0 = option.xAxis.data;
                var data1 = option.series[0].data;

                data1.shift();
                data1.push((Math.random() * 150).toFixed(0));

                option.xAxis.data.shift();
                option.xAxis.data.push(axisData);
                chart.setOption(option);
            }, 2000);
        // commUtil.postData(url, method, param, fnSuccess);
    }());
    /*
        name: 'getExpertNumTrendData',
        interface: 'ssjk/mz/mzhy',
        desc: '医生号源信息'
    */
    (function getExpertNumTrendData() {
        var url = '/getBIEEData.public',
        method = 'get',
        param = {
            jkName: 'ssjk/mz/mzhy'
        },
        fnSuccess = function(data){
            var expertNumArr = [], template;
            data.sort(function(a, b){
                return b['GHS'] - a['GHS'];
            })
            for (var i = 0; i < data.length; i++) {
                var obj = {
                    name: data[i]['医生姓名'],
                    width: ((+data[i]['HYS'] / +data[i]['GHS']) * 100).toFixed(2) + '%',
                    value: ((+data[i]['HYS'] / +data[i]['GHS']) * 100).toFixed(2) + '%'
                }
                expertNumArr.push(obj);
            }
            template = _.template($("#J_analysis_line").html());
            $("#J_analysis_child_zzl").empty();

            for (var i = 0; i < data.length; i++) {
                $("#J_analysis_child_zzl").append(template(expertNumArr[i]));
            }
        };

        $(".progress-bar-ls").each(function(index, dom) {
            $(dom).animate({
                width:100*Math.random()+'%',
            },{
                easing: "easeInOutElastic",
                duration: 1500,
                complete:function(){
                }
            })
        })
        var flag = -1;
        setInterval(function() {
            flag = flag == -1 ? 1 : -1;
            $(".progress-bar-ls").each(function(index, dom) {
                console.log($(dom).css("width").slice(0, -2));
                $(dom).animate({
                    width: 100*(+$(dom).css("width").slice(0, -2))/(+$(".progress").css("width").slice(0,-2)) - flag*10*Math.random() +'%',
                },{
                    easing: "easeInOutElastic",
                    duration: 1500,
                    complete:function(){
                    }
                })
            })
        }, 2000);
        
        commUtil.postData(url, method, param, fnSuccess);
    }());
    /*
        @param:{
            
        },
        desc:'科室忙碌情况'
    */
    (function() {
        var dom_1 = document.getElementById("J_chart_lf");
        var dom_2 = document.getElementById("J_chart_rt");
        var option_1 = {
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                align: 'right',
                right: '10',
                data: ['平均等待时长/min', '当前等待人数/位'],
                textStyle: {
                    color: '#FFF',
                    fontSize: 12,
                }
            },
            grid: {
                left: '0%',
                right: '15%',
                bottom: '3%',
                top: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.1],
                inverse: true,
                axisLabel: {
                    textStyle: {
                        color: 'white'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#40404A']
                    },
                }
            },
            yAxis: {
                position: 'left',
                type: 'category',
                data: ['妇产科','外科','内科','耳鼻喉科','骨科','肿瘤科'],
                axisLabel: {
                    show: false
                }
            },
            series: [
                {
                    itemStyle: {
                        normal: {
                            color: '#00ADA7'
                        }
                    },
                    name: '平均等待时长/min',
                    type: 'bar',
                    data: (function() {
                        var data = [];
                        for (var i = 0; i < 6; i++) {
                            data.push(~~(Math.random() * 20+10));
                        }
                        return data;
                    }())
                }
            ]
        };
        var option_2 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['当前等待人数/位'],
                textStyle: {
                    color: '#FFF',
                    fontSize: 12,
                }
            },
            grid: {
                left: '7%',
                right: '1%',
                bottom: '3%',
                top: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLabel: {
                    textStyle: {
                        color: 'white'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#40404A']
                    },
                }
            },
            yAxis: {
                type: 'category',
                data: ['妇产科','外科','内科','耳鼻喉科','骨科','肿瘤科'],
                axisLabel:{
                    textStyle: {
                        color: 'white'
                    },
                    margin: 20
                }
            },
            series: [
                {
                    itemStyle: {
                        normal: {
                            color: '#FCA134'
                        }
                    },
                    name: '当前等待人数/位',
                    type: 'bar',
                    data: (function() {
                        var data = [];
                        for (var i = 0; i < 6; i++) {
                            data.push(~~(Math.random() * 20));
                        }
                        return data;
                    }())
                }
            ]
        };
        var chart_1 = echarts.init(dom_1);
        var chart_2 = echarts.init(dom_2);
        chart_1.setOption(option_1);
        chart_2.setOption(option_2);

        setInterval(function() {
            var data0 = option_1.series[0]['data'];
            var data1 = option_2.series[0]['data'];
            var newData0 = [], newData1 = [];
            for (var i = 0; i < data0.length; i++) {
                newData0.push(data0[i] + data0[i] * 0.01);
                newData1.push(data1[i] + data1[i] * 0.01)
            }
            option_1.series[0]['data'] = newData0;
            option_2.series[0]['data'] = newData1;
            chart_1.setOption(option_1);
            chart_2.setOption(option_2);
        }, 2000);
    }());
    /*
        圆形水波占比
    */
    (function() {

        var dom = document.getElementById("J_circle_ratio2");
        var circle = new CircleWater(dom);
        circle.setOption({
            name:'名称',
            radius: 30,
            ratio:[[0.5, "12"],[0.5, "12"]],
            legend:{
                '#00A9A7': '开放',
                '#FFFFFF': '闲置'
            }
        });
    }());
    /*
        横向滚动
    */
    (function(){
        var width = $("#marquee").width();
        $(".list-item-li").css("width", width/3 + 'px');
        $('#marquee').kxbdSuperMarquee({
            distance: width/3,
            time:3,
            btnGo:{left:'#goL',right:'#goR'},
            direction:'left'
        });
    }());
}());

var roll = new Rolling();
$(".roll-sign").on("adjustHeight", function(){
    var rowH = $(".list-item-ls").height();
    var boxH = $(".roll-sign").height();
    var count = $(".roll-sign").children().size();
    var contentH = rowH * count;
    if (contentH > boxH) {
        roll.running($(".roll-sign"));
    } else {
        roll.stop();
    }
})
.trigger("adjustHeight");
// 列表滚动
function Rolling(){
    this.status = true;
    this.running = function(jq, height){   
        var self = this;
        var child = jq.children().eq(0)[0];
        var childHeight = child.clientHeight;
        (function animateRe(){
            jq.animate({
                top: height || -(+childHeight)+'px',
            },
            2000, 
            function(){
                jq.css("top", "0px");
                var ele = jq.children().eq(0);
                jq.append(ele);
                if(self.status){
                    animateRe();
                }
            });
        }());
    };
    this.stop = function(){
        this.status = false;
    }
}
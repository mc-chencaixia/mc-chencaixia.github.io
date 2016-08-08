'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
  	.controller('HomeCtrl', function ($scope, $http, $timeout, $interval) {  		
  		$scope.init = function(){
            $scope.chart1 = echarts.init(document.getElementById('J_chart1'));

            $scope.chart1.showLoading({
                text: '正在努力的读取数据中...',    //loading话术
            });
  			$scope.option1 = {
                backgroundColor: '#031428',
                color: ['gold','aqua','lime'],
                title : {
                    text: '复制链路监控',
                    subtext:'数据中心',
                    x:'center',
                    textStyle : {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: '{b}'
                },
                legend: {
                    orient: 'vertical',
                    x:'left',
                    data:['北京'],
                    selectedMode: 'single',                    
                    textStyle : {
                        color: '#fff'
                    }
                },
                toolbox: {
                    show : false,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                dataRange: {
                    min : 0,
                    max : 100,
                    calculable : true,
                    color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
                    textStyle:{
                        color:'#fff'
                    }
                },
                animationDurationUpdate: 2000, // for update animation, like legend selected.
                series : [
                    {
                        name: '北京',
                        type: 'map',
                        roam: false,
                        hoverable: false,
                        mapType: 'china',
                        itemStyle:{
                            normal:{
                                borderColor:'rgba(255,255,255,1)',
                                borderWidth:0.5,
                                areaStyle:{
                                    color: '#031428'
                                }
                            }
                        },
                        data:[],
                        geoCoord: {
                            '上海': [121.4648,31.2891],
                            '广州': [113.5107,23.2196],
                            '北京': [116.4551,40.2539]
                        },
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    label: {
                                        show: false
                                    },
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : [
                                [{name:'北京', smoothness:0.2}, {name:'广州',value:95}],
                                [{name:'北京', smoothness:0.3}, {name:'广州',value:90}],
                                [{name:'北京', smoothness:0.4}, {name:'广州',value:80}],
                                [{name:'北京', smoothness:0.5}, {name:'广州',value:70}],
                                [{name:'北京', smoothness:0.6}, {name:'广州',value:60}],
                                [{name:'广州', smoothness:0.2}, {name:'北京',value:50}],
                                [{name:'广州', smoothness:0.3}, {name:'北京',value:40}],
                                [{name:'广州', smoothness:0.4}, {name:'北京',value:30}],
                                [{name:'广州', smoothness:0.5}, {name:'北京',value:20}],
                                [{name:'广州', smoothness:0.6}, {name:'北京',value:10}]
                            ]
                        }
                    }
                ]
            };
	        $scope.getChart1Data();
	         
  		}; 		
  		
  		$scope.getChart1Data = function(){   
	        $timeout($scope.getData1Suc,500);
	        
  		};
  		
  		
  		
  		$scope.getData1Suc = function( data ){  			
  			// console.log('test');
  			$scope.chart1.hideLoading(); 			
  			$scope.renderChart1();
  		}
  		
  		
  		
	    $scope.renderChart1 = function(){
	        // 使用刚指定的配置项和数据显示图表。
	        $scope.chart1.setOption($scope.option1);	        
	    }
	    	    
	    
	    
	    
	    
	    /*
		* 公共请求处理函数
  		*
  		*/
  		$scope.ajaxInfo = function( config , fnSuccess, fnFail ) {
  			if(!config || !config.url || '' == config.url){
  				console.log('ajax config error');
  				return false;
  			}
  			$http({
			  	method: config.method || 'get',
			  	data: config.data || '',
			  	params: config.data || '',
			  	responseType: config.responseType || 'text',
			  	url: config.url
			}).success(function(data,header,config,status){
				if( fnSuccess ){
					fnSuccess(data);
				}else{
					console.log(data);
				}
			}).error(function(data,header,config,status){
				if( fnFail ){
					fnFail(status);
				}else{
					console.log(status);
				}
			});
  		}

  		$scope.apply = function() {
			if(!$scope.$$phase) {
			    $scope.$apply();
			}
		}
  	});


angular.module('myappApp')
    .controller('Home1Ctrl', function ($scope, $http, $timeout, $interval) {         
        $scope.init = function(){
            $scope.chart1 = echarts.init(document.getElementById('J_chart1'));

            $scope.chart1.showLoading({
                text: '正在努力的读取数据中...',    //loading话术
            });
            $scope.option1 = {
                backgroundColor: '#031428',
                color: ['gold','aqua','lime'],
                title : {
                    text: '复制链路监控',
                    subtext:'北京网省数据',
                    x:'center',
                    textStyle : {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: '{b}'
                },
                toolbox: {
                    show : false,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                animationDurationUpdate: 2000, // for update animation, like legend selected.
                series : [
                    {
                        name: '北京',
                        type: 'map',
                        roam: false,
                        hoverable: false,
                        mapType: '北京',
                        itemStyle:{
                            normal:{
                                borderColor:'rgba(100,149,237,1)',
                                borderWidth:0.5,
                                areaStyle:{
                                    color: '#031428'
                                }
                            }
                        },
                        data:[],
                        geoCoord: {
                            '上海': [117.4551,39.9891],
                            '广州': [116.9500,39.4900],
                            '北京': [116.4551,40.2539]
                        },
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    label: {
                                        show: false
                                    },
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : [
                                [{name:'北京', smoothness:0.1}, {name:'广州',value:95}],
                                [{name:'北京', smoothness:0.3}, {name:'广州',value:90}],
                                [{name:'北京', smoothness:0.4}, {name:'广州',value:80}],
                                [{name:'北京', smoothness:0.5}, {name:'广州',value:70}],
                                [{name:'北京', smoothness:0.6}, {name:'广州',value:60}],
                                [{name:'北京', smoothness:0.2}, {name:'上海',value:50}],
                                [{name:'北京', smoothness:0.3}, {name:'上海',value:40}],
                                [{name:'北京', smoothness:0.4}, {name:'上海',value:30}],
                                [{name:'北京', smoothness:0.5}, {name:'上海',value:20}],
                                [{name:'北京', smoothness:0.6}, {name:'上海',value:10}]
                            ]
                        }
                    }
                ]
            };
            $scope.getChart1Data();
             
        };      
        
        $scope.getChart1Data = function(){   
            $timeout($scope.getData1Suc,500);
            
        };
        
        
        
        $scope.getData1Suc = function( data ){              
            console.log('test');
            $scope.chart1.hideLoading();            
            $scope.renderChart1();
        }
        
        
        
        $scope.renderChart1 = function(){
            // 使用刚指定的配置项和数据显示图表。
            $scope.chart1.setOption($scope.option1);            
        }
                
        
        
        
        
        /*
        * 公共请求处理函数
        *
        */
        $scope.ajaxInfo = function( config , fnSuccess, fnFail ) {
            if(!config || !config.url || '' == config.url){
                console.log('ajax config error');
                return false;
            }
            $http({
                method: config.method || 'get',
                data: config.data || '',
                params: config.data || '',
                responseType: config.responseType || 'text',
                url: config.url
            }).success(function(data,header,config,status){
                if( fnSuccess ){
                    fnSuccess(data);
                }else{
                    console.log(data);
                }
            }).error(function(data,header,config,status){
                if( fnFail ){
                    fnFail(status);
                }else{
                    console.log(status);
                }
            });
        }

        $scope.apply = function() {
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        }
    });

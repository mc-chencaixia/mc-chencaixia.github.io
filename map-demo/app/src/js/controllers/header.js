angular.module('myappApp')
  	.controller('NavCtrl', function ($scope, $location) {
  		$scope.pathStr = '';
	   	$scope.init = function () {
	    	$scope.pathStr = $location.path();
	    	//console.log($scope.pathStr);
	    	// 页面跳转后自动清除定时刷新，节省浏览器资源
	        $('body').on('click','.nav li', function(){	        	
	        	if($scope.stopRefresh){
	        		$scope.stopRefresh();	
	        	}	        	
	        })
	    };
  	});
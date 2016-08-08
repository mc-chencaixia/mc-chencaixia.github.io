'use strict';

/**
 * @ngdoc overview
 * @name myappApp
 * @description
 * # myappApp
 *
 * Main module of the application.
 */
angular
  .module('myappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
    	.when('/', {
			redirectTo: '/home',
		})
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl'
		})
		.when('/home1', {
			templateUrl: 'views/home1.html',
			controller: 'Home1Ctrl'
		})
		.when('/setAutoFoundReg', {
			templateUrl: 'views/autoFound/setReg.html',
			controller: 'SetRegCtrl',
		})
		.when('/setAutoFoundJob', {
			templateUrl: 'views/autoFound/setAuto.html',
			controller: 'SetAutoCtrl',
		})
		.when('/autoDetail', {
			templateUrl: 'views/autoFound/autoDetail.html',
			controller: 'AutoDetailCtrl',
		})
		.when('/setSource', {
			templateUrl: 'views/setSource/setSource.html',
			controller: 'SourceCtrl',
		})
		.when('/setTrans', {
			templateUrl: 'views/setTrans/setTrans.html',
			controller: 'TransCtrl'
		})
		.when('/setJob', { //脱敏调度
			templateUrl: 'views/setJob/setJob.html',
			controller: 'JobCtrl'
		})
		.when('/curJob', { //作业监控（当前作业列表）
			templateUrl: 'views/jobs/curJobList.html',
			controller: 'ListCtrl'
		})		
		.when('/jobDetail', { //当前作业详情
			templateUrl: 'views/jobs/jobDetail.html',
			controller: 'ListCtrl'
		})
		.when('/job', { //单个作业（带id参数为单个作业，不带为所有作业）
			templateUrl: 'views/jobs/jobList.html',
			controller: 'ListCtrl'
		})
		.when('/jobList', { //历史作业（带id参数为单个作业，不带为所有作业）
			templateUrl: 'views/jobs/jobList.html',
			controller: 'ListCtrl'
		})
		.when('/logs', { //运行记录
			templateUrl: 'views/jobs/logs.html',
			controller: 'ListCtrl'
		})
		.when('/errLogs', { //错误日志
			templateUrl: 'views/jobs/errLogs.html',
			controller: 'ListCtrl'
		})
		.when('/sourceDetail', {
			templateUrl: 'views/detail/sourceDetail.html',
			controller: 'DetailCtrl',
		})
		.when('/targetDetail', {
			templateUrl: 'views/detail/targetDetail.html',
			controller: 'DetailCtrl',
		})
		.when('/maskerDetail', {
			templateUrl: 'views/detail/maskerDetail.html',
			controller: 'DetailCtrl',
		})
		.when('/404', {
			templateUrl: '404.html',
			controller: ''
		})
		.otherwise({
			redirectTo: '/404',
		});
  });

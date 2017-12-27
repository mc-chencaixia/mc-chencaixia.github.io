require.config({
	baseUrl:'lib',
	paths:{
		'jquery':'jquery/jquery-min',
		'bootstrap':'bootstrap/bootstrap.min',
		'underscore':'underscore/underscore-min',
		'backbone':'backbone/backbone-min',
		'echarts':'echarts/echarts.min',
		'text': 'requirejs/text',
		'json': 'requirejs/json',
		'main': '../js/main'
	},
	shim:{
		'backbone':{
			deps:['jquery','underscore'],
			exports:'Backbone'
		},
		'mapv':{
			deps:['jquery','bmap'],
			exports:'Mapv'
		},
		'bootstrap':{
			deps:['jquery']
		},
		'jquery':{
			exports:'$'
		}
	}
});
require([
	'jquery',
	'backbone',
	'bootstrap',
	'main',
	],
	function($, Backbone){
		Backbone.history.start();
	}
);

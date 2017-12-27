define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
	var router = Backbone.Router.extend({
		routes:{
			""              	: "home",
			"home" 				: "home",
			"monitor"    		: "monitor",
			"analysisMonitor" 	: "analysisMonitor",
			"targetInside"  	: "targetInside"
		}
	});
	return router;
})
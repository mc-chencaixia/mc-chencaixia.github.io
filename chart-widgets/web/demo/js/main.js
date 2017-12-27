define(['../js/routes/mainRoutes'], function(Route){
	var route = new Route();
	route.on("route:home", function(){
		console.log("home");
	})
})
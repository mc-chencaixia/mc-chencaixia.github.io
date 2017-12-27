var monitor = {
	// 取监控屏上部的数据
	getMonitorTopData: function(){
		var url = '/getDataCountInfo.public',
		method = 'get',
		param = {
			hospitalName: '义亭中心卫生院',
		},
		fnSuccess = function(data){
			for(var i=0;i<data.length;i++){
				switch (i){
					case 0:
					  (function(obj){
					  	$(".mot-rens-ruy").text(commUtil.thousandBitSeparator(obj['indexCount']));

					  }(data[i]));
					  break;
					case 1:
					  (function(obj){
					  	$(".mot-rens-chuy").text(commUtil.thousandBitSeparator(obj['indexCount']));
					  }(data[i]));
					  break;
					case 2:
					  (function(obj){
					  	//$(".mot-rens-hej").text(commUtil.thousandBitSeparator(obj['indexCount']));
					  	var count = commUtil.thousandBitSeparator(obj['indexCount']);
					  	$(".mot-rens-hej").createNumHtml({num: count});
					  }(data[i]));
					  break;
					case 3:
					  (function(obj){
					  	var count = commUtil.thousandBitSeparator(obj['indexCount']);
					  	$(".mot-renc-hej").createNumHtml({num: count});
					  }(data[i]));
					  break;
					case 4:
					  (function(obj){
					  	$(".mot-feiy-chuf").text(commUtil.thousandBitSeparator(obj['indexCount']));
					  }(data[i]));
					  break;
					case 5:
					  (function(obj){
					  	$(".mot-feiy-yil").text(commUtil.thousandBitSeparator(obj['indexCount']));
					  }(data[i]));
					  break;
					case 6:
					  (function(obj){
					  	var count = commUtil.thousandBitSeparator(obj['indexCount']);
					  	$(".mot-feiy-zhuy").createNumHtml({num: count});
					  }(data[i]));
					  break;
					case 7:
					  (function(obj){
					  	$(".mot-renc-zjia").text(commUtil.thousandBitSeparator(obj['indexCount']));
					  }(data[i]));
					  break;
					case 8:
					  (function(obj){
					  	$(".mot-renc-put").text(commUtil.thousandBitSeparator(obj['indexCount']));
					  }(data[i]));
					  break;
					case 9:
					  (function(obj){
					  	var count = commUtil.thousandBitSeparator(obj['indexCount']);
					  	$(".mot-zzhen-hej").createNumHtml({num: count});
					  }(data[i]));
					  break;
				}
			}
			var count = commUtil.thousandBitSeparator(data[5]['indexCount'] + data[6]['indexCount']);
			$(".mot-feiy-hej").createNumHtml({num: count});
		};
		commUtil.postData(url, method, param, fnSuccess);
	},
	getMonitorBottomData: function(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'jk_ylsj',
		},
		fnSuccess = function(data){
			var template = _.template($("#J_event_warning").html());
			var indexCount = 0;
			$("#J_event_content").empty();
			for (var i = 0; i<data.length; i++) {
				var date = new Date(data[i]['RQ']);
				var hour = date.getHours();
				var minute = date.getMinutes();
				var obj = {
					type: data[i]['LX'],
					content: data[i]['NR'],
					month: date.toString().substring(4,7),
					day: date.getDay(),
					time: hour+":"+minute,
					index: i,
				};
				$("#J_event_content").append(template(obj));
			}	
			clearInterval(int_event);
			int_event = setInterval(function(){
				$("section").animate({  
					// opacity:0,
					top:-84*(indexCount+1)+'px',
					//padding:0,
					//margin:0,
				}, 2000, callBack);
				function callBack(){
					$("section").eq(indexCount).addClass("active");
				}
				indexCount ++;
				if(indexCount>= data.length){
					indexCount = 0;
					monitor.getMonitorBottomData();
				}
			},2100);	
		};
		commUtil.postData(url, method, param, fnSuccess);
	},
	getMonitorRadarYes: function(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'jk_zbld1',
		},
		fnSuccess = function(data){
			$('#J_monitor_yes').empty();
			for (var i = 0; i < data.length; i++) {
				var name = data[i]['KPIname'];
				var content = '<a href="#" class="list-group-item"><%=obj["name"]%></a>';
				var template = _.template(content);
				$('#J_monitor_yes').append(template({name:name}))
			}
			/*
			var radarCount = 0;
			clearInterval(int_radar);
			int_radar = setInterval(function(){
				$("#J_monitor_yes .list-group-item").animate({  
					// opacity:0,
					top:-40*(radarCount+1)+'px',
					//padding:0,
					//margin:0,
				}, 2000, callBack);
				function callBack(){
					// $("section").eq(radarCount).addClass("active");
				}
				radarCount ++;
				if(radarCount>= data.length){
					radarCount = 0;
					monitor.getMonitorRadarYes();
				}
			},1800);
			*/
		};
		commUtil.postData(url, method, param, fnSuccess);
	},
	getMonitorRadarNo: function(){
		var url = '/getBIEEData.public',
		method = 'get',
		param = {
			jkName: 'jk_zbld2',
		},
		fnSuccess = function(data){
			$('#J_monitor_no').empty();
			function fillData(){
				for (var i = 0; i < 6; i++) {
					var name = data[i]['KPIname'];
					var content = '<div class="col-md-6 list-orange"><a href="#" class="list-group-item"><%=obj["name"]%></a></div>';
					var template = _.template(content);
					$('#J_monitor_no').append(template({name: name}))
				}
				leftFlow();
			}
			fillData();
			function leftFlow(){
				var length = $("#J_monitor_no").children().size();
				if(length){
					$("#J_monitor_no").children().first().animate({'left':'-600px'}, 2000, function(){
						$("#J_monitor_no").children().first().remove();
						leftFlow();
					})
				}else{
					fillData();
				}
			}
		};
		commUtil.postData(url, method, param, fnSuccess);
	}
}
var int_event, int_radar;
commUtil.init();
for(var m in monitor){
	monitor[m]();
}
$(function(){
	(function(){
		var dom = $(".zhibiao-top")[0];
		var radar = new Radar(dom);
		radar.setOption({
			normal:[[23, 24],[65,23],[40,-30],[-45,-36],[-30,30]],
			error:[[12,56],[21,-56],[33,33],[-22,-22],[-23,33]]
		});
	}())

})
var numberTrans = {
	createNumHtml: function(args){
		var tmp = '<div class="list-group list-group-nw">\
			<a href="javascript:void(0)" class="list-group-item list-item-se">0</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">1</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">2</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">3</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">4</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">5</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">6</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">7</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">8</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">9</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">,</a>\
			<a href="javascript:void(0)" class="list-group-item list-item-se">&nbsp;</a>\
		</div>';
		var strArr = args['num'].split("");
		this.empty();
		this.append('<div></div>');
		this.children().css("height", "100%");
		this.children().css("float", "left");
		this.children().css("height", "40px");
		this.children().css("overflow", "hidden");
		var strArr = args['num'].split("");
		for(var i=0;i<strArr.length;i++){
			this.children().append(tmp);
		}
		this.filter(".list-item-se").css("height", "40px");
		this.children().append('<div style="clear:both"></div>');
		var ch = this.children().width();
		var th = this.width();
		this.children().css("margin-left", (th-ch)/2 + 'px');
		var orderNum = [];
		for(var i=0;i<strArr.length;i++){
			var index = 0;
			if(strArr[i] == ','){
				index = 10;
			}else{
				index = +strArr[i];
			}
			orderNum.push(index);
			var h = this.children().height();
			this.children().children().eq(i).animate({top: -index*h+'px'}, index*250);
		}
		this.attr("data-cache", args['num']);
	},
	changeNum: function(num){
		var oldNum = this.attr("data-cache");
		var newArr = num.split('');
		var oldArr = oldNum.split('');
		if(newArr.length != oldArr.length){
			this.createNumHtml({num: num});
			return;
		}
		for(var i=0;i<newArr.length;i++){
			var index = 0;
			if(newArr[i] == ","){
				var tIndex = 10;
				if(oldArr[i] != ","){
					index = tIndex - (+oldArr[i]);
				}
			}else{
				if(oldArr[i] != ","){
					index = (+newArr[i] - +oldNum[i]);
				}else{
					index = (+newArr[i] - 10);
				}
			}
			var h = this.children().height();
			var top = +this.children().children().eq(i).css("top").slice(0, -2);
			this.children().children().eq(i).animate({top: -index*h+top + 'px'}, Math.abs(index)* 250);
		}
	}
}
$.fn.extend(numberTrans);

setTimeout(function(){
	$(".mot-feiy-hej").changeNum("21,184");
}, 3000);
setTimeout(function(){
	$(".mot-feiy-hej").changeNum("21,234");
}, 6000);
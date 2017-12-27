var Radar;
!function(){
"use strict";
function RadarChart(dom){
	this._init(dom);
}
RadarChart.prototype = {
	_height_: 0,
	_width_: 0,
	_ctx_: null,
	_idAnimate_: null,
	_option_: {
		speed: 1,
		area: 0.125
	},
	_init: function(dom){
		this._height_ = dom.clientHeight;
		this._width_ = dom.clientWidth;
		var padding_left = getComputedStyle(dom)['padding-left'];
		var padding_right = getComputedStyle(dom)['padding-right'];
		var padding_top = getComputedStyle(dom)['padding-top'];
		var padding_bottom = getComputedStyle(dom)['padding-bottom'];
		padding_left = +padding_left.substring(0, padding_left.length-2);
		padding_right = +padding_right.substring(0, padding_right.length-2);
		padding_top = +padding_top.substring(0, padding_top.length-2);
		padding_bottom = +padding_bottom.substring(0, padding_bottom.length-2);
		var canvas = document.createElement("canvas");
		canvas.height = this._height_ - padding_top - padding_bottom;
		canvas.width = this._width_ - padding_left - padding_right;
		dom.appendChild(canvas);
		this._ctx_ = canvas.getContext("2d");
	},
	/*
		option:{
			speed: 1,
			area: 0.125
		}
	*/
	_setOption: function(option){
		for(var i in option){
			this._option_[i] = option[i];
		}
		this._draw();
	},
	_draw: function(){
		var self = this;
		var ctx = self._ctx_;
		var time = 0;
		var radius = self._width_ <= self._height_ ? (self._width_-40)/2 : (self._height_-40)/2;
		var center = {
			x: self._width_/2,
			y: self._height_/2
		}
		cancelAnimationFrame(self._idAnimate_);
		drawAnimate();
		function drawAnimate(){
			ctx.clearRect(0, 0, self._width_, self._height_);
			// 绘制环状
			for(var i=1;i<=3;i++){
				ctx.beginPath();
				ctx.arc(center.x, center.y, radius*i/3, 0, 2*Math.PI);
				ctx.strokeStyle = "rgba(0,181,173,.9)";
				ctx.lineWidth = 1;
				ctx.stroke();
				ctx.restore();
			}
			// 绘制区域分割线
			for(var i=1;i<=8;i++){
				ctx.beginPath();
				ctx.moveTo(center.x, center.y);
				ctx.arc(center.x, center.y, radius, (i-1)*2*Math.PI/8, i*2*Math.PI/8, true);
				ctx.lineWidth = 0.2;
				ctx.closePath();
				ctx.stroke();
				ctx.restore();
			}
			var offset = 2*Math.PI/8;
			var start =  (time%360)*Math.PI/180;
			var end = start + offset;
			// console.log("start:" + start);
			// console.log("end:" + end);
			// console.log("offset: " + offset);
			ctx.beginPath();
			ctx.moveTo(center.x, center.y);
			ctx.arc(center.x, center.y, radius, start, end);
			ctx.closePath();
			ctx.fillStyle = 'rgba(0,181,173,.3)';
			ctx.fill();
			ctx.restore();
			time += +self._option_['speed'];
			
			/*
			var msAngle = start>Math.PI ? 2*Math.PI-start : start;
			var mdAngle = end>Math.PI ? 2*Math.PI-end : end;
			*/
			// 绘制点
			drawPOint(start, end);
			
			self._idAnimate_ = requestAnimationFrame(function(){
				drawAnimate();
			});
		}
		function drawPOint(start, end){
			var normal = self._option_['normal'],
			error = self._option_['error'];
			var temp = normal.concat(error);
			var maxRadius = 0;;
			// 求最大半径;
			for(var i in temp){
				var tR = Math.sqrt(temp[i][0]*temp[i][0] + temp[i][1]*temp[i][1]);
				if(maxRadius <= tR){
					maxRadius = tR; 
				}
			}
			// 转化率
			var rat = radius/maxRadius;
			// 坐标转换
			for(var m=0;m<normal.length;m++){
				var x = normal[m][0]*rat,
				y = normal[m][1]*rat;
				ctx.beginPath();
				ctx.arc(x+center.x, center.y-y,2,0,2*Math.PI);
				ctx.fillStyle = "#000";
				ctx.fill();
				ctx.closePath();
				ctx.restore();
			}
			for(var n=0;n<error.length;n++){
				var x = error[n][0]*rat,
				y = error[n][1]*rat,
				angle = Math.acos(x/Math.sqrt(x*x+y*y)),
				r = 2;
				if(y>0){
					angle  = 2*Math.PI - angle;
				}
				if(end > start && angle>start && angle<end){
					ctx.fillStyle = "red";
					r = 4;

				}else{
					ctx.fillStyle = "#000";
				}
				ctx.beginPath();
				ctx.arc(x+center.x, center.y-y,r,0,2*Math.PI);
				//ctx.fillStyle = "#000";
				ctx.fill();
				ctx.closePath();
				ctx.restore();
			}
			
		}
	},
	setOption: function(option){
		this._setOption(option);
	}
}
Radar = RadarChart; 
}()
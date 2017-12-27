function CircleWater(dom){
	this._init(dom);
}
CircleWater.prototype = {
	_init: function(dom){
		this._height_ = dom.clientHeight;
		this._width_ = dom.clientWidth;
		var padding_left = getComputedStyle(dom)['padding-left'];
		var padding_right = getComputedStyle(dom)['padding-right'];
		var padding_top = getComputedStyle(dom)['padding-top'];
		var padding_bottom = getComputedStyle(dom)['padding-bottom'];
		padding_left = +padding_left.substr(0, padding_left.length-2);
		padding_right = +padding_right.substr(0, padding_right.length-2);
		padding_top = +padding_top.substr(0, padding_top.length-2);
		padding_bottom = +padding_bottom.substr(0, padding_bottom.length-2);
		var canvas = document.createElement("canvas");
		canvas.height = this._height_ - padding_top - padding_bottom;
		canvas.width = this._width_ - padding_left - padding_right;
		dom.appendChild(canvas);
		this._ctx_ = canvas.getContext("2d");
		this._cvHeight = canvas.height;
		this._cvWidth = canvas.width;
	},
	_draw: function(){
		var self = this;
		var ctx = self._ctx_,
			height = self._cvHeight,
			width = self._cvWidth,
			center,
			radius;
		ctx.clearRect(0, 0, height, width);
		center = {
			x: width/2,
			y: height/2 - height/12
		};
		radius = self._option['radius'];
		ctx.beginPath();
		ctx.lineWidth = 6;
		ctx.strokeStyle = "#1FB5AD";
		ctx.arc(center.x, center.y, radius, 0, 2*Math.PI);
		ctx.fillStyle = "#fff";
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
		ctx.restore();

		var item1 = this._option['ratio'][0];
		var item2 = this._option['ratio'][1];
		var ratio1 = item1[0];
		var text1 = item1[1];
		var text2 = item2[1];

		var det = 0.5 - ratio1; // 相对于0刻度线的位置;

		var start = det/2;
		var end =  ratio1 + det/2;
		x = radius*Math.cos(-start*Math.PI*2);
		y = radius*Math.sin(-start*Math.PI*2);
		var rvt = y/6;
		if(rvt == 0){
			rvt  = radius*0.1;
		}
		ctx.beginPath();
		ctx.arc(center.x, center.y, radius, start*2*Math.PI, end*2*Math.PI);
		ctx.moveTo(center.x-x, center.y-y);
		ctx.quadraticCurveTo(center.x-x/2, center.y-y-rvt, center.x, center.y - y);
		ctx.quadraticCurveTo(center.x+x/2, center.y-y+rvt, center.x+x, center.y - y);
		ctx.closePath();
		ctx.fillStyle = "#1FB5AD";
		ctx.fill();
		ctx.restore();
		ctx.fillStyle = "#fff";
		ctx.font="13px Arial";
		ctx.textBaseline="middle";
		ctx.textAlign="center";
		ctx.fillText(text1, center.x, center.y + (radius-y)/2);
		ctx.fillStyle = "#222";
		ctx.fillText(text2, center.x, center.y - (radius+y)/2);


		// title
		// var title = this._option['title'];
		// ctx.fillStyle = title.color;
		// ctx.fillText(title.text, center.x, title.top);
		var legend = this._option['legend'];
		var m=0;
		ctx.textAlign = "left";
		ctx.font = "12px Arial";
		for(var leg in legend){
			if(m%2 == 0){
				ctx.fillStyle = leg;
				ctx.fillRect(center.x-radius-10, center.y+1.5*radius-5 ,10,10);
				ctx.fillText(legend[leg], center.x-radius, center.y+1.5*radius);
			}else{
				ctx.fillStyle = leg;
				ctx.fillRect(center.x+radius/2-10, center.y+1.5*radius-5 ,10,10);
				ctx.fillText(legend[leg], center.x+radius/2, center.y+1.5*radius);
			}
			m++;
		}

	},
	quadraticInOut: function (k) {
		if ((k *= 2) < 1) { return 0.5 * k * k; }
		return -0.5 * (--k * (k - 2) - 1);
	},
	_setOption: function(option){
		var opt = this._option || {};
		this._option = this.extend(opt, option);
	},
	/*
		{
			name:'名称',
			radius: '半径',
			ratio:[[0.5, "shabi"],[0.5, "aya"]]
		}
	*/
	setOption: function(option){
		this._setOption(option);
		this._draw();
	},
	extend: function(dest, src){
	    var _complete,
	    _extend,
	    _isObject;
	    _isObject = function(o){
	        return (Object.prototype.toString.call(o) === '[object Object]' || Object.prototype.toString.call(o) === '[object Array]');
	    },
	    _extend = function self(destination, source) {
	        var property;
	        for (property in destination) {
	            if (destination.hasOwnProperty(property)) {

	                // 若destination[property]和sourc[property]都是对象，则递归
	                if (_isObject(destination[property]) && _isObject(source[property])) {
	                    self(destination[property], source[property]);
	                };

	                // 若sourc[property]已存在，则跳过
	                if (source.hasOwnProperty(property)) {
	                    continue;
	                } else {
	                    source[property] = destination[property];
	                }
	            }
	        }
	    },
	    _complete = function(){
	        var arr = arguments,
	            result = {},
	            i;

	        if (!arr.length) return {};

	        for (i = arr.length - 1; i >= 0; i--) {
	            if (_isObject(arr[i])) {
	                _extend(arr[i], result);
	            };
	        }

	        arr[0] = result;
	        return result;
	    };
	    return _complete(dest, src);
	}
}
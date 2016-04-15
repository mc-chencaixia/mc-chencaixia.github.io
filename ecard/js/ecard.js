/**
 * ecard.js
 * atuhor: chencx@mchz.com.cn
 * date: 2016.04.15
 * description: 生成邮件签名图片
 */

$(function() {
	var canvas = document.getElementById('J_canvas');
	var ctx = canvas.getContext('2d');
	var imgObj = document.getElementById('J_imgBg');
	var iptObjs = $('input');
	var formObj = $('form');
	var btnOk = $('#J_btnOk');
	var btnRst = $('#J_btnRst');
	var posMap = {
		'name':{x: 10, y: 30, fontsize:'24px', color:'#5f5d5d'},
		'title':{x: 85, y: 25},
		'phone':{x: 220, y: 28, fontsize:'18px', color:'#5f5d5d'},
		'telephone':{x: 40, y: 95},
		'email':{x: 40, y: 115},
		'net':{x: 40, y: 139},
		'website':{x: 240, y: 114},
		'blog':{x: 240, y: 93},
		'address':{x: 40, y: 164},
	};
	var defaultInfo = {
			'net':'杭州、广州、南京、武汉、宁波',
			'website':'www.mchz.com.cn',
			'name':'姓名',
			'title':'职位信息',
		};
	var info = {
			'net':'杭州、广州、南京、武汉、宁波',
			'website':'www.mchz.com.cn',
		};
	
	// 画布背景重绘
	var drawBg = function(){
		ctx.drawImage(imgObj, 0, 0);		
	};	
	// 绘制文字
	var drawText = function( text, pos ){
		//console.log(text);
		//console.log(pos);
		if(!text || !pos){
			return false;
		}
		var fs = pos.fontsize || '12px';
		var cl = pos.color || '#898989';
		var font = pos.font || '微软雅黑';
		ctx.font = fs + ' ' + font;
		ctx.fillStyle = cl;
		ctx.fillText(text, pos.x, pos.y);		
	};
	// 获取信息
	var getInfo = function(){
		$.each( iptObjs, function(k,v){
			info[v.id] = v.value || defaultInfo[v.id];
		});
	}
	
	var drawInfo = function(){
		for(var i in info){
			drawText(info[i], posMap[i]);
		}
		var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
		console.log(imgData);
		var dataURL = canvas.toDataURL();
		console.log(dataURL);
		if(dataURL && dataURL != ''){
			btnOk.attr('href',dataURL);
		}
	}
	
	var renderCard = function(){
		drawBg();
		getInfo();
		drawInfo();
	}
	
	formObj.on('blur','input',function(ev){
		var it = ev.currentTarget;
		info[it.id] = it.value;
		//drawText(it.value, posMap[it.id]);
		drawBg();
		drawInfo();
	})
	
	btnOk.on('click',function(){
		console.log('生成图片');
	});
	
	btnRst.on('click',function(){
		formObj[0].reset();
		renderCard();
		
	})
	
	// 初始化
	var init = function(){
		renderCard();
	}
	
	init();
	
});
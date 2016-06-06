/**
 * ecard.js
 * atuhor: chencx@mchz.com.cn
 * date: 2016.04.15
 * description: 生成邮件签名图片
 */

$(function() { 
	var canvas = document.getElementById('J_canvas'),
		ctx = canvas.getContext('2d'),
		imgObj = document.getElementById('J_imgBg'),
		iptObjs = $('input'),
		formObj = $('form'),
		btnOk = $('#J_btnOk'),
		btnRst = $('#J_btnRst'),
		posMap = {
			'name':{x: 0, y: 30, fontsize:'24px', color:'#5f5d5d'},
			'title':{x: 85, y: 29},
			'phone':{x: 260, y: 29, fontsize:'12px', color:'#5f5d5d'},
			'telephone':{x: 40, y: 95},
			'email':{x: 40, y: 115},
			'net':{x: 40, y: 139},
			'website':{x: 240, y: 114},
			'blog':{x: 240, y: 93},
			'address':{x: 40, y: 164},
		},
		defaultInfo = {
			'net':'杭州、北京、广州、武汉、南京、宁波',
			'website':'www.mchz.com.cn',
			'blog':'blog.mchz.com.cn',
			'name':'姓名',
			'title':'职位信息',
			'address':'杭州市拱墅区丰潭路508号天行国际中心7号楼12楼',
		},
		info = {
			'net':defaultInfo.net,
			'website':defaultInfo.website,
			'blog':defaultInfo.blog,
			'name':'',
			'title':'',
			'address':'',
		},
		cookieInfo = {};
		

	// 画布背景重绘
	var drawBg = function(){
		ctx.drawImage(imgObj, 0, 0);		
	};	
	// 绘制文字
	var drawText = function( text, pos ){
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
		//console.log(imgData);
		var dataURL = canvas.toDataURL();
		//console.log(dataURL);
		if(dataURL && dataURL != ''){
			btnOk.attr('href',dataURL);
		}
	}


	var renderCard = function(){
		drawBg();
		getInfo();
		drawInfo();
	}

	var getCookie = function(){
		if(!localStorage){
			return false;
		}		
		var cardInfo = localStorage.getItem('cardInfo');
		if(!cardInfo){
			return false;
		}
		cookieInfo = JSON.parse(cardInfo);
		for(var ck in cookieInfo ){
			if(cookieInfo[ck] != ''){
				$('#'+ ck).val(cookieInfo[ck]);				
			}
		}
	}

	var setCookie = function(){
		if(!localStorage){
			return false;
		}	
		var cardInfo = {
			'name': info.name == '姓名'?'':info.name,
			'title': info.title == '职位信息'?'':info.title,
			'phone': info.phone,
			'email': info.email
		};
		localStorage.setItem('cardInfo', JSON.stringify(cardInfo));
	}
	
	formObj.on('blur','input',function(ev){
		var it = ev.currentTarget;
		info[it.id] = '' == it.value ? defaultInfo[it.id] : it.value;
		//drawText(it.value, posMap[it.id]);
		drawBg();
		drawInfo();
	})
	
	btnOk.on('click',function(){
		//console.log('生成图片');
		setCookie();
	});
	
	btnRst.on('click',function(){
		formObj[0].reset();
		renderCard();
		
	})	
	// 初始化
	var init = function(){
		getCookie();
		renderCard();
	}	
	init();
	
});
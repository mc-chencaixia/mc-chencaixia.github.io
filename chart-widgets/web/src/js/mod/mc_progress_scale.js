/*
 * 医疗可视化平台-进度条组件
 * date：2017-01-04
 * 
 */
var ProgressScale = function(){
	if( !(this instanceof ProgressScale) ){
		return new ProgressScale();
	}	
};

ProgressScale.prototype = $.extend( new MCBASE(), {
		version:'0.0.1',
		init: function(cfg){ 	
			cfg = cfg || {};                
        	cfg.option = cfg.option || {};
        	this.setOption( cfg.option );
	        if( cfg.dom ){
	            this.setDom( cfg.dom );             
	        }
	        if( cfg.clickCallback ){
	            this.setClickCallback( cfg.clickCallback );
	        }  			
		},
		setClickCallback:function( fn ){
			this.clickCallback = fn || null;	
		},
		bindEvent:function(){
			var self = this;
			/* 弹出层信息 */
			var template = '<div id="J_title" style="position: absolute;left:<%=obj["left"]%>px; top:<%=obj["top"]%>px; width:100px;font-size:12px; border: 1px solid #5DCEF8;color:#5DCEF8;text-align: right; background-color:#fff;padding:5px;">\
				<span style="position:absolute; top: -8px; left: 46px; width: 10px; height: 10px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAAXNSR0IArs4c6QAAAHdJREFUCB1jYEAC3Mc+RoIwkhADI5xz5pMI5/f/t0H875yMqgwmfG9AbCYQAQJs3//NypJi4wRhEBsiCiXZjnwIlzvx6fOPf///gzCIDRKDSIOMPvzx/clPf/7DwAkgGyTGAJRjAhmXCTTWjJcZbqo5kA0SA8kBALFuQmaaQu3gAAAAAElFTkSuQmCC) no-repeat center;"></span>\
				<span><%=obj.text%></span>\
			</div>';
			var template2 = '<div id="J_title" style="position: absolute;left:<%=obj["left"]%>px; top:<%=obj["top"]%>px; ;font-size:12px; border: 1px solid #5DCEF8;color:#5DCEF8;text-align: right; background-color:#fff;padding:5px;">\
				<span style="position:absolute; top: -8px; left: <%=obj.text.length*4%>px; width: 10px; height: 10px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAAXNSR0IArs4c6QAAAHdJREFUCB1jYEAC3Mc+RoIwkhADI5xz5pMI5/f/t0H875yMqgwmfG9AbCYQAQJs3//NypJi4wRhEBsiCiXZjnwIlzvx6fOPf///gzCIDRKDSIOMPvzx/clPf/7DwAkgGyTGAJRjAhmXCTTWjJcZbqo5kA0SA8kBALFuQmaaQu3gAAAAAElFTkSuQmCC) no-repeat center;"></span>\
				<span><%=obj.text%></span>\
			</div>';
			this.wrap.off()
			.on('click', '.progress-process', function( ev ){
				var it = ev.currentTarget,
					idx = 0;
				$.each( self.wrap.find('.progress-process') , function( k, v ){
					if( it == v ){
						idx = k;
					};
				});
				if( self.clickCallback ){
					self.clickCallback.call( self, self.data[idx],  this);
				}
			})
			.on('mouseover', '.progress-process', function(ev) {
				var offset = $(this).offset();
				var title = $(this).attr("data-title");
				var obj = {
					text: $(this).attr("data-title"),
					top: offset.top+20,
					left: offset.left + $(this).width()/2 - (title.length*12)
				}
				var html = _.template(template2)(obj);
				$('#J_title').remove();
				$("body").append(html);

			})
			.on('mouseover', '.progress-scale-name', function (ev) {
				var offset = $(this).offset();
				var title = $(this).attr("data-title");
				if(title.length < 6){
					return;
				}
				var obj = {
					text: $(this).attr("data-title"),
					top: offset.top+25,
					left: offset.left
				}
				var html = _.template(template)(obj);
				$('#J_title').remove();
				$("body").append(html);
			})
			.on('mouseout', '.progress-scale-name, .progress-process', function (ev){
				$('#J_title').remove();
			})

		},
		setDom: function( dom ){
			this.wrap = this._setDom( dom );
			if( !this.wrap ){
				console.log('配置项缺失');
				return false;
			}
			this.wrap.addClass('mc-progress');
			this.bindEvent();
			if(this.option.data && this.option.data.length){
				this.render();
			}
		},
		setOption: function( option ){
			option =  _.defaults( option, this.defaultOption);
			this.option = $.extend( this.option, option );
			this.setData(option.data);
		},
		setData: function( data ){
			this.data = this.data || [];
			data =  data || [];
			var newData = [];
			$.each( data, function( k,v ){
				var idx = _.findLastIndex( newData, {'name':v.name});
				v.account = parseInt( v.account );
				v.target = parseInt( v.target );
				if( idx > -1 ){
					newData[idx].account += v.account;
				}else{
					newData.push(v);
				}
			});
			this.data = $.extend( newData, [] );
			if( !this.option ){
				this.option = $.extend( this.defaultOption, {});
			}
			this.option.data = $.extend( newData, [] );

		},
		render: function( data ){
			if( !this.option ){
				this.option = $.extend( this.defaultOption, {});
			}
			console.log(this.option);
			if( !data && !this.data && !this.option.data && !this.option.data.length ){
				this.wrap.html('暂无数据');
				return false;
			}
			//console.log(data);
			var html = '',
				renderData = data ? $.extend( data, []) : $.extend( this.option.data, []);
				self = this;
			data = data ? $.extend( data, [] ) : $.extend( this.option.data, [] );
			$.each( data, function( k, d ){
				d.score = d.score ? parseFloat( d.score ) : 0;
			});
			renderData = _.sortBy( data, 'score' ).reverse();
			var maxScore = renderData[0].score;
			maxScore = (+maxScore).toFixed(0);
			var mlen = maxScore.toString().length;
			if(mlen == 2) {
				maxScore = +maxScore >= 75 ? 100
					: +maxScore >= 50 ? 75
						: +maxScore >= 25 ? 50
							: 25;
			}else if(mlen > 2) {
				var first = +maxScore.toString().slice(1,3);
				maxScore = first >= 75 ? (+maxScore[0] + 1) + maxScore.replace(/\d/g, '0').slice(1)
					: first >= 50 ? maxScore[0] + '75' + maxScore.replace(/\d/g, '0').slice(3)||''
						: first >= 25 ? maxScore[0] + '50' + maxScore.replace(/\d/g, '0').slice(3)||''
							: maxScore[0] + '25' + maxScore.replace(/\d/g, '0').slice(3)||''
			}else if(mlen == 1) {
				maxScore = maxScore < 5 ? 5 : 10;
			}
			maxScore = +maxScore;
			renderData = _.map(renderData, function( d ){
				d.showName = d.name.length > 6 ? d.name.slice(0, 6) + '...' : d.name;
				d.account = d.account ? parseFloat( d.account ) : d.score;
				d.target = d.target ? parseFloat( d.target ) : maxScore;
				d.percent = parseInt( d.account * 100 / d.target );	
				d.percent = d.percent > 100 ? 100 : d.percent;
				d.showScore = self._formateLargeData( d.account );
				return d;
			});

			var scale = [];
			scale.push(0);
			for(var i=1; i<=5; i++) {
				scale.push(Math.ceil(maxScore*i/5))
			}
			scale = _.map(scale, function(d) {
				return self._formateLargeData( d );
			})
			var obj = {
				data: renderData,
				scale: scale
			},
			template = '<div class="mc-progress">\
				<div style="max-height:220px; overflow-y:auto;">\
				<table style="width:100%;">\
					<% for(var i=0;i<data.length;i++){ %>\
					<tr>\
						<td class="progress-scale-name" data-title="<%=data[i]["name"]%>">\
							<span style="font-size:12px;"><%=data[i]["showName"]%></span>\
						</td>\
						<td class="<%= (i==0? "progress-scale-bg-top" : i==data.length-1 ? "progress-scale-bg-bot" : "progress-scale-bg-mid")%>">\
							<div class="pg-bar" style="background-color:initial;">\
								<div class="pg-core progress-process" style="width:<%=data[i].percent%>%;" data-title="<%=data[i]["showScore"]%>"></div>\
							</div>\
						</td>\
					</tr>\
					<% } %>\
				</table>\
				</div>\
				<table style="width:100%;">\
					<tr>\
						<td class="progress-scale-name"></td>\
						<td>\
							<div class="clearfix" style="width: 100%">\
								<div class="progress-scale-wrapper">\
									<div class="progress-scale" style="margin-left:-5px;">0</div>\
								</div>\
								<% for(var i=1;i<scale.length;i++){ %>\
								<%if(i< (scale.length-1)){ %>\
								<div class="progress-scale-wrapper">\
									<div class="progress-scale" style="margin-left:-<%= (scale[i]+"").length*4 %>px;"><%=scale[i]%></div>\
								</div>\
								<% }else{ %>\
								<div style="width:0;float:left;">\
									<div class="progress-scale" style="margin-left:-<%= (scale[i]+"").length*4 %>px;"><%=scale[i]%></div>\
								</div>\
								<% } %>\
								<% } %>\
							</div>\
						</td>\
					</tr>\
				</table>\
			</div>';
			html = _.template(template)(obj);
			this.wrap.html( html );
		},
});
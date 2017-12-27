/*
 * 医疗可视化平台-进度条组件
 * date：2017-01-04
 * 
 */
var ProgressNew = function(){
	if( !(this instanceof ProgressNew) ){
		return new ProgressNew();
	}	
};

ProgressNew.prototype = $.extend( new MCBASE(), {
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
			this.wrap.off()
			.on('click', '.progress-ev-handle', function( ev ){
				var it = ev.currentTarget,
					idx = 0;
				$.each( self.wrap.find('.progress-ev-handle') , function( k, v ){
					if( it == v ){
						idx = k;
					};
				});
				if( self.clickCallback ){
					self.clickCallback.call( self, self.data[idx] );
				}
			})
			.on('mouseover', '.progress-ev-name', function (ev) {
				var offset = $(this).offset();
				var title = $(this).attr("data-title");
				if(title.length < 6){
					return;
				}
				var obj = {
					text: $(this).attr("data-title"),
					top: offset.top+30,
					left: offset.left
				}
				var html = _.template(template)(obj);
				$('#J_title').remove();
				$("body").append(html);
			})
			.on('mouseout', '.progress-ev-name', function (ev){
				$('#J_title').remove();
			})

		},
		/*
		 *  显示指定数列参数可指定显示数据的序号或名称
		 *  params: [ string | int ]
		 */
		/*
		showItems:function( items ){
			if( !items || !items.length ){
				return false;
			}
			var showData = [];
			var self = this;
			$.each( items, function( k, item ){
				if( item >= 0 && self.data[item] ){
					showData.push( self.data[item] );
				}
				if( typeof(item) === 'string' ){
					var idx = _.findLastIndex( self.data, {'name':item} );
					if( idx > -1){
						showData.push( self.data[idx] );
					}
				}				
			});		
			this.render( showData );
		},
		*/
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
			maxScore = renderData[0].score;
			renderData = _.map(renderData, function( d ){
				d.showName = d.name.length > 6 ? d.name.slice(0, 6) + '...' : d.name;
				d.account = d.account ? parseFloat( d.account ) : d.score;
				d.target = d.target ? parseFloat( d.target ) : maxScore;
				d.percent = parseInt( d.account * 100 / d.target );	
				d.percent = d.percent > 100 ? 100 : d.percent;
				d.showScore = self._formateLargeData( d.account );
				return d;
			});
			template = '<div class="mc-progress" max-height="300px;overflow-y:auto;">\
						<table style="width:100%;">\
							<% for(var i in obj){ %>\
							<tr class="progress-ev-handle" style="cursor: pointer; user-select:none;">\
								<td class="progress-ev-name" style="width:100px; text-align:right;" data-title="<%=obj[i]["name"]%>">\
									<span style="font-size:12px;"><%=obj[i]["showName"]%></span>\
								</td>\
								<td class="progress-ev-score" style="padding:10px;" data-title="<%=obj[i]["showScore"]%>">\
									<div class="pg-bar">\
										<div class="pg-core" style="width:<%=obj[i]["percent"]%>%; background-color:#00c1f0;"></div>\
									</div>\
								</td>\
								<td style="width:60px;">\
									<span style="font-size: 12px; color: #2DA98F;"><%=obj[i]["showScore"]%><%=obj[i]["unit"]%></span>\
								</td>\
							</tr>\
							<% } %>\
						</table>\
					</div>';
			html = _.template(template)(renderData);
			this.wrap.html( html );
		},
});
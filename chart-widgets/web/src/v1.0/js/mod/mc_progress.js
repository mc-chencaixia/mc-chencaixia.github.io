/*
 * 医疗可视化平台-进度条组件
 * date：2017-01-04
 * 
 */
var mProgress = function(){
	if( !(this instanceof mProgress) ){
		return new mProgress();
	}	
};

mProgress.prototype = $.extend( new MCBASE(), {
		version:'0.0.1',
		template :'<div class="pg-group">' +
					'<div class="pg-title">' +
						'<span class="float-l">' + '运营效率' + '</span>' +
						'<span class="float-r">' + '56 / 77' + '</span>' +
					'</div>' +
					'<div class="pg-bar">' +
						'<div class="pg-core" style="width:' + '20' + '%; background-color:' + '#233312' + ';"></div>' +
					'</div>' +
				'</div>',
		defaultOption : {
			'colors':['#00c1f0','#1ab293','#dd4b39','#f39c12','#ff6c60','#00f06b'],
			'data': [],
		},
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
			this.wrap.on('click', '.pg-group', function( ev ){
				var it = ev.currentTarget
					idx = 0;
				$.each( self.wrap.find('.pg-group') , function( k, v ){
					if( it == v ){
						idx = k;
					};
				});
				if( self.clickCallback ){
					self.clickCallback( self.data[idx] );
				}else{
					console.log( self.data[idx] );
					self.showItems([idx]); 
				}
			});			

		},
		/*
		 *  显示指定数列参数可指定显示数据的序号或名称
		 *  params: [ string | int ]
		 */
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
		setDom: function( dom ){
			this.wrap = this._setDom( dom );
			if( !this.wrap ){
				console.log('配置项缺失');
				return false;
			}
			this.wrap.addClass('mc-progress');
			this.bindEvent();
			this.render();
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
			$.each( renderData, function( k, d ){
				d.color = self.option.colors[ k % self.option.colors.length ];
				d.percent = parseInt( d.account * 100 / d.target );
				d.showAccount = self._formateLargeData(d.account);
				d.showTarget = self._formateLargeData(d.target);
				html += '<div class="pg-group">' +
							'<div class="pg-title">' +
								'<span class="float-l">' + d.name + '</span>' +
								'<span class="float-r">' + d.showAccount + '/' + d.showTarget + '</span>' +
							'</div>' +
							'<div class="pg-bar">' +
								'<div class="pg-core" style="width:' + d.percent + '%; background-color:' + d.color + ';"></div>' +
							'</div>' +
						'</div>';

			})
			this.wrap.html( html );
		},
});
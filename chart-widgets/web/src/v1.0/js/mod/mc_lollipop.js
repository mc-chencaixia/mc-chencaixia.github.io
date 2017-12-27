/*
/*
 * 医疗可视化平台-进度条组件
 * date：2017-01-04
 * 
 */
var mLollipop = function(){
	if( !(this instanceof mLollipop) ){
        return new mLollipop();
    }
}

mLollipop.prototype = $.extend( new MCBASE(), {
	version:'0.0.1',
	defaultTitleColor :'#000000',
	template : '<div class="lp-group">' +
						'<div class="float-l col-xs-3  lp-title"  title="示例事件">' +
							'<a style="background-color:#00c1f0;"  title="示例事件">示例事件</a>' +
						'</div>' +
						'<div class="float-l lp-lollipop"></div>' +
						'<div class="float-r lp-detail">' +
							'<span title="2017-01-01">2017-01-01</span>' +
							'<span title="显示事件详情">示例事件详情</span>' +
						'</div>' +
					'</div>',
	defaultOption : {
		//'colors':['#00c1f0','#ff6c60','#f39c12'],
		'levelConfig':[{'level':'1','color':'#ff6c60'},
					{'level':'2','color':'#f39c12'},
					{'level':'3','color':'#00c1f0'}
					],
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
		this.wrap.on('click', '.lp-group', function( ev ){
			var it = ev.currentTarget
				idx = 0;
			$.each( self.wrap.find('.lp-group') , function( k, v ){
				if( it == v ){
					idx = k;
				};
			});
			console.log('序号是：' + idx);
			if( self.clickCallback ){
				self.clickCallback(  self.data[idx]  );
			}else{
				// console.log( self.data[idx] );
				self.showItems([idx]); 
			}
		});			

	},	
	on:function( eventType, fnCallback ){
		//console.log( eventType );
		fnCallback && fnCallback();
	},
	drilling:function( idx ){
		console.log('drilling' + idx);
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
		this.wrap.addClass('mc-lollipop');
		this.bindEvent();
		this.render();
	},
	setLevelConfig: function( levelConfig ){
		levelConfig =  levelConfig || {};
		this.option.levelConfig = levelConfig ? $.extend( levelConfig, {} ) : $.extend( defaultLevelConfig, {});
	},
	setOption: function( option ){
		option = _.defaults( option, this.defaultOption );
		this.option = $.extend( this.option, option );
		this.setData(option.data);
	},
	setData: function( data ){
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
		this.option.data = $.extend( newData, [] );
	},
	render: function( data ){
		if( !this.option || !this.option.data ){
			this.option = $.extend( defaultOption, {});
		}
		if( !data && !this.data && !this.option.data && !this.option.data.length ){
			this.wrap.html('暂无数据');
			return false;
		}
		var html = '',
			renderData = data ? $.extend( data, []) : $.extend( this.option.data, []);
			self = this;
		$.each( renderData, function(k, d ){
			var levelConfigTemp = self.option.levelConfig ? $.extend( self.option.levelConfig, []) : $.extend( defaultLevelConfig, []);
			d.color = self.defaultTitleColor;
			$.each( levelConfigTemp, function( k, cof ){
				if (cof.level == d.level){
					d.color = cof.color;
				}
			})
			// console.log(d.color);
			html += '<div class="lp-group">' +
						'<div class="float-l lp-title" title="' + d.name + '">' +
							'<a style="background-color:' + d.color + ';" title="' + d.name + '">' + d.name + '</a>' +
						'</div>' +
						'<div class="float-l lp-lollipop"></div>' +
						'<div class="float-l lp-detail">' +
							'<span title="' + d.date + '" class="lp-gray">' + d.date + '</span>' +
							'<span title="' + d.detail + '">' + d.detail + '</span>' +
						'</div>' +
						'<div class="float-r lp-time lp-gray">' + d.time +
						'</div>' +
					'</div>';

		})
		this.wrap.html( html );
	},
});

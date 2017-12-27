/*
 * 医疗可视化平台-排行榜组件
 * date：2017-01-09
 * 
 */
var mRanklist = function(){
	if( !(this instanceof mRanklist) ){
		return new mRanklist();
	}
	
};

mRanklist.prototype = $.extend( new MCBASE(), {
		version : '0.0.1',
		template : '<ol class="rank-group">'
						+ '<li>'
							+ '<div class="rl-col float-l">'
								+ '<span class="rl-index the-first">' + '1' + '</span>'
								+ '<span class="rl-text" title="' + '血液净化中心血液净化中心' + '">' + '血液净化中心血液净化中心' + '</span>'
							+ '</div>'
							+ '<div class="rl-col float-r">'
								+ '<span class="rl-score">' + '96' + '分</span>'
							+ '</div>'
						+ '</li>'
					+ '</ol>',
		defaultOption : {
			'data': [],
		},
		init: function(cfg){ 	
			cfg = cfg || {};				
			cfg.option = cfg.option || {};	
			this.prefixClass = cfg.option.prefixClass || null;
			this.unit = cfg.option.unit || '分';		
			this.setOption(cfg.option);				
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
			this.wrap.on('click', 'li', function( ev ){
				var it = ev.currentTarget
					idx = 0;
				$.each( self.wrap.find('li') , function( k, v ){
					if( it == v ){
						idx = k;
					};
				});
				if( self.clickCallback ){
					self.clickCallback( self.data[idx] );
				}else{
					//console.log( self.data[idx] );
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
			if( !this.wrap || !this.wrap.length){
				console.log('配置项缺失');
				return false;
			}
			this.wrap.addClass('mc-ranklist');
			if( this.prefixClass && this.prefixClass != ''){
				this.wrap.addClass( this.prefixClass );
			}
			this.bindEvent();
			this.render();
		},
		setOption: function( option ){
			option =  _.defaults( option, this.defaultOption);
			option.data = option.data  || [];			
			this.option = $.extend( this.option, option );
			this.setData(option.data);
		},
		setData: function( data ){
			data =  data || [];
			$.each( data, function(k,v){
				v.score = parseInt( v.score );
			});
			var newData = _.sortBy(data, 'score').reverse();		
			this.data = $.extend( newData, [] );
			if( !this.option ){
				this.option = $.extend( this.defaultOption, {});
			}
			this.option.data = $.extend( newData, [] );
		},
		render: function( data ){
			if( !this.option || !this.option.data ){
				this.option = $.extend( this.defaultOption, {});
			}
			if( !data && !this.data && !this.option.data && !this.option.data.length ){
				this.wrap.html('暂无数据');
				return false;
			}
			var html = '',
				renderData = data ? $.extend( data, []) : $.extend( this.option.data, []);
				self = this;
			$.each( renderData, function( k, d ){
				d.showScore = self._formateLargeData(d.score);
				html += '<li>'
						+ '<div class="rl-col float-l">'
							+ '<span class="rl-index">' + (k + 1) + '</span>'
							+ '<span class="rl-text" title="' + d.name + '">' +  d.name + '</span>'
						+ '</div>'
						+ '<div class="rl-col float-r">'
							+ '<span class="rl-score" title="' + d.score + self.unit + '">' + d.showScore + self.unit + '</span>'
						+ '</div>'
					+ '</li>';

			});
			html = '<ol class="rank-group">' + html + '</ol>';
			this.wrap.html( html );
			this.wrap.find('li').eq(0).addClass('the-first');
			this.wrap.find('li').eq(1).addClass('the-second');
		},
});
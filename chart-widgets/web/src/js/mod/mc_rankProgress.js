	/*
 * 医疗可视化平台-带进度条的排行榜组件
 * date：2017-01-09
 * 
 */
var mRankProgress = function(){
	if( !(this instanceof mRankProgress) ){
		return new mRankProgress();
	}
}
mRankProgress.prototype = $.extend( new MCBASE(),{
	template:'<ol class="rank-group">'
						+ '<li>'
							+ '<div class="rl-col float-l">'
								+ '<span class="rl-index">9</span>'
								+ '<span class="rl-text" title="中医科">中医科</span>'
							+ '</div>'
							+ '<div class="rl-col float-m">'
								+ '<div class="rl-progress">'
									+ '<div class="pg-bar">'
										+ '<div class="pg-core" style="width:20%;"></div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="rl-col float-r">'
								+ '<span class="rl-score">99.53k</span>'
							+ '</div>'
						+ '</li>'
					+ '</ol>',
	defaultOption: {
		'data': [],
	},
	version:'0.0.1',
	init: function(cfg){ 	
		if( !this.data ){
			this.data = [];
		}
		if( !cfg ){
			return false;
		}	
		if( cfg.option ){
			this.data = cfg.option.data || [];
			this.prefixClass = cfg.option.prefixClass || null;
			this.unit = cfg.option.unit || '分';
			this.setData(cfg.option.data);
		}
		if( cfg.dom ){
			this.setDom( cfg.dom );				
		}
		if( cfg.clickCallback ){
			this.setClickCallback( cfg.clickCallback );
		}
		
		this._formateLargeData( 12345678 );	
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
		if( !dom || !dom.length ){
			console.log('配置项缺失');
			return false;
		}
		if( typeof( dom ) == 'string' ){
			this.wrap = $(dom).eq(0);
		}else{
			if( dom.length && dom.length >= 1){
				this.wrap = dom.eq(0);
			}
		}			
		if( !this.wrap ){
			console.log('配置项缺失');
			return false;
		}
		this.wrap.addClass('mc-ranklist');
		if( this.prefixClass && this.prefixClass != ''){
			this.wrap.addClass( this.prefixClass );
		}
		this.bindEvent();
	},
	setOption: function( option ){
		option =  option || {};
		this.option = $.extend( this.option, option );
	},
	setData: function( data ){
		data =  data || [];
		$.each( data, function(k,v){
			v.score = parseFloat( v.score );
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
			renderData ,
			maxScore = 0,				
			self = this;
		data = data ? $.extend( data, [] ) : $.extend( this.option.data, [] );
		$.each( data, function( k, d ){
			d.score = d.score ? parseFloat( d.score ) : 0;
		});
		renderData = _.sortBy( data, 'score' ).reverse();
		maxScore = renderData[0].score;
		$.each( renderData, function( k, d ){
			d.account = d.account ? parseFloat( d.account ) : d.score;
			d.target = d.target ? parseFloat( d.target ) : maxScore;
			d.percent = parseInt( d.account * 100 / d.target );	
			d.percent = d.percent > 100 ? 100 : d.percent;
			d.showScore = self._formateLargeData( d.account );		
			html += '<li>'
					+ '<div class="rl-col float-l">'
						+ '<span class="rl-index">' + (k + 1) + '</span>'
						+ '<span class="rl-text" title="' + d.name + '">' +  d.name + '</span>'
					+ '</div>'
					+ '<div class="rl-col float-m">'
						+ '<div class="rl-progress">'
							+ '<div class="pg-bar">'
								+ '<div class="pg-core" style="width:' + d.percent  + '%;"></div>'
							+ '</div>'
						+ '</div>'
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
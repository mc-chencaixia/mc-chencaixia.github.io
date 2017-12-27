/*
 * 医疗可视化平台-进度条组件
 * date：2017-01-04
 * 
 */
var mSortBar = function(){
	if( !(this instanceof mSortBar) ){
        return new mSortBar();
    }
}
mSortBar.prototype = $.extend( new MCBASE() ,{
	version:'0.0.1',
	defaultColorConfig : {'colorStart':'#60def9','colorEnd':'#03c3f0'},
	template : '<div class="sb-group">' +
						'<div class="float-l sb-title" title="0-10岁">' +
							'<a title="0-10岁">0-10岁</a>' +
						'</div>' +		
						'<div class="float-l sb-bar">' +
							'<div class="sb-core" style="width:80%; background: linear-gradient(to right, #60def9 , #03c3f0);"></div>' +
						'</div>' +
						'<div title="358K" class="float-r sb-value">358k</div>' +
					'</div>',
	defaultOption : {
		'colorConfig':{'colorStart':'#60def9','colorEnd':'#03c3f0'},
		'data': []
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
		this.wrap.on('click', '.sb-group', function( ev ){
			var it = ev.currentTarget
				idx = 0;
			$.each( self.wrap.find('.sb-group') , function( k, v ){
				if( it == v ){
					idx = k;
				};
			});
			// console.log("内容是："+self.data[idx]);
			// console.log('序号是：' + idx);
			if( self.clickCallback ){
				self.clickCallback( self.data[idx] );
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
	drilling:function( idx ){//联动事件
		// console.log('drilling' + idx);
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
		this.wrap.addClass('mc-SORTBAR');
		this.bindEvent();
		this.render();
	},
	setColorConfig: function( colorConfig ){
		colorConfig =  colorConfig || {};
		this.option.colorConfig = colorConfig ? colorConfig : this.defaultColorConfig;
	},
	setOption: function( option ){
		option = _.defaults( option, this.defaultOption );
		this.option = $.extend( option, {});
		this.setData(option.data);
	},
	setData: function( data ){
		this.data = this.data || [];
		data =  data || [];
		var newData = [];
		$.each( data, function( k,v ){
			var idx = _.findLastIndex( newData, {'name':v.name});
			v.value = parseInt( v.value );
			if( idx > -1 ){
				newData[idx].value += v.value;
				console.log(newData[idx].value)
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
		if( !this.option || !this.option.data ){
			this.option = $.extend( this.defaultOption, {});
		}
		if( !data && !this.data && !this.option.data && !this.option.data.length ){
			this.wrap.html('暂无数据');
			return false;
		}
		//console.log(data);
		var html = '',
			renderData = data ? $.extend( data, []) : $.extend( this.option.data, []);
			self = this;
			colorConfigTemp = self.option.colorConfig ? self.option.colorConfig : defaultColorConfig;
			maxValue = 0;
		//算出总数
		$.each( renderData, function( k, d ){
			if(maxValue < d.value){
				maxValue = d.value;
			}
		})
		// console.log("最大数："+maxValue);
		$.each( renderData, function( k, d ){
			d.core = parseInt(d.value / maxValue * 100);
			d.showValue = self._formateLargeData( d.value );
			html += '<div class="sb-group">' +
						'<div class="float-l sb-title" title="' + d.name + '">' +
							'<a title="' + d.name + '">' + d.name + '</a>' +
						'</div>' +		
						'<div class="float-l sb-bar">' +
							'<div class="sb-core" style="width:' + d.core + '%; background: linear-gradient(to right, ' + colorConfigTemp.colorStart + ' , ' + colorConfigTemp.colorEnd + ');"></div>' +
						'</div>' +
						'<div class="float-r sb-value" title="' + d.value + '">' + d.showValue + '</div>' +
					'</div>';
		})
		this.wrap.html( html );
	},
	
})                         
/**
  * 医疗可视化平台 - 透视表组件
  * date: 2017-06-23
  * author: tangb
  */

var PersTable = function () {

}

var prototype = PersTable.prototype;

/* 数据模板 */
/*
[
	[{title1:'', title2:'', title3:'', value:'', rowspan: '', colspan: ''},{title: '', value:'', rowspan: ''}, {'title':'', value: ''}]// 要求全字段，不能省略(即表头有多少字段,这里就必须多少字段)
	//....
]
*/
var proto = {
	clickCallback: null,
	defaultOption: {
		dom: '',
		clickCallback: '',
		data: []
	},
	init: function(cfg) {
		cfg = cfg || {};
		cfg.option = cfg.option || {};
		this.setOption(cfg.option);

		if(cfg.dom) {
			this.setDom(cfg.dom);
		} 

		if(cfg.clickCallback) {
			this.setClickCallback( cfg.clickCallback );
		}
	},

	setDom: function(dom) {
		this.wrap = this._setDom( dom );
		if( !this.wrap || !this.wrap.length ) {
			console.error('配置项缺失');
			return false;
		}
		this.bindEvent();
		this.render();
	},

	setOption: function(option) {
		if(this.option){
			this.option = $.extend({}, this.defaultOption);
		}
		this.option = $.extend(this.option, option);
		this.setData(option.data);
	},

	setData: function(data) {
		data = data || [];
		this.option.data = $.extend([], this.option.data);
		this.data = $.extend([], data);
	},

	setClickCallback: function( fn ) {
		this.clickCallback = fn || null;
	},

	handleData: function (data) {
		if( !data || !data.length || !data[0] ) return;
		for(var i=0; i<data.length; i++) {
			var child = data[i];
			for(var j=0; j<child.length; j++){
				
			}
		}
	}

	render: function( data ) {
		if( !this.wrap || !this.wrap.length ) {
			console.log('必须提供dom元素');
		}

		if( !data && $.isEmptyObject(this.data)){
			this.wrap.html('暂无数据');
		}

		var html = '';
		renderData = data || this.data;

		<table>
			<tr></tr>
		</table>
	}
}
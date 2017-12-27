/**
 * desc: 二维条形图
 * className: E_Bar_2D_0
 */
function E_Bar_2D_0() {};

E_Bar_2D_0.prototype = new Base();

E_Bar_2D_0.prototype.init = function (args) {
	if (!!args.dom || typeof args.dom !== 'object' || args.dom.nodeType !== 1) new throw Error('请传入正确的dom元素');
	this._dom_ = args.dom;
	var chart = echarts.init(this._dom_);
	var option = {

	}
	!!args.option && (option = $.extend(option, args.option));
	if (!!args.data) {
		this.render(args.data);
	}
	this.resize();
}

E_Bar_2D_0.prototype.render = function (args) {
	var option = this.chart.getOption();
	this.chart.setOption(option);
}

E_Column_Stack_0.prototype.setXAxis = function (args) {
	var option = this.chart.getOption();
	option.xAxis[0] = $.extend(option.xAxis[0], args);
	this.chart.setOption(option);
}
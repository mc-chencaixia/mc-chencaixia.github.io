var Base = function(){

};
// Base.prototype._extend = function(dest, src){
// 	var _complete,
//     _extend,
//     _isObject;
//     _isObject = function(o){
//         return (Object.prototype.toString.call(o) === '[object Object]' || Object.prototype.toString.call(o) === '[object Array]');
//     },
//     _extend = function self(destination, source) {
//         var property;
//         for (property in destination) {
//             if (destination.hasOwnProperty(property)) {

//                 // 若destination[property]和sourc[property]都是对象，则递归
//                 if (_isObject(destination[property]) && _isObject(source[property])) {
//                     self(destination[property], source[property]);
//                 };

//                 // 若source[property]已存在，则跳过
//                 if (source.hasOwnProperty(property)) {
//                     continue;
//                 } else {
//                     source[property] = destination[property];
//                 }
//             }
//         }
//     },
//     _complete = function(){
//         var arr = arguments,
//             //result = {},
//             i;

//         if (!arr.length) return {};

//         for (i = arr.length - 1; i >= 0; i--) {
//             if (_isObject(arr[i])) {
//             	var type = Object.prototype.toString.call(arr[i]).match(/\s\w+/);
//             	type = type.slice(1);
//             	var result = eval(type);
//                 _extend(arr[i], result);
//             };
//         }

//         arr[0] = result;
//         return result;
//     };
//     return _complete(dest, src);
// }
Base.prototype.thousandBitSeparator = function(num) {
    return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
Base.prototype.on = function(event, handler){
	!!this.chart && this.chart.on(event, handler);
}
Base.prototype.getSize = function(dom){
	var flag = dom && typeof dom === 'object' && dom.nodeType === 1 && typeof dom.nodeName === 'string';
	if(!flag){
		throw new Error("请传入正确的dom!");
		return;
	}
	return {h: dom.clientHeight, w: dom.clientWidth};
}
Base.prototype.resize = function(){
	if(!!this.chart){
		window.addEventListener("resize", this.chart.resize);
	}
}


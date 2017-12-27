'use strict';

var E_Base = function () {
	this.version = '0.0.1';
};

E_Base.prototype = {
	_init: function (cfg) {
		if (!cfg || !cfg.dom || typeof cfg.dom !== "object" || cfg.dom.nodeType !== 1) throw new Error("请传入正确的dom元素");
		this.dom = cfg.dom;
		this.chart = echarts.init(this.dom);
	},
	/**
	 * desc: 监听浏览器尺寸变化重绘图表
	 * @return null
	 */
	_resize: function () {
		if (!!this.chart) {
			window.addEventListener("resize", this.chart.resize);
		}
	},
	/**
	 * desc: 格式化数字 每三位添加','分隔
	 * @param  {number} num 需要处理的数
	 * @return {string}     分隔后的字符串
	 */
	_thousandBitSeparator: function (num) {
		return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
	},

	_formateLargeData: function (largeData, fixed) {
		var formateData = '';
		if (!largeData) {
			return formateData;
		}
		if (isNaN(largeData)) {
			return formateData + largeData;
		}
		if (typeof (largeData) === 'string') {
			largeData = parseFloat(largeData);
		}
		if (largeData < 10000) {
			if ((largeData + '').indexOf('.') > -1) {
				return formateData + largeData.toFixed(fixed || 2);
			}

			return formateData + largeData
		}
		if (largeData > 10000 * 10000) {
			formateData = (largeData / 10000 / 10000).toFixed(fixed || 2) + '亿';
		}
		if (10000 * 10000 > largeData && largeData >= 10000) {
			formateData = (largeData / 10000).toFixed(fixed || 2) + '万';
		}

		if (!formateData) {
			formateData = largeData;
		}
		return formateData;
	},
	_formatStr: function(str){
		return str.split('').join('\n');
	},
	_on: function(event, handler) {
		!!this.chart && this.chart.on(event, handler);
	},

	_hideTitle: function () {
		this.update && this.update({
			isShowTitle: false
		});
	},
	_showTitle: function () {
		this.update && this.update({
			isShowTitle: true
		});
	},
	_showYLabel: function () {
		this.update && this.update({
			isShowYLabel: true
		});
	},
	_hideYLabel: function () {
		this.update && this.update({
			isShowYLabel: false
		});
	},
	_showXLabel: function () {
		this.update && this.update({
			isShowXLabel: true
		});
	},
	_hideXLabel: function () {
		this.update && this.update({
			isShowXLabel: false
		});
	},
	/**
	 * desc: 显示X轴标签名
	 */
	_showXAxisName: function () {
		this.update && this.update({
			isShowXAxisName: true
		});
	},
	/**
	 * desc: 隐藏X轴标签名
	 */
	_hideXAxisName: function () {
		this.update && this.update({
			isShowXAxisName: false
		});
	},
	/**
	 * desc: 显示Y轴标签名
	 */
	_showYAxisName: function () {
		this.update && this.update({
			isShowYAxisName: true
		});
	},
	/**
	 * desc: 隐藏Y轴标签名
	 */
	_hideYAxisName: function () {
		this.update && this.update({
			isShowYAxisName: false
		});
	},
	/**
	 * desc: 显示图例
	 */
	_showLegend: function () {
		this.update && this.update({
			isShowLegend: true
		})
	},
	/**
	 * desc: 隐藏图例
	 */
	_hideLegend: function () {
		this.update && this.update({
			isShowLegend: false
		})
	},
	/**
	 * desc: 显示副标题
	 */
	_showSubtitle: function () {
		this.update && this.update({
			isShowSubtitle: true
		})
	},
	/**
	 * desc: 隐藏副标题
	 */
	_hideSubtitle: function () {
		this.update && this.update({
			isShowSubtitle: false
		})
	},
	/**
	* desc: 数据标签-弹层-大于等于2位的小数四舍五入
	* @param  {number} num 需要处理的数
	* @return {string}     分隔后的字符串
	*/
	_decmicalsDataFormat : function (arr) {
		if ( Object.prototype.toString.call(arr) !== '[object Array]' ) return arr; 
		var stdArr = arr.map(function(v){
			var v = parseFloat(v)
			if((v+'').split('.').length==2){
				if((v+'').split('.')[1].length>=2){
					return v.toFixed(2)
				}
				else{
					return v
				}
			}else{
				return v            
			}
		})
		return stdArr
	},
	/**
	 * desc: 标签名长度不能超过10
	 * @param {string} name 需要检查的标签名
	 * @return {string}     标签名或者提示
	 */
	_limitNameLength: function (name) {
		if(typeof name == 'undefined') return "标签名未定义";
		if(name.length<=10){
			return name
		}else{
			return "标签名长度不能超过10！"
		}
	},
    /**
     * desc: 标签名长度不能超过10
     * @param {string} name 需要检查的维度名
     * @return {string}     维度名和提示
     */
    _limitDimensionLength: function (name) {
        if(name.length > 6){
            return name.substring(0, 6) + '...';
        }
        return name;
    },
    /**
     * desc: 计算图标边框布局
     * @return {object} 计算好的边框布局参数
     */
    _chartLayout: function () {
        var left ='10%',
        top = 60,
        right = '10%',
        bottom = 60,
        width='auto',
        height= 'auto';
        /**
         * desc: 标题伸缩
         */
        if(this.isShowTitle){
            if(this.isShowSubtitle){
                top = 60
            }else{
                top = 40
            }
        }else if(!this.isShowtitle){
                top = 30
        }
        /** 
         * desc: 图例和X轴标签伸缩
        */
        if(this.isShowLegend){
            if(this.isShowXAxisName){
                bottom = 70
            }else{
                bottom = 50
            }
        }else if(!this.isShowLegend){
            if(this.isShowXAxisName){
                bottom = 50
            }else{
                bottom = 30
            }
        }
        /**
         * desc: Y轴标签伸缩
         */
        if(this.isShowYAxisName){
            left = 80,
            right = 40
        }else if(!this.isShowYAxisName){
            left = 60,
            right = 40
        }

            // this.isShowXAxisName ?
        // legendShow ? 
        // (function(){option.legend[0].show = true;data.xAxis.name.show?option.grid[0].bottom=80:option.grid[0].bottom=60})()
        // : (function(){option.legend[0].show = false;data.xAxis.name.show?option.grid[0].bottom=60:option.grid[0].bottom=40})()
        return {
            'left': left,
            'right': right,
            'top': top,
            'bottom': bottom,
            'width':width,
            'height':height
        };
    },
};
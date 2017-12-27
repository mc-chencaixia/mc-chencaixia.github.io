/**
 * 柱状图 折线图混合	
 * author: lius
 */
function eLineBarChart() {}

eLineBarChart.prototype = new Base();

eLineBarChart.prototype.init = function(opt) {
	if (!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
	this._dom_ = opt.dom;

	var chart = echarts.init(this._dom_);
	var that = this;
	var option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['蒸发量', '降水量']
		},
		dataZoom: [
			{
				type: 'inside'
			}
		],
		xAxis: [
			{
				type: 'category',
				data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
			}
		],
		yAxis: [
	        {
	            type: 'value',
	            name: '水量',
	            axisLabel: {
	                formatter: '{value} ml'
	            }
	        }
	    ],
	    series: [
	        {
	            name:'蒸发量',
	            type:'bar',
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        },
	        {
	            name:'降水量',
	            type:'bar',
	            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	        }
	    ]
	};
	!!opt.option && (option = _.extend(option, opt.option));
	this._option_ = option;
	this.chart = chart;
	if (opt.data) {
		this.render(opt.data);
	}

	this.resize();
};

/**
 * 渲染
 * data: {
 * 		series: [
 * 			{
 * 			}
 * 		]
 * }
 */
eLineBarChart.prototype.render = function(data) {
	var option = this._option_;
	for (var i = 0; i < option.series.length; i++) {
		option.series[i] = $.extend({}, option.series[i], data.series[i]);
	}
	this.chart.setOption(option);
}

/**
 * 设置数据
 * data: [
 * 		{
 * 			name: '',
 * 			data: ''
 * 		},
 * 		{
 * 		}
 * 		...
 * ]
 */
eLineBarChart.prototype.setData = function(data) {
	var option = this.chart.getOption();
	option.legend[0].data = [];
	for (var i = 0; i < data.length; i++) {
		option.series[i] = $.extend({}, option.series[i], data[i]);
		option.legend[0].data[i] = data[i].name;
	}
	this.chart.setOption(option);
}

/**
 * 设置x轴数据
 * {
 * 		name: 'x轴名称'，
 * 		data: ['1月',...]
 * }
 */
eLineBarChart.prototype.setXAxis = function(opt) {
	var option = this.chart.getOption();
	option.xAxis[0].data = opt;
	this.chart.setOption(option);
}

/**
 * 设置y轴数据
 * {
 * 		name: 'y轴名称'，
 * 		data: ['1月',...]
 * }
 */
eLineBarChart.prototype.setYAxis = function(opt) {
	var option = this.chart.getOption();
	for (var i = 0; i < option.yAxis.length; i++) {
		option.yAxis[i] = _.extend(option.yAxis[i], opt[i]);
	}
	this.chart.setOption(option);
}

/**
 * 设置saiKu数据
 */
eLineBarChart.prototype.setSaiKuData = function(data) {
	if (!data) return;
	var firstRowleftOffest = 0, // 头标题的偏移量
	xAxisArr = [],
	seriesArr = [],
	legendArr = [],
	indicatorArr = [],
	xAxisTempArr = [],
	legTempArr = [];
	var cellData = data.cellset; // legend data

	for (var i = 0; i < cellData[0].length; i++) {
		if (cellData[0][i].value == 'null') {
			firstRowleftOffest ++;
		}
	}
	for (var i = 0; i < cellData.length; i++) { // 单元格数据
		if (i < data.topOffset) { // 指标
			for (var j = 0; j < cellData[i].length; j++) {
				if (!(j < firstRowleftOffest)) {
					legTempArr.push(cellData[i][j].value);
				}
			}			
		} else { // value
			var xAxisStr = '';
			for (var k = 0; k < cellData[i].length; k++) {
				if(cellData[i][k].type == 'DATA_CELL') {
					// var posiArr = cellData[i][k].properties.position.split(':');
					// indicatorArr[+posiArr[0]][+posiArr[1]].push(cellData[i][k].value);
					indicatorArr.push(cellData[i][k].value);
				} else if (cellData[i][k].type == 'ROW_HEADER') {
					xAxisStr += ('~' + cellData[i][k].value);
				}
			}
			xAxisArr.push(xAxisStr.substring(1));
		}
	}
	// 处理legend
	var legendCount = data.width - firstRowleftOffest;
	var allIndicatCount = legTempArr.length / legendCount;
	var allDataCount = indicatorArr.length / legendCount;
	for (var i = 0; i < legendCount; i++) {
		// 处理legend
		var legendStr = legTempArr[i];
		for (var j = 1; j < allIndicatCount; j++) {
			legendStr = legendStr + '~' + legTempArr[i + (legendCount * j)];
		}
		legendArr.push(legendStr);
		// 处理Data
		var indicatorData = {};
		var indicTempArr = [];
		for (var k = 0; k < allDataCount; k++) {
			indicTempArr.push((indicatorArr[i + (legendCount * k)]).replace(',', ''));
		}
		indicatorData.data = indicTempArr;
		indicatorData.name = legendArr[i];
		indicatorData.type = 'scatter';
		seriesArr.push(indicatorData);
	}

	// 处理data
	
	var indicatorData = {};

	console.log(seriesArr, indicatorArr, xAxisTempArr, legendArr);
	eLineBarChart.setXAxis(xAxisArr);
	eLineBarChart.setData(seriesArr);

}
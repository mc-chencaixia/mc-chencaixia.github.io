## Usage

#### init(config)函数  
初始化图表函数
**config** `object` 
**config.dom** `dom`
必选参数，获取到展示图表的HTML DOM节点
**config.title** `string`
可选参数，图表组件的主标题，默认不显示
**config.subTitle** `string`
可选参数，图表组件的副标题，默认不显示，只有在title显示的状态下subTitle才会显示
**config.xAxisLabel** `boolean`
可选参数，控制x轴标签的显隐状态，默认为true。
**config.yAxisLabel** `boolean`
可选参数，控制y轴标签的显隐状态，默认为true。
**config.itemLabel** `boolean`
可选参数，控制item的标签显隐状态，默认为true。

```
var config = {
	dom: document.getElementById("J_Column_Basic_0"), // HTML元素节点
	title: '主标题',	// 图表的主标题
	subTitle: '副标题',	// 图表的副标题
	yAxisLabel: true,	// X轴标签显示开关 默认为 true
	xAxisLabel: true,	// Y轴标签显示开关 默认为 true
	itemLabel: true,
}
var barChart = new E_Column_Basic_0();
barChart.init(config);
```

#### render(data)函数
args `object`
render所需要的参数
args.data `array`
图表数据
args.xAxis `array`
x轴标签数据

```
// Example（示例）
var args = {
    xAxis: ['恶性肿瘤维\n持性化学时间', '冠状动脉粥样\n硬化性心脏病', '新生儿高胆\n红素血症', '胎儿宫内窘迫', '头位顺产', '乳腺良性肿瘤', '妊娠合并\n子宫瘢痕', '卵巢良性肿瘤', '腋臭'],
    data: [29184, 46304, 19728, 20733, 15778, 13152, 57152, 18352, 55763]
};
barChart.render(args);
```

#### setXAxis(data) & setYAxis(data)函数
data `object`
data.name `string`
x/y轴名称
data.data `array`
[item1, item2, item3, ...]
x/y轴的数据

[坐标轴配置参数可参照echarts官方配置表](http://echarts.baidu.com/option.html#xAxis.show)



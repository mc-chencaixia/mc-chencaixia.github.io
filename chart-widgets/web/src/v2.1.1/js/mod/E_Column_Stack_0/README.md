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
	yAxisLabel: false,	// X轴标签显示开关 默认为 true
	xAxisLabel: true,	// Y轴标签显示开关 默认为 true
	itemLabel: true,
}
var stackBarChart = new E_Column_Basic_0();
stackBarChart.init(config);
```

#### render(data)函数
**args** `object`  
render所需要的参数  
**args.data** `array`  
图表数据  
**args.xAxis** `array`  
x轴标签数据  

```
var args = {
	name: '预约', 
    xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    data: [
    	{
    		name: '火车',
    		data: [
                	{value: 620},
                	{value: 732},
                	{value: 701},
                	{value: 734}, 
                	{value: 1090}, 
                	{value: 1130}, 
                	{value: 1120},
                ]
    	},
    	{
    		name: '汽车',
    		data:[620*0.2, 732*0.2, 701*0.2, 734*0.2, 1090*0.2, 1130*0.2, 1120*0.2],
    	},
    	{
    		name: '轮船',
    		data: [
                	{value: 320},
                	{value: 332},
                	{value: 301},
                	{value: 334}, 
                	{value: 390}, 
                	{value: 330}, 
                	{value: 320}
           	],
    	}
    ]
};

stackBarChart.render(args);
```

#### setXAxis(data)函数
data `object`
data.name `string`
x轴名称
data.data `array`
[item1, item2, item3, ...]
x轴的数据

[坐标轴配置参数可参照echarts官方配置表](http://echarts.baidu.com/option.html#xAxis.show)



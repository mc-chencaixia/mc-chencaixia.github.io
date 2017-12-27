

/*
 * 医疗可视化平台-透视表
 * date：2017-01-04
 * 
 */
var Pivottable = function() {
    if (!(this instanceof Pivottable)) {
        return new Pivottable();
    }
}

var template = 
    '{{for defaultData}}' +
    '<table>' +
    '{{for headData}}' +
    '<tr class="head">' +
    '{{for #data}}' +
    '<td colspan="{{>cols}}" data-parent="{{>parent}}"  data-value="{{>name}}" rowspan="{{>rows}}" data-id="{{>id}}" data-children="{{>level}}" {{if children}} {{/if}}>{{>name}}</td>' +
    '{{/for}}' +
    '</tr>' +
    '{{/for}}' +
    '{{for bodyData}}' +
    '<tr class="body">' +
    '{{for #data}}' +
    '<td colspan="{{>cols}}" data-parent="{{>parent}}" data-value="{{>name}}" data-row="{{>rowkey}}" data-head="{{>headkey}}" rowspan="{{>rows}}" data-children="{{>level}}" data-id="{{>id}}">{{>name}}</td>' +
    '{{/for}}' +
    '</tr>' +
    '{{/for}}' +
    '</table>' +
    '{{/for}}';




Pivottable.prototype = $.extend(new MCBASE(), {
    init: function(cfg) {
        cfg = cfg || {};
        cfg.option = cfg.option || {};
        this.closeItems = {
            headClose: [],
            bodyClose: [],
        }
        this.prefixClass = cfg.option.prefixClass || null;
        this.setOption(cfg.option);
        if (cfg.dom) {
            this.setDom(cfg.dom);
        }
        if (cfg.clickCallback) {
            this.setClickCallback(cfg.clickCallback);
        }
        this.render();
        this.bindEvent();
    },
    setDom: function(dom) {
        this.wrap = this._setDom(dom);
        if (!this.wrap || !this.wrap.length) {
            console.log('配置项缺失');
            return false;
        }
        if (this.prefixClass && this.prefixClass != '') {
            this.wrap.addClass(this.prefixClass);
        }
    },
    setOption: function(option) {
        // option = _.defaults( option, this.defaultOption );
        option = $.extend(true, this.defaultOption, option);
        this.option = $.extend(this.option, option);
        this.setData(option.data);
    },
    setData: function(data) {
        data = data || {};
        this.option.data = $.extend(this.option.data, data);
        this.formerData = $.extend(true, {}, this.option.data);
    },
    setClickCallback: function(fn, layout, qlik) {
        this.clickCallback = fn || null;
        this.yjslayout = layout;
        this.yjsqlik = qlik;
    },
    bindEvent: function() { 
        var self = this;
        var data = self.option.data;
        this.wrap.off()
            .on('click', '.wrap', function(ev) {
                ev.stopPropagation();
            })
            .on('click', 'td', function() {
                var parent = $(this).parent();
                var data_parent = $(this).attr('data-parent');
                var data_value = $(this).attr('data-value');
                var match = (data_parent && data_parent != data_value) ? (data_parent + '+' + data_value) : data_value;
                if(parent.hasClass('head')){
                    // 总计，度量，最后一级维度，空的不可点
                    if(match.split('+').length >= headDimentsions.length || $(this).text() == '总计')  return;
                    var idx = _.indexOf(self.closeItems.headClose, match);
                    if(idx > -1){
                        self.closeItems.headClose.splice(idx, 1);
                    }else{
                        self.closeItems.headClose.push(match);
                    }
                }else{
                    // 小计，数字，最后一级维度，空的不可点
                    if(match.split('+').length >= rowDimensions.length || $(this).text() == '小计')  return;
                    var idx = _.indexOf(self.closeItems.bodyClose, match);
                    if(idx > -1){
                        self.closeItems.bodyClose.splice(idx, 1);
                    }else{
                        self.closeItems.bodyClose.push(match);
                    }
                }
                constructPivotTable(self.closeItems);
            })
    },
    render: function(data) {
        data = data || this.option.data;
        var html = $.templates(template)(data);
        this.wrap.html(html);
    },
});



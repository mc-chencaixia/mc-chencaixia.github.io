// define(['./mc_base'], function(MCBASE){

/*
 * 医疗可视化平台-固定表头表格
 * date：2017-01-04
 * 
 */
var FixedHeadTable = function() {
    if (!(this instanceof FixedHeadTable)) {
        return new FixedHeadTable();
    }
}




var template = 

'{{for defaultData}}' +
    '<div class="fixedHeadTable">' +
        '{{if ~root.isHeadFixed && ~root.isBodyFixed}}' +
            '<div class="headLeftFixedWrap fixedWrap">' +
                '<table class="headLeftFixed">' +
                    '<thead>' +
                        '{{for headData}}' +
                            '<tr class="head">' +
                                '{{for #data}}' +
                                    '<td colspan="{{>cols}}" class="{{if parent}}invisible{{/if}}" data-parent="{{>parent}}"  data-value="{{>name}}" rowspan="{{>rows}}" data-id="{{>id}}" data-children="{{>level}}" {{if children}} {{/if}}>{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                                '{{/for}}' +
                            '</tr>' +
                        '{{/for}}' +
                    '</thead>' +
                    '<tbody>' +
                        '{{for bodyData}}' +
                            '<tr class="body">' +
                                '{{for #data}}' +
                                    '<td colspan="{{>cols}}" class="{{if parent}}bodyLeft{{/if}} invisible" data-parent="{{>parent}}" data-value="{{>name}}" data-row="{{>rowkey}}" data-head="{{>headkey}}" rowspan="{{>rows}}" data-children="{{>level}}" data-id="{{>id}}">{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                                '{{/for}}' +
                            '</tr>' +
                        '{{/for}}' +
                    '</tbody>' +
                '</table>' +
            '</div>' +
        '{{/if}}' +
        '{{if ~root.isHeadFixed || ~root.isHeadFixed && ~root.isBodyFixed}}' +
            '<div class="headRightFixedWrap fixedWrap">' +
                '<table class="headRightFixed">' +
                    '<thead>' +
                        '{{for headData}}' +
                            '<tr class="head">' +
                                '{{for #data}}' +
                                    '<td colspan="{{>cols}}" class="{{if !parent && ~root.isHeadFixed && ~root.isBodyFixed}}invisible{{/if}}" data-parent="{{>parent}}"  data-value="{{>name}}" rowspan="{{>rows}}" data-id="{{>id}}" data-children="{{>level}}" {{if children}} {{/if}}>{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                                '{{/for}}' +
                            '</tr>' +
                        '{{/for}}' +
                    '</thead>' +
                    '<tbody>' +
                        '{{for bodyData}}' +
                            '<tr class="body">' +
                                '{{for #data}}' +
                                    '<td colspan="{{>cols}}" class="{{if parent}}bodyLeft{{/if}} invisible" data-parent="{{>parent}}" data-value="{{>name}}" data-row="{{>rowkey}}" data-head="{{>headkey}}" rowspan="{{>rows}}" data-children="{{>level}}" data-id="{{>id}}">{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                                '{{/for}}' +
                            '</tr>' +
                        '{{/for}}' +
                    '</tbody>' +
                '</table>' +
            '</div>' +
        '{{/if}}' +
        '{{if ~root.isHeadFixed && ~root.isBodyFixed || ~root.isBodyFixed}}' +
            '<div class="bodyLeftFixedWrap fixedWrap">' +
                '<table class="bodyLeftFixed">' +
                    '<thead>' +
                        '{{for headData}}' +
                            '<tr class="head">' +
                                '{{for #data}}' +
                                    '<td colspan="{{>cols}}" class="{{if ~root.isHeadFixed && ~root.isBodyFixed || parent}}invisible{{/if}}"  data-parent="{{>parent}}"  data-value="{{>name}}" rowspan="{{>rows}}" data-id="{{>id}}" data-children="{{>level}}" {{if children}} {{/if}}>{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                                '{{/for}}' +
                            '</tr>' +
                        '{{/for}}' +
                    '</thead>' +
                    '<tbody>' +
                        '{{for bodyData}}' +
                            '<tr class="body">' +
                                '{{for #data}}' +
                                    '<td colspan="{{>cols}}" class="{{if parent}}bodyLeft {{else}}invisible{{/if}}" data-parent="{{>parent}}" data-value="{{>name}}" data-row="{{>rowkey}}" data-head="{{>headkey}}" rowspan="{{>rows}}" data-children="{{>level}}" data-id="{{>id}}">{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                                '{{/for}}' +
                            '</tr>' +
                        '{{/for}}' +
                    '</tbody>' +
                '</table>' +
            '</div>' +
        '{{/if}}' +
        '<div class="transverseRollingWrap">' +
                '<table class="defaultTable">' +
                    '<thead>' +
                        '{{for headData}}' +
                            '<tr class="head">' +
                                '{{for #data}}' +
                                    '<td colspan="{{>cols}}" data-parent="{{>parent}}"  data-value="{{>name}}" rowspan="{{>rows}}" data-id="{{>id}}" data-children="{{>level}}" {{if children}} {{/if}}>{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                                '{{/for}}' +
                            '</tr>' +
                        '{{/for}}' +
                    '</thead>' +
                    '<tbody>' +
                        '{{for bodyData}}' +
                            '<tr class="body">' +
                                '{{for #data}}' +
                                    '<td colspan="{{>cols}}" class="{{if parent}}bodyLeft{{/if}}" data-parent="{{>parent}}" data-value="{{>name}}" data-row="{{>rowkey}}" data-head="{{>headkey}}" rowspan="{{>rows}}" data-children="{{>level}}" data-id="{{>id}}">{{if name == "total" }}{{else}}{{>name}}{{/if}}</td>' +
                                '{{/for}}' +
                            '</tr>' +
                        '{{/for}}' +
                    '</tbody>' +
                '</table>' +
        '</div>' +
    '</div>' +
'{{/for}}';

/*固定行表头和列表头方法：将表格分成四个部分，绝对定位，隐藏掉相应的部分*/


FixedHeadTable.prototype = $.extend(new MCBASE(), {
    init: function(cfg) {
        cfg = cfg || {};
        cfg.option = cfg.option || {};
        cfg.option.data.isHeadFixed = cfg.option.data.isHeadFixed == false ? false : true;
        cfg.option.data.isBodyFixed = cfg.option.data.isBodyFixed == false ? false : true;
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
        $('.transverseRollingWrap').off().on('scroll', function(){
            $('.bodyLeftFixed').css('margin-top', -$(this).scrollTop() + 'px');
            $('.headRightFixed').css('margin-left', -$(this).scrollLeft() + 'px');
        })
    },
    render: function(data) {
        data = data || this.option.data;
        var self = this;
        var html = $.templates(template)(data);
        this.wrap.html(html);
    },
});

// return FixedHeadTable;
// });



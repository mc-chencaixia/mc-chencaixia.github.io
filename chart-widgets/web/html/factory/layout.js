/**
 * Created by DELL on 2017/12/7.
 */

function layout(){}
layout.prototype = new Base();

layout.prototype.init = function(opt){
    if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
    this._dom_ = opt.dom;

    //初始化布局模板
    var layoutTemplate = '{{for data itemVar="~member"}}'+
        '   <!-- 第{{:#index+1}}行开始 -->'+
        '   <div class="row">'+
        '{{for rate}}'+
        '       <div class="col-md-{{:width}}">'+
        '           <div id="J_{{:~member.name}}{{:#index}}" class="belRow{{:#parent.getIndex()}}" style="height:{{:~member.height}}px">'+
        '           </div>'+
        '       </div>'+
        '{{/for}}'+
        '   </div>'+
        '   <!-- 第{{:#index+1}}行结束 -->'+
        '{{/for}}';

    this.template = layoutTemplate;
};
layout.prototype.render = function(tmpl,data){
    var html = tmpl.render(data);

    $(this._dom_).html(html);

    //展示代码
    html = '<!-- 布局模板开始 -->'+
        '<div id="J_container">'+
        html +
        '</div>'+
        '<!-- 布局模板结束 -->';
    while (html.indexOf('<') >= 0){
        html = html.replace('<', '&lt;');
    }
    while (html.indexOf('>') >= 0){
        html = html.replace('>', '&gt;\n');
    }

    $('code').html(html);
};
layout.prototype.setData = function(data){
    for(var obj in data.data){
        var sum = 0;

        if(data.data[obj].rate.length == 0){
            data.data[obj].rate = [];
            for(var i = 0;i < data.data[obj].sum; i++){
                data.data[obj].rate.push(parseInt(12/data.data[obj].sum));
            }
        }else{
            for(var i = 0;i < data.data[obj].sum; i++){
                sum += data.data[obj].rate[i].width;
            }
            if(sum < 12){
                var rate = 12 / sum;
                for(var i = 0;i < data.data[obj].sum; i++){
                    data.data[obj].rate[i].width = parseInt(data.data[obj].rate[i].width*rate);
                }
            }
        }

    }

    var tmpl = $.templates(this.template);

    this.render(tmpl, data);
};
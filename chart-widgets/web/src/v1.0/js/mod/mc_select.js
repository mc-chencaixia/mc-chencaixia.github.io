// /*
//  * 医疗可视化平台-下拉选择组件
//  * date：2017-01-04
//  * 
//  */
           



// /*
//  * 医疗可视化平台-下拉选择组件
//  * date：2017-01-04
//  * 
//  */

var mSelect = function(){
    if( !(this instanceof mSelect) ){
        return new mSelect();
    }
}
mSelect.prototype = $.extend( new MCBASE() ,{
    version:'0.0.1',
    defaultOption : {
        'data': []
    },      
    init: function(cfg){    
        cfg = cfg || {};                
        cfg.option = cfg.option || {};
        this.setOption( cfg.option );
        this.saveArr = _.toArray($.extend(true, this.saveArr, this.option.data[2].selected));
        if( cfg.dom ){
            this.setDom( cfg.dom );             
        }
        if( cfg.clickCallback ){
            this.setClickCallback( cfg.clickCallback )
        }
    },
    setClickCallback:function( fn, layout, qlik ){
        this.clickCallback = fn || null;
        this.yjslayout = layout;
        this.yjsqlik = qlik;    
    },
    bindEvent: function(){
        var that = this;
        this.wrap.on('click', '.button', function(e){
            e.stopPropagation();
            var flag = $(this).siblings('.wrapper').is(':visible');
            $('.mc-dropdown .wrapper').addClass('hide');
            $('.mc-dropdown .mc-active').removeClass('mc-active');
            /*
            var dd = that.wrap.find('.mc-dropdown');
            var rect = dd[0].getBoundingClientRect();
            var right = rect.left + 160;
            var width = $(window).width();
            if(right >= width) {
                that.wrap.find('.mc-dropdown .wrapper').css('left', 'initial').css('right', (width-right)+'px');
            }
            */
            //$(this).parents('.mc-btnGroup').find('.button').siblings('div').addClass('hide');
            if(flag) {
                $(this).parents('.mc-btnGroup').find('.button').removeClass('mc-active');
                $(this).siblings('.wrapper').addClass('hide');
            } else {
                $(this).addClass('mc-active');
                $(this).siblings('.wrapper').removeClass('hide');
            }
            that.renderNew();
        })
        this.wrap.on('click', '.wrapper', function(e){
            e.stopPropagation();
        })
        $('body').on('click', function(e){
            that.wrap.find('.wrapper').addClass('hide');
            that.wrap.find('.button').removeClass('mc-active');

        })
        // var saveArr = [];       // 存储选中的数据
        this.wrap.on('click', 'li.option', function(){
            var temp = $(this).text().replace(/^\s+|\s+$/g, '');
            if($(this).hasClass('selected')){
                $(this).removeClass('selected');
                $.each(that.saveArr, function(idx, item){
                    if(temp == item){
                        that.saveArr.splice(idx, 1);
                    }
                })
            }else{
                $(this).addClass('selected');
                that.saveArr.push($(this).text());
                that.saveArr = _.unique(that.saveArr);
            }
        })
        this.wrap.on('click', '.qd', function(e){
            e.stopPropagation();
            if(that.clickCallback){
                that.clickCallback.call(that, that.saveArr, that.yjslayout, that.yjsqlik);
            }
        })
        var oldData = $.extend(true, [], that.option.data);
        var oldContent = $.extend(true, [], that.option.data[1].content);     // 拷贝一个副本
        this.wrap.on('click', '.ss span', function(e){
            e.stopPropagation();
            $(this).removeClass('bg')
                    .siblings().val('')
                                .trigger('focus');
            that.setData(oldData);
            that.renderNew();
            $obj = $(this).parent().parent().find('ul li');
            that.selectedArr(that, that.saveArr);
        })
        this.wrap.on('input', 'input', function(){
            if($(this).val() !== '' && $(this).val()){
                $(this).siblings().addClass('bg');
            }else{
                $(this).parent().siblings().find('li').removeClass('selected');
                $(this).siblings().removeClass('bg');
                that.renderNew();
                that.selectedArr(that, that.saveArr);
                return;
            }
            var arr = [];
            for(var i=0; i<oldContent.length; i++){
                if(oldContent[i].indexOf($(this).val()) > -1){
                    arr.push(oldContent[i]);
                }
            }
            var newData = $.extend(true, [], that.option.data);
            if(arr.length !== 0){
                newData[1].content = arr;
            }else{
                newData[1].content = [];
            }
            that.renderNew(newData);
            that.selectedArr(that, that.saveArr);
            // that.selectedArr($obj, arr, oldContent);
            // saveArr = arr;
        })
    },
    // selectedArr: function($obj, arr, data){
    //     //$.unique(saveArr);
    //     $obj.removeClass('selected');
    //     for(var j=0; j<data.length; j++){
    //         for(var i=0; i<arr.length; i++){
    //             if(data[j] == arr[i]){
    //                 $obj.eq(i).addClass('selected');
    //             }
    //         }
    //     }
    // },
    selectedArr: function(that, saveArr){
        // $obj.removeClass('selected');
        $obj = that.wrap.find('li.option');
        $.each($obj, function(idx, item){
            if(_.indexOf(saveArr, $(item).text()) > -1){
                $($obj[idx]).addClass('selected');
            }
        })
    },
    getSelOption: function(da){
        if(da[1].content.length !== 0){
            temp = '';
            $.each(da[1].content, function(k, v){
                var flag = _.indexOf(da[2].selected, v);
                temp += '<li class="option ' + (flag != -1 ? 'selected' : '') + '"><span title="' + v + '">' + v + '</span></li>';
            })
            return temp;
        }else{
            return '<p style="text-align: center; padding-top: 8px;">无搜索结果</p>';
        }
    },
    setDom: function( dom ){
        this.wrap = this._setDom( dom );
        if( !this.wrap ){
            console.log('配置项缺失');
            return false;
        }
        this.wrap.addClass('mc-selGroup');
        this.bindEvent();
        this.render();
    },
    setOption: function( option ){
        option = _.defaults( option, this.defaultOption );
        this.option = $.extend( option, {});
        this.setData(option.data);
    },
    setData: function( data ){
        this.data = this.data || [];
        data =  data || [];
        var newData = [];
        $.each( data, function( k,v ){
            var idx = _.findLastIndex( newData, {'name':v.name});
            v.value = parseInt( v.value );
            if( idx > -1 ){
                newData[idx].value += v.value;
                console.log(newData[idx].value)
            }else{
                newData.push(v);
            }
        });
        this.data = $.extend( newData, [] );
        if( !this.option ){
            this.option = $.extend( this.defaultOption, {});
        }
        this.option.data = $.extend( newData, [] );

    },
    render: function( data ){
        if( !this.option || !this.option.data ){
            this.option = $.extend( this.defaultOption, {});
        }
        if( !data && !this.data && !this.option.data && !this.option.data.length ){
            this.wrap.html('暂无数据');
            return false;
        }
        // console.log(data);
        var html = '',
            renderData = data ? $.extend( data, []) : $.extend( this.option.data, []);
            that = this;

        var temp = '<div class="mc-dropdown">' + 
                        '<div class="button">' + 
                            renderData[0].type +
                        '</div>' +
                        '<div class="hide wrapper">' + 
                            '<div class="ss"><input type="text" placeholder="请输入关键词"/><span>关闭</span></div>' +
                            '<ul>';

        html = temp + that.getSelOption(renderData) + '</ul><div class="qd">确定</div></div></div>';
        this.wrap.html( html )
    },
    renderNew: function( data ){
        if( !this.option || !this.option.data ){
            this.option = $.extend( this.defaultOption, {});
        }
        if( !data && !this.data && !this.option.data && !this.option.data.length ){
            this.wrap.html('暂无数据');
            return false;
        }
        // console.log(data);
        var html = '',
            renderData = data ? $.extend( data, []) : $.extend( this.option.data, []);
            that = this;

        html = that.getSelOption(renderData);
        this.wrap.find('ul').html( html );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    },
    
})                         

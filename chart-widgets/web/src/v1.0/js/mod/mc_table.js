

/*
 * 医疗可视化平台-表格组件
 * date：2017-01-04
 * 
 */

var mTable = function(){
    if( !(this instanceof mTable) ){
        return new mTable();
    }
}

mTable.prototype = $.extend( new MCBASE(),{
    defaultOption : {
        'id': 1,
        'data': {
            isFirstColHead: true // 第一列是否作为表头
        }
    },
    version:'0.0.1',
    init: function(cfg){        
        cfg = cfg || {};                
        cfg.option = cfg.option || {};
        this.setOption( cfg.option );
        if( cfg.dom ){
            this.setDom( cfg.dom );             
        }
        if( cfg.clickCallback ){
            this.setClickCallback( cfg.clickCallback );
        }   
    },
    setClickCallback:function( fn ){
        this.clickCallback = fn || null;    
    },
    setDom: function( dom ){
        this.wrap = this._setDom( dom );
        if( !this.wrap ){
            console.log('配置项缺失');
            return false;
        }
        //this.bindEvent();
        this.render();
    },
    setOption: function( option ){
        option = _.defaults( option, this.defaultOption );
        this.option = $.extend( this.option, option );
        this.setData(option.data);
    },
    setData: function( data ){
        data = data || {};
        this.option.data = $.extend( this.option.data , data );
    },
    render: function( data ){
        if( !this.option || !this.option.data ){
            this.option = $.extend( this.defaultOption, {});
        }
        // if( !data && !this.data && !this.option.data && !this.option.data.length ){
        if( !data && $.isEmptyObject(this.data) && $.isEmptyObject(this.option)){
            this.wrap.html('暂无数据');
            return false;
        }
        var html = '',
            th = '',
            tr = '',
            td = '',
            renderData = data ? $.extend( data, {}) : $.extend( this.option.data, {}),
            bgColor = renderData.isFirstColHead ? 'background-color:#eee' : '',
            self = this;
        $.each(renderData.title, function(index, item){
            th += '<th>' + item + '</th>';
        })
        $.each(renderData.content, function(index, item){
            td = '';
            $.each(item, function(i, n){
                var showNum = self._formateLargeData(n);
                bgColor = i==0 ? 'background-color:#eee' : '';
                td += '<td style="color: #A2A2A2;' + bgColor + '">' + showNum + '</td>';
            })
            tr += '<tr>' + td + '</tr>';
        })
        tempClass = this.option.flag ? 'special' : '';  
        html += '<table class="mytable ' + tempClass + ' table table-bordered">' + 
                    '<thead style="background-color: #eee;">' +
                        '<tr>' + 
                            th +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                        tr + 
                    '</tbody>' +
                '</table>';
        this.wrap.html( html );        
    },    
});
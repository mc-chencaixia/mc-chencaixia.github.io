

/*
 * 医疗可视化平台-面板组件
 * date：2017-01-04
 * 
 */
var mPanel = function(){
    if( !(this instanceof mPanel) ){
        return new mPanel();
    }
}

mPanel.prototype = $.extend( new MCBASE(), {
    defaultOption : {
        'id': 1,
        'href':'#',
        'targetType':'_blank',
        'data': {}
    },   
    version:'0.0.1',
    init: function(cfg){            
        cfg = cfg || {};                
        cfg.option = cfg.option || {};
        this.prefixClass = cfg.option.prefixClass || null;
        this.unit = cfg.option.unit || '分';
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
    bindEvent: function(){
        var self = this;
        this.wrap.on('click', '.mc-panel-1-content', function(){
            console.log(self.option.data.title);
        });            
    },
    setDom: function( dom ){
        this.wrap = this._setDom( dom );
        if( !this.wrap || !this.wrap.length  ){
            console.log('配置项缺失');
            return false;
        }
        if( this.prefixClass && this.prefixClass != ''){
            this.wrap.addClass( this.prefixClass );
        }
        this.bindEvent();
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
        this.data = $.extend( data, {} );
    },
    render: function( data ){
        if( !this.wrap || !this.wrap.length  ){
            console.log('配置项缺失');
            return false;
        }        
        // if( !data && !this.data && !this.option.data && !this.option.data.length ){
        if( !data && $.isEmptyObject(this.data) && $.isEmptyObject(this.option)){
            this.wrap.html('暂无数据');
            return false;
        }
        var html = '',
            renderData = data ? $.extend( data, {}) : $.extend( this.option.data, {}),
            d = renderData;
        d.showNum = this._formatNum( d.num );                
        html += '<div class="mc-panel-1 each-panel">' + 
                    '<div class="mc-panel-1-content" style="background: url(../../src/images/health_images/images/panelImg/' + d.imgType + '/' + d.colorType + '.png) no-repeat right center;">' +
                        '<h5>' + d.title + '</h5>' +
                        '<p title="' + d.showNum + d.unit + '">' + d.showNum + '<span>' + d.unit + '</span></p>' +
                    '</div>' +
                    '<div class="mc-panel-1-footer mc-panel-1-footer-' + d.colorType + '">' +
                        '<p>同比</p>' +
                        '<p><span class="' + d.trend + '"></span><span>' + d.tongbi + '</span></p>' +
                    '</div>' +
                '</div>';
        this.wrap.html( html );        
    },
});
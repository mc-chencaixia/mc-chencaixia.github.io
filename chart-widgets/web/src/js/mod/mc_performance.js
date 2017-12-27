

/*
 * 医疗可视化平台-绩效组件
 * date：2017-01-04
 * 
 */
var mPerformance = function(){
    if( !(this instanceof mPerformance) ){
        return new mPerformance();
    }
}

mPerformance.prototype = $.extend( new MCBASE(), {
    defaultOption : {
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
        d.df = this._formateLargeData( d.df );                
        html += '<div class="doctor">' + 
                    '<div class="docTitle">' + 
                        '<h3>' + d.name + '</h3>' +
                        '<h4>本期绩效综合得分</h4>' +
                    '</div>' +
                    '<div class="docImg">' +
                        '<img src="../../src/images/health_images/images/doctorImg.png" alt="">' +
                    '</div>' +
                    '<div class="docContent">' +
                        '<div class="pm">' +
                            '<h4>科室排名</h4>' +
                            '<p>' + d.pm + '</p>' +
                        '</div>' +
                        '<div class="df">' +
                            '<h4>绩效综合得分</h4>' +
                            '<h3>' + d.df + '</h3>' +
                        '</div>' +
                        '<div class="tb">' +
                            '<h4>排名同比</h4>' +
                            '<p class="' + d.trend + '">' + d.tb + '</p>' + 
                        '</div>' +
                    '</div>' +
                '</div>';
        this.wrap.html( html );        
    },
});
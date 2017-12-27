/*
 * 医疗可视化平台-基础类
 * date：2017-01-22
 * 
 */
var MCBASE = function(){
    this.version = '0.0.1';
};

MCBASE.prototype = {
    
    _init: function( ){
        if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
        this._dom_ = opt.dom;
        this._chart = echarts.init(this._dom_);                 
    },    
    _getMod : function( ){
        return this;
    },
    _setDom : function(  dom ){
        if( !dom || !dom.length ){
            console.log('配置项缺失');
            return null;
        }
        if( typeof( dom ) == 'string' ){
            return $(dom).eq(0);
        }else{
            if( dom.length && dom.length >= 1){
                return dom.eq(0);
            }
        }
        if( !this.wrap || !this.wrap.length  ){
            console.log('配置项缺失');
            return null;
        }
    },
    _formateLargeData : function( largeData, fixed ){
        var formateData = '';
        if( !largeData ){
            return formateData;
        }
        if( isNaN(largeData) ){
            return formateData + largeData;
        }
        if( typeof(largeData) === 'string'){
            largeData = parseFloat(largeData);
        }            
        if( largeData < 10000 ){
            if((largeData+'').indexOf('.')>-1) {
                return formateData + largeData.toFixed(fixed || 2);
            }

            return formateData + largeData
        } 
        if( largeData > 10000 * 10000 ){
            formateData = ( largeData / 10000 / 10000 ).toFixed(fixed || 2) + '亿';
        }
        if( 10000 * 10000 > largeData  &&  largeData > 10000  ){
            formateData = ( largeData / 10000 ).toFixed(fixed || 2) + '万';
        } 

        if(!formateData) {
            formateData = largeData;
        }
        return formateData;
    },
    _formatNum : function(str){
        var newStr = "";
        var count = 0;
         
        if(str.indexOf(".")==-1){
            for(var i=str.length-1;i>=0;i--){
                if(count % 3 == 0 && count != 0){
                    newStr = str.charAt(i) + "," + newStr;
                }else{
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
           str = newStr; //自动补小数点后两位
        }
        else
        {
           for(var i = str.indexOf(".")-1;i>=0;i--){
                if(count % 3 == 0 && count != 0){
                    newStr = str.charAt(i) + "," + newStr;
                }else{
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str).substr((str).indexOf("."),3);
        }
        return str;
    }

}
   


/*
 * 医疗可视化平台-继承示例类
 * date：2017-01-23
 * 继承MCBASE类
 * 

var mChild = function(){
    MCBASE.call(this);
};

mChild.prototype = new MCBASE();

mChild.prototype.init = function( data ){
    console.log('mChild init');
    this.formateLargeData( data );
    // this.formateLargeData(123455678);
    // this.formateLargeData(1234578);
}
var myChildInstance = new mChild();
myChildInstance.init();
myChildInstance.formateLargeData(123455678);
myChildInstance.formateLargeData(1234578);
var formatedNum = '';
formatedNum = myChildInstance.formateLargeData('234578');   
 
 *
 *
 */

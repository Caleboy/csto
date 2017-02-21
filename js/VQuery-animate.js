$().extend('animate',function(json){
    for(var i=0;i<this.elements.length;i++){
        startMove(this.elements[i],json);
    }

    function getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj,false)[attr];
        }
    }

    function startMove(obj,json,time,fn){
        clearInterval(obj.timer);
        obj.timer=setInterval(function(){
            var aStop=true;
            for(var attr in json){
                //设置初始值
                var iCur=0;
                if(attr=='opacity'){
                    iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
                }else{
                    iCur=parseInt(getStyle(obj,attr));
                }

                //设定速度
                var iSpeed=(json[attr]-iCur)/4;
                iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

                //判断停止
                if(iCur!=json[attr]){
                    aStop=false;
                }

                if(attr=='opacity'){
                    obj.style.filter='alpha(opacity:'+iCur+iSpeed+')';
                    obj.style.opacity=(iCur+iSpeed)/100;
                }else{
                    obj.style[attr]=iCur+iSpeed+'px';
                }
            }
            if(aStop){
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }
        },30);
    }
});
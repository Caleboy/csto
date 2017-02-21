$().extend('drag',function(){
    for(var i=0;i<this.elements.length;i++){
        iDrag(this.elements[i]);
    }
    function iDrag(oDiv){
        oDiv.onmousedown=function(ev){
            var e=ev||event;
            var disX=e.clientX-oDiv.offsetLeft;
            var disY=e.clientY-oDiv.offsetTop;
            document.onmousemove=function(ev){
                var e=ev||event;
                oDiv.style.left=e.clientX-disX+'px';
                oDiv.style.top=e.clientY-disY+'px';
            }
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
            }
        }
    }
});
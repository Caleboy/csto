function myAddEvent(obj,sEv,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+sEv,function(ev){
            if(fn.call(obj)==false){
                ev.cancelBubble=true;
                return false;
            }
        });
    }else{
        obj.addEventListener(sEv,function(ev){
            if(fn.call(obj)==false){
                ev.cancelBubble=true;
                ev.preventDefault();
            }
        },false);
    }
}

function getByClass(oParent,oClass){
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    for(var i=0;i<aEle.length;i++){
        if(aEle[i].className==oClass){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}

function appendArr(arr1,arr2){
    for(var i=0;i<arr2.length;i++){
        arr1.push(arr2[i]);
    }
}

function getIndex(obj){
    var aBrother=obj.parentNode.children;
    for(var i=0;i<aBrother.length;i++){
        if(aBrother[i]==obj){
            return i;
        }
    }
}




function VQuery(vArg){
    this.elements=[];
    switch(typeof vArg){
        case 'function':
            myAddEvent(window,'load',vArg);
            break;
        case 'string':
            switch(vArg.charAt(0)){
                case '#':   //id
                    var od=document.getElementById(vArg.substring(1));
                    this.elements.push(od);
                    break;
                case '.':   //class
                    this.elements=getByClass(document,vArg.substring(1));
                    break;
                default:    //tagName
                    this.elements=document.getElementsByTagName(vArg);
            }
            break;
        case 'object':
            this.elements.push(vArg);
            break;
    }
}

VQuery.prototype.click=function(fn){
    for(var i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],'click',fn);
    }
    return this;
}

VQuery.prototype.hover=function(fnOver,fnOut){
    for(var i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],'mouseover',fnOver);
        myAddEvent(this.elements[i],'mouseout',fnOut);
    }
    return this;
}

VQuery.prototype.toggle=function(){
    var _arguments=arguments;
    for(var i=0;i<this.elements.length;i++){
        addToggle(this.elements[i]);
    }

    function addToggle(obj){
        var count=0;
        myAddEvent(obj,'click',function(){
            _arguments[count++%_arguments.length].call(obj);
        });
    }
    return this;
}

VQuery.prototype.css=function(attr,val){
    if(arguments.length==2){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style[attr]=val;
        }
    }else{
        if(typeof attr=='string'){
            return getStyle(this.elements[0],attr);
        }else{
            for(var i=0;i<this.elements.length;i++){
                for(var k in attr){
                    this.elements[i].style[k]=attr[k];
                }
            }
        }
    }
    return this;
}

VQuery.prototype.attr=function(attr,value){
    if(arguments.length==2){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i][attr]=value;
        }
    }else{
        return this.elements[0][attr];
    }
    return this;
}

VQuery.prototype.show=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='block';
    }
    return this;
}

VQuery.prototype.hide=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='none';
    }
    return this;
}

VQuery.prototype.eq=function(index){
    return $(this.elements[index]);
}

VQuery.prototype.find=function(sArg){
    var aResult=[];
    for(var i=0;i<this.elements.length;i++){
        switch(sArg.charAt(0)){
            case '.':
                var aEle=getByClass(this.elements[i],sArg.substring(1));
                aResult=aResult.concat(aEle);
                break;
            default:
                var aEle=this.elements[i].getElementsByTagName(sArg);
                appendArr(aResult,aEle);
        }
    }
    var newVQuery=$();
    newVQuery.elements=aResult;
    return newVQuery;
}

VQuery.prototype.index=function(){
    return getIndex(this.elements[0]);
}

//添加插件
VQuery.prototype.extend=function(name,fn){
    VQuery.prototype[name]=fn;
}


function $(vArg){
    return new VQuery(vArg);
}
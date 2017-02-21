function getStyle(obj,attr){
		//IE兼容
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	}

	var timer=null;
	function move(obj,json,func,time){
		if(time===undefined){
			time=30;
		}
		//清除定时器
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			//设定标志位置
			var flag=true;

			//遍历json对象
			for(var attr in json){
				//1.初始值
				var current=0;
				//判断
				if(attr=='opacity'){
					current=parseInt(parseFloat(getStyle(obj,attr))*100);
				}else{
					current=parseInt(getStyle(obj,attr));
				}
				//2.确定速度
				var speed=(json[attr]-current)/8;
				//速度方向
				speed=speed>0?Math.ceil(speed):Math.floor(speed);

				//判断停止
				if(current!=json[attr]){
					flag=false;
				}

				if(attr=='opacity'){
					obj.style.filter='alpha(opacity:'+current+speed+')';
					obj.style.opacity=(current+speed)/100;
				}else{
					obj.style[attr]=current+speed+'px';
				}

			}

			//判断清除定时器
			if(flag){
				clearInterval(obj.timer);
				//判断回调函数
				if(func!==undefined){
					func();
				}
			}
		},time);
	}

function ID(id){
	return document.getElementById(id);
}

$(function(){
	$('#guide').css('display','none');
	$('#container').css('display','block');
	$('#guide').animate({opacity:0});
	
	/***********
	 *顶部导航栏
	 **********/
	// console.log(document.documentElement.clientWidth);
	//全局标志位
	var bool=false;
	var boole=true;
	//获取节点
	var navClient=$('.nav_con');

	var navLink=ID('header').getElementsByClassName('v_nav_link');

	//dom距离页面顶部高度
	var recommondTop=ID('recommond').offsetTop;
	var newsTop=ID('news').offsetTop;
	var rightModuleTop=ID('rightModule').offsetTop;
	var normalTop=ID('normal').offsetTop;
	var footerTop=ID('footer').offsetTop;
	
	var newsHeight=ID('news').offsetHeight;
	var wpHeight=ID('wp-rotate-lit').offsetHeight;
	console.log(wpHeight)

	var eTimer=null;
	var iStop=true;

	window.onscroll=function(ev){
		var e=ev||event;
		e.preventDefault();
		//可视区高度
		var clHeight=document.documentElement.clientHeight;
		//滚动条高度
		var winClientHeight=document.documentElement.scrollTop || document.body.scrollTop;

		var mainClient=ID('main').offsetTop;

		//nav_link 跳转
		for(var i=0;i<navLink.length;i++){
			navLink[i].className='v_nav_link';
		}
		if(winClientHeight<=recommondTop+clHeight/2){
			navLink[0].className='v_nav_link is_active';
		}else if(winClientHeight<=newsTop+clHeight/2){
			navLink[1].className='v_nav_link is_active';
		}else if(winClientHeight<=rightModuleTop+clHeight/2){
			navLink[2].className='v_nav_link is_active';
		}else if(winClientHeight<=normalTop+clHeight/2){
			navLink[3].className='v_nav_link is_active';
		}else{
			navLink[5].className='v_nav_link is_active';
		}
		//在滚动中可以停止
		if(!iStop){
			clearInterval(eTimer);
		}
		iStop=false;

		//区域一
		if(winClientHeight<=mainClient){
			navClient.animate({height:0});
		}else{
			navClient.animate({height:38});
			bool=true;
		}
		if(bool&&boole){
			boole=false;
			doMask(getMask[0],10,5,function(){
				picP.eq(0).animate({opacity:100});
				doMask(getMask[1],20,10,function(){
					picP.eq(1).animate({opacity:100});
				});
				doMask(getMask[2],10,5,function(){
					picP.eq(2).animate({opacity:100});
				});
			});
		}

		//区域二
		cFixe(clHeight,winClientHeight);

		if(winClientHeight<newsTop){
			ID('wp-rotate-lit').style.top=0
		}else{
			ID('wp-rotate-lit').style.top=-parseInt((winClientHeight-newsTop)*wpHeight/newsHeight)+400+'px';
		}
		
		return false;
	}

	//区域跳转
	for(var i=0;i<navLink.length;i++){
		navLink[i].onclick=(function(j){
			return function(){
				var eArr=[recommondTop,newsTop,rightModuleTop,normalTop,footerTop];
				scroll(eArr[j]);
			}
		})(i);
	}
	function scroll(objScroll){
		clearInterval(eTimer);
		eTimer=setInterval(function(){
			//滚动条高度
			var scTop=document.body.scrollTop||document.documentElement.scrollTop;
			//设置速度
			var speed=(objScroll-scTop)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			document.body.scrollTop+=speed;
			iStop=true;
			if(speed==0){
				clearInterval(eTimer);
			}
		},30);
	}

	//区域一
	var getMask=ID('main').getElementsByClassName('g_mask');
	var picP=$('#recommond_video_eye').find('p');
	
	function doMask(o,x,y,func){
		//显示对象
		o.style.display='block';
		//定义蒙版数组
		var maskArr=[];
		//定义变量
		var m=1;
		var timer=null;
		//绘制蒙版
		for(var i=0;i<x*y;i++){
			var oDiv=document.createElement('div');
			oDiv.style.position='absolute';
			oDiv.style.backgroundColor='#ececec';
			oDiv.style.width=o.offsetWidth/x+'px';
			oDiv.style.height=o.offsetHeight/y+'px';
			o.appendChild(oDiv);
			oDiv.style.left=(o.offsetWidth/x)*(i%x)+'px';
			oDiv.style.top=(o.offsetHeight/y)*parseInt(i/x)+'px';
			maskArr.push(oDiv);
		}
		
		//蒙版透明
		timer=setInterval(function(){
			var flag=true;
			for(var i=0;i<m;i++){
				for(var j=m-1;j<maskArr.length;j+=(x-1)){
					if(j<=m*(x-1)-1){
						maskArr[j].style.background='#C4DFDC';
						move(maskArr[j],{opacity:0});
						if(j>=x*y-1){
							flag=false;
						}
					}
				}
			}
			m++;
			if(!flag){
				clearInterval(timer);
				//判断回调函数
				if(func!==undefined){
					func();
				}
			}
		},50);
	}

	//区域二

	function cFixe(clHeight,scrollHeight){
		
		var newsClient=ID('news').offsetTop+clHeight;
		var dLi=$('#wp-fixed').find('.wp-domain').find('li');
		var vWidth=document.documentElement.clientWidth+12;
		dLi.attr('className','');
		if(scrollHeight<newsClient){
			$('#wp-fixed').attr('className','news-fixed');
			$('#wp-rotate').css('left',0);
		}else if(scrollHeight>=newsClient&&scrollHeight<newsClient+clHeight*3){
			$('#wp-fixed').attr('className','news-fixed f-fixe');
			if(scrollHeight>=newsClient&&scrollHeight<newsClient+clHeight){
				if(parseInt($('#wp-rotate').css('left'))!==0){
					$('#wp-rotate').animate({left:0});
				}
				
				dLi.eq(0).attr('className','d-active');
			}else if(scrollHeight>=newsClient+clHeight&&scrollHeight<newsClient+clHeight*2){
				if(parseInt($('#wp-rotate').css('left'))!==-vWidth){
					$('#wp-rotate').animate({left:-vWidth});
				}
				
				dLi.eq(1).attr('className','d-active');
			}else{
				if(parseInt($('#wp-rotate').css('left'))!==-vWidth*2){
					$('#wp-rotate').animate({left:-vWidth*2});
				}
				
				dLi.eq(2).attr('className','d-active');
			}
		}else{
			$('#wp-fixed').attr('className','news-fixed f-bottom');
			
			$('#wp-rotate').css('left',-vWidth*2+'px');
		}
	}

	//区域三
	var rmItem=$('#rightModule').find('.rm_item');

	rmItem.find('.module_mask').css({left:parseInt(rmItem.eq(0).css('width'))/2+'px',top:parseInt(rmItem.eq(0).css('height'))/2+'px'});
	// var moduleMask=$('#rightModule').find('.rm_item').find('.module_mask');
	rmItem.hover(function(){
		var self=$(this);
		var oWidth=parseInt(self.css('width'))/2;
		var oHeight=parseInt(self.css('height'))/2;
		self.find('.module_mask').animate({width:oWidth*2,height:oHeight*2,left:0,top:0});
		self.find('.module_mask').find('h4').animate({lineHeight:oHeight*2});
	},function(){
		var self=$(this);
		var oWidth=parseInt(self.css('width'))/2;
		var oHeight=parseInt(self.css('height'))/2;
		self.find('.module_mask').animate({width:0,height:0,left:oWidth,top:oHeight});
		self.find('.module_mask').find('h4').animate({lineHeight:0});
	});
});
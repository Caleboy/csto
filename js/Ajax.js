function Ajax(getType){ 

	//创建一个新对象 
	var ajax = new Object();

	//判断传递进来的数据类型 
	ajax.getType = getType ? getType.toUpperCase() : 'HTML';
	ajax.url = '';//url地址
	ajax.sendContent = '';//接收发送过来的数据
	ajax.getXMLHttpRequest = function(){ 
		//1.自定义一个对象来装载生成的ajax对象 
			var aj = false;

			//2.封装原生ajax对象 

			//分两种情况 
			//1.非IE(除了IE7和IE8) 
			if(window.XMLHttpRequest){ 
				aj = new XMLHttpRequest();

				//MIME类型支持判断 
				if(aj.overrideMimeType){ 
					aj.overrideMimeType('text/xml');
				}
			//IE
			}else if(window.ActiveXObject)
			{ 
				//区分不同版本的IE
				var versions = [ 
					'Microsoft.XMLHTTP',
					'MSXML.XMLHTTP',
					'MSXML2.XMLHTTP.3.0',
					'Msxml2.XMLHTTP.4.0',
					'Msxml2.XMLHTTP.5.0',
					'Msxml2.XMLHTTP.6.0',
					'Msxml2.XMLHTTP.7.0'
				];

				//遍历版本数组 

				for(var i=0;i<versions.length;i++){ 
					try{ 
						//尝试执行下面的代码
						aj = new ActiveXObject(versions[i]);

						if(aj){ 
							return aj;
						}
					}catch(e){ 
						//抛异常
						aj = false;
					}
				}

			}

			return aj;
	};
	ajax.resHandle = '';//接收回调函数
	ajax.XMLHttpRequest = ajax.getXMLHttpRequest();

	//封装get方法 
	ajax.get = function(url,resHandle){ 
		//将传递进来的url参数赋值给全局对象属性
		ajax.url = url;

		//判断用户是否传递了回调函数 
		if(resHandle != null){ 

			//处理ajax监听 
			ajax.XMLHttpRequest.onreadystatechange = ajax.doHandle;
			
			ajax.resHandle = resHandle;

		}

		if(window.XMLHttpRequest){ 
			ajax.XMLHttpRequest.open("get",ajax.url);
			ajax.XMLHttpRequest.send(null);
		}else{ 
			ajax.XMLHttpRequest.open("get",ajax.url,true);
			ajax.XMLHttpRequest.send();
		}


	};

	//封装post方法
	ajax.post = function(url,sendContent,resHandle){ 
		//将用户传递进来的url赋值给全局ajax对象的url属性 
		ajax.url = url;

		//判断用户传递进来的数据参数 
		if(typeof sendContent == "object"){ 
			//JSON对象

			//遍历对象 
			var str = '';
			for(var i in sendContent){ 
				//name=lisi&age=20
				str+=i+"="+sendContent[i]+"&";
			}

			ajax.sendContent = str.substr(0,str.length-1);

		}else{ 
			//不是对象 
			ajax.sendContent = sendContent;
		}

		//处理回调函数 
		if(resHandle != null){ 
			//处理监听事件 
			ajax.XMLHttpRequest.onreadystatechange = ajax.doHandle;
		
			//将用户传递进来的回调函数赋值给全局属性 
			ajax.resHandle = resHandle;
		}

		//处理ajax请求 
		ajax.XMLHttpRequest.open("post",url);
		ajax.XMLHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.XMLHttpRequest.send(ajax.sendContent);

	};

	//处理ajax监听事件
	ajax.doHandle = function(){ 
		//判断状态值
		if(ajax.XMLHttpRequest.readyState == 4){ 
			if(ajax.XMLHttpRequest.status == 200){ 
				if(ajax.getType == 'HTML'){ 
					ajax.resHandle(ajax.XMLHttpRequest.responseText);
				}
			}
		}
	}

	return ajax;

}

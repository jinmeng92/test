window.$=HTMLElement.prototype.$=function(selector){
	var elems=(this==window?document:this).querySelectorAll(selector);
	if(!elems){//如果没找到结果
		return null;
	}else if(elems.length==1){//如果值找到一个结果
		return elems[0];
	}else{
		return elems;
	}
}
window.onload=function(){
	var lis=$(".app_jd,.service");
	for(var i=0;i<lis.length;i++){
		lis[i].addEventListener("mouseover",function(){
			this.$("."+this.className+">a").className="hover";
			this.$('[id$="_items"]').style.display="block";
		},false);
		lis[i].addEventListener("mouseout",function(){
			this.$("."+this.className+">a").className="";
			this.$("[id$='_items']").style.display="none";
		},false);
	}

	/*全部商品分类*/
	$("#category").onmouseover=$("#category").onmouseout=function(){
		$("#cate_box").style.display=
			$("#cate_box").style.display=="block"?"":"block";
	}
	var lis=$("#cate_box>li");
	for(var i=0;i<lis.length;i++){
		lis[i].addEventListener("mouseover",function(){
			this.$("h3").className="hover";
			this.$(".sub_cate_box").style.display="block";
		},false);
		lis[i].addEventListener("mouseout",function(){
			this.$("h3").className="";
			this.$(".sub_cate_box").style.display="none";
		},false);
	}

	/*商品详情中的标签页*/
	var ul=$("#product_detail>.main_tabs");
	ul.onclick=function(){
		var e=window.event||arguments[0];
		var target=e.srcElement||e.target;
		if(target.nodeName=="A"){
			$("#product_detail>.main_tabs>.current").className="";
			target.parentNode.className="current";
			var contents=$("#product_detail>.main_tabs~[id^='product_']");
			if(target.dataset.i!=-1){
				for(var i=0;i<contents.length;i++){
						contents[i].style.display=i!=target.dataset.i?"none":"block";					
				}
			}else{
				for(var i=0;i<contents.length;i++){
						contents[i].style.display="none";				
				}
			}
		}
	}
	picture.init();
}
//封装放大图功能的对象
var picture={
	LIWIDTH:62,//每个小图片li的固定宽度
	LEFT:20,
	ul:null,//包含小图片li的ul，是移动主体
	aback:null,//左侧按钮-->右移
	afor:null,//右侧按钮-->左移
	moved:0,//ul左移的次数，每左移一次+1
	liCount:0,//记录li的总数
	maskH:0,
	maskW:0,
	maxTop:0,
	maxLeft:0,

	init:function(){
		var self=this;
		self.ul=$("#icon_list");
		self.liCount=$("#icon_list>li").length;
		self.aback=$("#preview>h1>a:first-child");
		self.afor=$("#preview>h1>a:first-child+a");
		self.aback.onclick=self.afor.onclick=function(){
			if(this.className.indexOf("_disabled")==-1){
				self.moved+=this.className=="forward"?1:-1;
				self.ul.style.left=-self.moved*self.LIWIDTH+self.LEFT+"px";
				if(self.moved==0){
					self.aback.className+="_disabled";
				}else if(self.liCount-self.moved==5){
					self.afor.className+="_disabled";
				}else{
					self.aback.className="backward";
					self.afor.className="forward";
				}
			}
		}
		self.ul.addEventListener("mouseover",function(){
			var e=window.event||arguments[0];
			var target=e.srcElement||e.target;
			if(target.nodeName=="IMG"){
				var src=target.src;
				var i=src.lastIndexOf(".");
				$("#mImg").src=src.slice(0,i)+"-m"+src.slice(i);
			}
		},false);
		$("#superMask").onmouseover=$("#superMask").onmouseout=function(){
			if($("#mask").style.display=="block"){
				$("#mask").style.display="none";
				$("#largeDiv").style.display="none";
			}else{
				$("#mask").style.display="block";
				$("#largeDiv").style.display="block";
			}
			var src=$("#mImg").src;
			var i=src.lastIndexOf(".");
			$("#largeDiv").style.backgroundImage=
				"url("+src.slice(0,i-2)+"-l"+src.slice(i)+")";
		}
		var style=getComputedStyle($("#mask"));
		self.maskH=parseFloat(style.height);
		self.maskW=parseFloat(style.width);
		style=getComputedStyle($("#superMask"));
		self.maxTop=parseFloat(style.height)-self.maskH;
		self.maxLeft=parseFloat(style.width)-self.maskW;
		$("#superMask").onmousemove=function(){
			var e=window.event||arguments[0];
			var x=e.offsetX,y=e.offsetY;
			var top=y-self.maskH/2;
			top=top<0?0:top>self.maxTop?top=self.maxTop:top;
			var left=x-self.maskW/2;
			left=left<0?0:left>self.maxLeft?left=self.maxLeft:left;
			$("#mask").style.top=top+"px";
			$("#mask").style.left=left+"px";
			//修改largeDiv的背景位置
			$("#largeDiv").style.backgroundPosition=
					-left*16/7+"px"+" -"+top*16/7+"px";
		}
	}
}
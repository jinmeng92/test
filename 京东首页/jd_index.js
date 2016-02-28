/*封装$*/
window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems==null?null:elems.length==1?elems[0]:elems;
}

/*广告图片数组*/
var imgs=[
    {"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];

var adv={
	LIWIDTH:670,
	DURATION:500,//规定手动移动的动画总时长
	WAIT:3000,//自动轮播等待的时长
	STEPS:100,//动画移动总步数
	timer:null,
	canAuto:true,//设置是否可以自动轮播
	init:function(){
		var self=this;
		$("#imgs").style.width=self.LIWIDTH*imgs.length+"px";

		self.updateView();
		$("#slider").addEventListener("mouseover",function(){
			self.canAuto=false;
		},false);
		$("#slider").addEventListener("mouseout",function(){
			self.canAuto=true;
		},false);
		self.automove();
		$("#indexs").onmouseover=function(){
			var e=window.event||arguments[0];
			var target=e.target||e.srcElement;
			if(target.nodeName=="LI"&&(target.innerHTML-1!=imgs[0].i)){
				$("#indexs>.hover").className="";
				target.className="hover";
				var n=target.innerHTML-1-imgs[0].i;
				self.move(n);
			}
		}
	},
	updateView:function(){
		for(var i=0,lis=[],idxs=[];i<imgs.length;i++){
			lis[i]="<li data-i='"+imgs[i].i+"'><img src='"+imgs[i].img+"'></li>";
			idxs[i]="<li>"+(i+1)+"</li>";
		}
		$("#imgs").innerHTML=lis.join("");
		$("#indexs").innerHTML=idxs.join("");
		$("#indexs>.hover").className="";
		$("#indexs>li")[imgs[0].i].className="hover";
	},
	automove:function(){
		var self=this;
		timer=setTimeout(function(){
			if(self.canAuto){
				self.moveStep(1);
			}else{
				self.automove();
			}
		},self.WAIT);
	},
	//移动任意个li的方法————手动轮播
	move:function(n){//n-->要移动的li个数，左移为正
		clearTimeout(this.timer);
		this.timer=null;
		if(n<0){
			imgs=imgs.splice(imgs.length+n,-n).concat(imgs);
			this.updateView();
			$("#imgs").style.left=n*this.LIWIDTH+"px";
		}
		this.moveStep(n);
	},
	//将ul移动一步
	moveStep:function(n){//n-->要移动的li个数，左移为正
		var self=this;
		var step=self.LIWIDTH*n/self.STEPS;
		var style=getComputedStyle($("#imgs"));
		var left=parseFloat(style.left)-step;
		$("#imgs").style.left=left+"px";
		if(n>0&&left>-self.LIWIDTH*n||n<0&&left<0){
			self.timer=setTimeout(function(){self.moveStep(n);},self.DURATION/self.STEPS);
		}else{
			$("#imgs").style.left=0+"px";
			self.automove();
			if(n>0){
				imgs=imgs.concat(imgs.splice(0,n));
				self.updateView();
			}
		}
	}
}
window.addEventListener("load",function(){adv.init();},false);

















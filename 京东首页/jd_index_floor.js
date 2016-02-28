window.addEventListener("load",function(){
	floor.init();
},false);
HTMLElement.prototype.getElementTop=function(){
	var top=this.offsetTop;
	var curr=this.offsetParent;
	while(curr!=null){
		top+=curr.offsetTop;
		curr=curr.offsetParent;
	}
	return top;
}
var floor={
	init:function(){
		var self=this;
		window.addEventListener("scroll",function(){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			var spans=$("div.floor>header>span");
			for(var i=0;i<spans.length;i++){
				var spanTop=spans[i].getElementTop();
				if(spanTop>scrollTop+100&&spanTop<scrollTop+window.innerHeight-100){
					spans[i].className="hover";
				}else{
					spans[i].className="";
				}
			}
			self.elevState();
		},false);
		$("#elevator>ul").addEventListener("mouseover",function(){
			var e=window.event||arguments[0];
			var target=e.srcElement||e.target;
			if(target.nodeName=="A"&&
				target.className!="etitle"){
					target.style.display="none";
					target.parentNode.$(".etitle").style.display="block";
				
			}
		},false);
		// $("#elevator>ul").addEventListener("mouseout",function(){
		// 	var e=window.event||arguments[0];
		// 	var target=e.srcElement||e.target;
		// 	if(target.nodeName=="A"&&
		// 		target.className!="etitle"&&
		// 		$(target.href.slice(-3)+">header>span").className!="hover"){
		// 			target.style.display="none";
		// 			target.parentNode.$("a:first-child").style.display="block";
				
		// 	}
		// },false);
		
	},
	elevState:function(){
		$("#elevator").style.display=$("div.floor>header>span.hover").length!=0?"block":"none";
		var spans=$("div.floor>header>span");
		var lis=$("#elevator>ul>li");
		for(var i=0;i<spans.length;i++){
			var li=lis[i];
			if(spans[i].className=="hover"){
				li.$("a:first-child").style.display="none";
				li.$("a:first-child+a").style.display="block";
			}else{
				li.$("a:first-child").style.display="block";
				li.$("a:first-child+a").style.display="none";
			}
		}
	}
}
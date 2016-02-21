/*
Creator:Leopen;
CreateTime:2016-02-09 23:16:00;
Editor:Leopen;
EditTime:2016-02-15 08:50:00;
*/

//slider轮播
$(function(){
	var $sliderList = $("#slider-show li");
	var index = 0;
	var len = $sliderList.length;
	setInterval(function(){
		showImg(index);
		index++;
		if(index == len){index = 0;}
	},5000);
})

function showImg(index){
	$("#slider-show li").eq(index).fadeIn(1000)
	.siblings().fadeOut(1000);
}

//处于所在页面时高亮显示当前链接
$(function(){
	var nowPageName = window.location.href;
	var $linkList = $("#js_nav li a");
	//这个for是否可以优化？主要是有没有一个与indexOf()这个方法相反的方法。
	for(var i = 0; i < $linkList.length; i ++){
		var nowListItem = $linkList.eq(i);
		nowPageName.indexOf(nowListItem.attr("href")) != -1 ? nowListItem.addClass("active"):nowListItem.removeClass("active");
	}	
})

//about页面侧边栏布局随滚动变化
$(function(){
	var $contentWrap = $("#wrap-content");
	var $leftWrap = $("#wrap-left");
	var $leftLinkList = $("#wrap-left li a");
	var $rightSecList = $("#wrap-content section");
	$leftLinkList.first().css("background-color","#fff");

	$(document).scroll(function(){
		$contentWrap.get(0).getBoundingClientRect().top <=0 ? $leftWrap.css({"position":"fixed","top":"0px"}) : $leftWrap.css("position","relative");
		//改变导航背景颜色,是否可以优化；
		for(var i=0; i<$leftLinkList.length; i++){
			var leftLink = $leftLinkList.eq(i).get(0);
			var rightSec = $rightSecList.eq(i).get(0);
			var secTop = rightSec.getBoundingClientRect().top;
			var secBottom = rightSec.getBoundingClientRect().bottom;
			var linkTop = leftLink.getBoundingClientRect().top;
			var linkBottom = leftLink.getBoundingClientRect().bottom;
			if(secTop <= linkTop && secBottom > linkBottom){
				$leftLinkList.eq(i).css("background-color","#fff");

			}else{
				$leftLinkList.eq(i).css("background-color","lightgreen");

			}
		}
	})
})

//special list点击弹出新div并显示详情
$(function(){
	var $container = $("#js_special");
	var $list = $("#js_special li a");
	
	$list.click(function(){
		//新建弹出窗口
		var $coverDiv = "<div id='cover-screen'></div>";	
		var $specialShowDiv = "<div id='special-show'><div class='main'><img><p></p></div><div class='else'><p>title here</p><a></a></div></div>";
		$("body").append($coverDiv).append($specialShowDiv);
		$("#cover-screen").css({"width":"100%","height":$("html").outerHeight()});
		$("#special-show").css({"width":"50%","height":"50%"});
		$("#special-show .main").css("height","100%");		
		//为弹出的窗口赋值
		var myUrl = $(this).attr("href");
		var myTitle = $(this).find("h3").html();
		var myDescription = $(this).find("p").html();
		$("#special-show .main img").attr("src",myUrl);
		$("#special-show .main p").html(myDescription);
		$("#special-show .else p").html(myTitle);		
		//为弹出的窗口添加关闭事件
		$("#special-show .else a").click(function(){
			$("#special-show").remove();
			$("#cover-screen").remove();
			return false;
		})
		return false;
	})
})

//特产分类筛选
$(function(){
	$("#list-variety li").click(function(){
		$(this).attr("data-filter") == "*" ? $("#js_special li").show() : $("#js_special li").hide().filter("."+$(this).attr("data-filter")).show();
		return false;
	})
})
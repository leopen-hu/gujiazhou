/*
Creator:Leopen;
CreateTime:2016-02-09 23:16:00;
Editor:Leopen;
EditTime:2016-02-09 23:16:00;
*/

addLoadEvent(showSpecialDiv);
addLoadEvent(highLightPage);
addLoadEvent(sliderPlay);
addLoadEvent(wrapLeftPosition);
addLoadEvent(changeStyleByCondition);

//添加window.onload事件
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}
	else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

//添加window.onscroll事件
function addScrollEvent(func){
	var oldScroll = window.onscroll;
	if(typeof window.onscroll != "function"){
		window.onscroll = func;
	}
	else{
		window.onscroll = function(){
			oldScroll();
			func();
		}
	}
}

//slider轮播
function sliderPlay(){
	if(!document.getElementById("slider-show")) return false;
	var container = document.getElementById("slider-show");
	var list = container.getElementsByTagName("li");
	var currentLi;
	var nextLi;
	var timer = setInterval(timePlayer,5000);
	
	initOpacity(list);
	
	function timePlayer(){		
		getCurrentLi();
		fadeOut(currentLi);
		fadeIn(nextLi);
	}
	//初始化函数
	function initOpacity(list){
		for (var i = 0; i < list.length; i++){
			if(i == 0){
				setOpacity(list[i], 100);
			}else{
				setOpacity(list[i], 0);
			}
		}
	}
	//获取当前显示的li
	function getCurrentLi(){
		for (var i = 0; i < list.length; i++){
			if(parseInt(list[i].style.opacity) == 1 || list[i].style.filter == "alpha(opacity=100)"){
				currentLi = list[i];
				if(i == list.length - 1){
					nextLi = list[0];
				}else{
					nextLi = list[i + 1];
				}
			}
		}
	}
	//显示
	function fadeIn(elem) {
		setOpacity(elem, 0);
		for (var i = 0; i <= 20; i++) {
			(function () {
				var pos = i * 5;
				setTimeout(function () {setOpacity(elem, pos);}, i * 25);
			})(i);
		}
	}
	//隐藏
	function fadeOut(elem) {
		for (var i = 0; i <= 20; i++) {
			(function () {
				var pos = 100 - i * 5;
				setTimeout(function () {setOpacity(elem, pos);}, i * 25);
			})(i);
		}
	}
	//设置opacity属性值
	function setOpacity(elem, level) {
		// if (elem.filters) {
			// elem.style.filter = "alpha(opacity=" + level + ")";
		// } else {
			elem.style.opacity = level / 100;
		// }
	}
}

//about页面侧边栏布局随滚动变化
function wrapLeftPosition(){
	if(!document.getElementById("wrap-content")) return false;
	if(!document.getElementById("wrap-left")) return false;
	var container = document.getElementById("wrap-content");
	var wrapLeft = document.getElementById("wrap-left");
	var sectionsRight = container.getElementsByTagName("section");
	var linksLeft = wrapLeft.getElementsByTagName("a");
	linksLeft[0].style.backgroundColor = "#fff";
	//修改position样式
	addScrollEvent(scrollFunction)
	function scrollFunction(){
		var wrapLeftTop = container.getBoundingClientRect().top;
		if(wrapLeftTop <= 0){
			wrapLeft.setAttribute("style","position:fixed;top:0px;")
		}else{
			wrapLeft.setAttribute("style","position:relative;")
		}
		//改变导航背景颜色
		for(var i=0; i<sectionsRight.length; i++){
			var sectionTop = sectionsRight[i].getBoundingClientRect().top;
			var sectionBottom = sectionsRight[i].getBoundingClientRect().bottom;
			var linkTop = linksLeft[i].getBoundingClientRect().top;
			var linkBottom = linksLeft[i].getBoundingClientRect().bottom;
			if(sectionTop <= linkTop && sectionBottom > linkBottom){
				linksLeft[i].style.backgroundColor = "#fff";
			}else{
				linksLeft[i].style.backgroundColor = "lightgreen";
			}
		}
	}
	
}

//special list点击弹出新div并显示详情
function showSpecialDiv(){
	if(!document.getElementById("js_special")) return false;
	var container = document.getElementById("js_special");
	var list = container.getElementsByTagName("a");
	
	initAll(list);
	//onclick
	//closeclick
	
	function initAll(list){
		addClickEvent(list);		
		function addClickEvent(arr){
			for(var i = 0; i < arr.length; i++){
				arr[i].onclick = function (){
					onclickFunction(this);
					return false;
				}
			}
		}		
	}
	
	function onclickFunction(elem){
		var targetContent = elem.getAttribute("href");
		createDiv();	
		function createDiv(){
			var screenWidth = window.innerWidth;
			var screenHeight = window.innerHeight;
			var thisHtml = document.getElementsByTagName("html")[0];
			var thisBody = document.getElementsByTagName("body")[0];
			
			var specialShowDiv = document.createElement("div");
			specialShowDiv.setAttribute("id","special-show");
			specialShowDiv.setAttribute("style","width:50%;height:50%;");
			var coverDiv = document.createElement("div");
			coverDiv.setAttribute("id","cover-screen");
			coverDiv.setAttribute("style","width:"+ thisHtml.clientWidth + "px;height:" + thisBody.clientHeight*2 +"px;");
			
			thisBody.appendChild(coverDiv);
			thisBody.appendChild(specialShowDiv);
			
			var mainDiv = document.createElement("div");
			mainDiv.setAttribute("class","main");
			mainDiv.setAttribute("class","main");
			var mainDivHeight = specialShowDiv.clientHeight;
			mainDiv.setAttribute("style","height:100%;");
			specialShowDiv.appendChild(mainDiv);
			var elseDiv = document.createElement("div");
			specialShowDiv.appendChild(elseDiv);
			elseDiv.setAttribute("class","else");
			var elseP = document.createElement("p");
			elseDiv.appendChild(elseP);
			var elseA = document.createElement("a");
			elseDiv.appendChild(elseA);
			
			
			elseA.onclick = function (){
				toRemoveDivList = [specialShowDiv,coverDiv]
				closeClickFunction(toRemoveDivList);
			}
			
			chgDivContent(mainDiv);
			function chgDivContent(divElem){
				var img1 = document.createElement("img");
				img1.setAttribute("src",targetContent)
				divElem.appendChild(img1);
				var p1 = document.createElement("p");
				var text = document.createTextNode("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
				p1.appendChild(text);
				divElem.appendChild(p1);
			}
			
			chgPTitle(elseP);
			function chgPTitle(pElem){
				var text = document.createTextNode("aaaaaaaaaaaa");
				pElem.appendChild(text);
			}
		}
	}
	
	function closeClickFunction(toRemoveDivList){
		removeDiv(toRemoveDivList);
		
		function removeDiv(toRemoveDivList){
			for(var i=0; i<toRemoveDivList.length; i++){
				toRemoveDivList[i].parentNode.removeChild(toRemoveDivList[i]);
			}			
		}
	}
}

//处于所在页面时高亮显示当前链接
function highLightPage(){
	var navID = "js_nav";
	var classname = "active";
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById(navID)) return false;
	var navMain = document.getElementById(navID);
	var links = navMain.getElementsByTagName("a");
	var linkurl;
	for (var i=0;i<links.length;i++){
		linkurl = links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl) != -1){
			links[i].setAttribute("class",classname);
		}
	}
}

//特产分类筛选
function changeStyleByCondition(){
	var condElemID = "list-variety";
	var condAttriName = "data-filter";
	var toChgElemID = "js_special";
	var toChgAttriName = "style";
	var defAttriValue = "display:block;";
	var newAttriValue = "display:none;";
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById(condElemID)) return false;
	if(!document.getElementById(toChgElemID)) return false;
	var condElem = document.getElementById(condElemID);
	var condList = condElem.getElementsByTagName("li");
	var toChgElem = document.getElementById(toChgElemID);
	var toChgList = toChgElem.getElementsByTagName("li");
	//添加默认样式
	for (var i=0;i<toChgList.length;i++){
		toChgList[i].setAttribute(toChgAttriName,defAttriValue);
	}
	//定义onclick事件
	for (var i=0;i<condList.length;i++){
		condList[i].onclick=function(){
			var dateFilter = this.getAttribute(condAttriName);
			if(dateFilter == "*"){
				for(var j=0;j<toChgList.length;j++){
					toChgList[j].setAttribute(toChgAttriName,defAttriValue);
				}
			}else{
				for(var j=0;j<toChgList.length;j++){
					if(toChgList[j].className.indexOf(dateFilter) == -1){
						toChgList[j].setAttribute(toChgAttriName,newAttriValue);
					}else{
						toChgList[j].setAttribute(toChgAttriName,defAttriValue);
					}
				}
			
			}
			return false;
		}
	}
}











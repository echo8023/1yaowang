"use strict";var _createClass=function(){function e(i,t){for(var s=0;s<t.length;s++){var e=t[s];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}return function(i,t,s){return t&&e(i.prototype,t),s&&e(i,s),i}}();function _classCallCheck(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}var scale=function(){function i(){_classCallCheck(this,i),this.detail=$(".detail"),this.spic=$(".spic"),this.bpic=$(".bpic"),this.sf=$(".sf"),this.bf=$(".bf")}return _createClass(i,[{key:"init",value:function(){var t=this;this.spic.mouseover(function(){t.show(),t.spic.mousemove(function(i){i=i||window.event,t.spicmove(i)})}),$(t.spic).mouseout(function(){t.hide()}),this.sf.css({width:this.spic.width()*this.bf.width()/this.bpic.width(),height:this.spic.height()*this.bf.height()/this.bpic.height()-30}),this.bili=this.bf.width()/this.sf.width()}},{key:"spicmove",value:function(i){var t=i.pageX-this.detail.offset().left-this.sf.width()/2,s=i.pageY-this.detail.offset().top-this.sf.height()/2;t<0?t=0:t>=this.spic.width()-this.sf.width()&&(t=this.spic.width()-this.sf.width()),s<0?s=0:s>=this.spic.height()-this.sf.height()&&(s=this.spic.height()-this.sf.height()),this.sf.css({left:t,top:s}),this.bpic.css({left:-t*this.bili,top:-s*this.bili})}},{key:"show",value:function(){$(".sf,.bf").css("display","block")}},{key:"hide",value:function(){$(".sf,.bf").css("display","none")}}]),i}();(new scale).init(),function(e){var i=location.search.substring(1).split("=")[1];e.ajax({url:"http://localhost/js1907/Day%2031/php/getdata.php",data:{sid:i},dataType:"json"}).done(function(i){var t=i.urls.split(",");e("#spic img").attr("src",i.url),e("#spic img").attr("sid",i.sid),e(".loadtitle").html(i.titile),e(".loadpcp").html(i.price);var s="";e.each(t,function(i,t){s+='\n                <li>\n                    <img src="'+t+'" />\n                </li>\n            '}),e("#list ul").html(s)});var s=[],n=[],o=function(i,t,s){var e=new Date;e.setDate(e.getDate()+s),document.cookie=i+"="+encodeURIComponent(t)+";expires="+e},c=function(i){var t=decodeURIComponent(document.cookie).split("; "),s=!0,e=!1,n=void 0;try{for(var o,c=t[Symbol.iterator]();!(s=(o=c.next()).done);s=!0){var a=o.value.split("=");if(i===a[0])return a[1]}}catch(i){e=!0,n=i}finally{try{!s&&c.return&&c.return()}finally{if(e)throw n}}};e(".p-btn a").on("click",function(){var i=e(this).parents(".goodsinfo").find("#spic").find("img").attr("sid");if(c("cookiesid")&&c("cookienum")&&(s=c("cookiesid").split(","),n=c("cookienum").split(",")),-1!==e.inArray(i,s)){var t=parseInt(n[e.inArray(i,s)])+parseInt(e("#count").val());n[e.inArray(i,s)]=t,o("cookienum",n.toString(),10)}else s.push(i),o("cookiesid",s.toString(),10),n.push(e("#count").val()),o("cookienum",n.toString(),10)})}(jQuery);
//三. tap3 效果
// 取元素
let $consult3 = $(".tab3 .consult");
//循环给三个按钮添加点击事件。
$consult3.on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");//同时清除所有按钮上面的类名，并给点击的按钮加上类名
    $(".tab3 .item").css({ "display": "none" });
    $(".tab3 ." + $(this).data('show')).css({ "display": "block" })
    // $(this).css({"display":"block"}).siblings().css({"display":"none"}); //隐藏所有内部的div(item),并显示点击按钮的div
});
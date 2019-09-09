//二. tap1 效果
// 取元素
let $consult1 = $(".tab1 .consult");
//循环给三个按钮添加点击事件。
$consult1.on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");//同时清除所有按钮上面的类名，并给点击的按钮加上类名
    $(".tab1 .item").css({ "display": "none" });
    $(".tab1 ." + $(this).data('show')).css({ "display": "block" })
    // $(this).css({"display":"block"}).siblings().css({"display":"none"}); //隐藏所有内部的div(item),并显示点击按钮的div
});

//二. tap2 效果
// 取元素
let $consult2 = $(".tab2 .consult");
//循环给三个按钮添加点击事件。
$consult2.on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");//同时清除所有按钮上面的类名，并给点击的按钮加上类名
    $(".tab2 .item").css({ "display": "none" });
    $(".tab2 ." + $(this).data('show')).css({ "display": "block" })
    // $(this).css({"display":"block"}).siblings().css({"display":"none"}); //隐藏所有内部的div(item),并显示点击按钮的div
});

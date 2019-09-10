// 补充知识点
// 1.滚动事件
// scroll([[data],fn])当用户滚动指定的元素时，会发生 scroll 事件。scroll 事件适用于所有可滚动的元素和 window 对象（浏览器窗口）。
// 参数：[data],fn
// data:scroll([Data], fn) 可传入data供函数fn处理。
// fn:在每一个匹配元素的scroll事件中绑定的处理函数。
// 示例：$(window).scroll( function() { /* ...do something... */ } );  当页面滚动条变化时，执行的函数:

//2.滚动条的距离--scrollTop/scrollLeft

//3.scrollTo() 可把内容滚动到指定的坐标。
// scrollTo(xpos,ypos)
// xpos	必需。要在窗口文档显示区左上角显示的文档的 x 坐标。
// ypos	必需。要在窗口文档显示区左上角显示的文档的 y 坐标。

// document.onclick=function(){
//     scrollTo(0,100);
// }

//4.可视区宽高：
// document.documentElement.clientWidth
// document.documentElement.clientHeight

// 5.显示show();隐藏hide();

// 6.eq(index|-index)获取第N个元素
// 参数：整数。正的从索引为0开始算，负的从集合中的最后一个元素开始倒数。(1算起)

// 7.animate(params,[speed],[easing],[fn])用于创建自定义动画的函数。
// 参数说明
// params:一组包含作为动画属性和终值的样式属性和及其值的集合
// speed:三种预定速度之一的字符串("slow","normal", or "fast")或表示动画时长的毫秒数值(如：1000)
// easing:要使用的擦除效果的名称(需要插件支持).默认jQuery提供"linear" 和 "swing".
// fn:在动画完成时执行的函数，每个元素执行一次。
// 示例 ：用500毫秒将段落移到left为50的地方并且完全清晰显示出来（透明度为1）
// jQuery 代码:
// $("p").animate({
// left: 50, opacity: 'show'
// }, 500);

// 8.offset([coordinates])获取匹配元素在当前视口的相对偏移。返回的对象包含两个整型属性：top 和 left，以像素计。此方法只对可见元素有效。
// 参数说明
// coordinates{top,left}ObjectV1.4必需。规定以像素计的 top 和 left 坐标。
// 可能的值：值对，比如 {top:100,left:0} 带有 top 和 left 属性的对象 

// function(index,coords)functionV1.4规定返回被选元素新偏移坐标的函数。
// index - 可选。接受选择器的 index 位置 
// oldvalue - 可选。接受选择器的当前坐标 




// 一、楼梯效果
// 拖动滚动条(滚动条事件)，显示楼梯
let $stairsnav = $("#stairsnav");//获取楼梯
let $louceng = $(".louceng");
let $loutinavli = $("#stairsnav li");
$(window).on("scroll", function () {
    let $distance = $(this).scrollTop();//滚动条的top值
    if ($distance > 965) {
        $stairsnav.show();
    } else {
        $stairsnav.hide();
    }
    // 滚轮滚到哪里，通过判断top值，确认给那一层楼添加active类
    // 取代for循环。jQuery中用each(callback)，返回 'false' 将停止循环 (就像在普通的循环中使用 'break')。返回 'true' 跳至下一个循环(就像在普通的循环中使用'continue')。
    // each里面的函数参数：function(index,element)  index索引  element元素
    $louceng.each(function (index, element) {
        let $loucenttop = $(element).offset().top + $(element).height() / 2; //每个楼层的top值。
        if ($loucenttop > $distance) { //楼层的top值>滚动条的top
            $loutinavli.eq(index).addClass("active").siblings().removeClass("active");//给满足条件的第一个添加类。
            return false;//满足一次就终止循环
        }
    });
});

// 点击左侧导航栏，改点击的内容变红，且右边也能跳转到相应内容上
$loutinavli.not('.backtop').on("click", function () {
    //当前的楼梯添加类active;
    $(this).addClass("active").siblings().removeClass("active");
    // 跳转内容，需获取各楼层top值
    let $top = $louceng.eq($(this).index()).offset().top //$(this).index():当前点击楼梯的li的索引
    $("html,body").animate({
        scrollTop: $top
    });
});

// 3.回到顶部
// $loutinavli.find('.backtop').on("click",function(){  不可以用find,因为是找后代。而此处是同级不是找后代
$(".backtop").on("click", function () {
    $("html,body").animate({
        scrollTop: 0
    });
});



// 二、渲染数据效果(jquery ajax)
$.ajax({
    type: 'get', //请求方式，默认采用get。
    // url: 'http://10.31.157.31/js1907/dataphp/piclist.php', //接口地址：一定存在
    url: "http://10.31.157.31/js/meself-code/day33/php/3-floor_datalist.php",
    data: "data",
    dataType: 'json',//返回的是json格式。
    // async: true, //默认异步
    success: function (d) { //请求成功的回调函数，返回数据。默认为空
        let $datalist = $(".F1_right_bottom");
        let $str = ""; //为渲染准备一个字符串，用来拼接
        $.each(d, function (index, value) {
            $str += ` 
                <li>                                            
                    <a href="#">
                        <img src="${value.url}" alt="">
                        <span class="poison_title">${value.title}</span>
                    </a>
                    <p class="poison_price"><i>¥</i>${value.price}</p>  
                </li>                                                
                    `;
            // $str.appendTo($datalist);
            $datalist.html($str);
        });

    },
    error: function (xhr) {
        throw new Error(xhr.status);
    }
});

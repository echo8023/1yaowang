// 一.幻灯片切换效果

// 幻灯片切换效果，显示框内的五张图片。它是整个的li移动(五张图片都一起移动的)。给他首尾各家上一张尾首的图片。当最后一张向后切换/第一张向前切换时。视觉上刚好续上，同时用css改变定位，将其实际续上
// 1.修改布局--克隆元素，分别追加到首尾
// 取元素
let $oBanner = $(".banner");
let $oUl_moveul = $(".banner ul");
console.log($oUl_moveul);
let $aLi_pic = $(".banner ul li");
console.log($aLi_pic[1]);
let $btnli = $(".banner ol li");
let $left = $("#left");
let $right = $("#right");
let $timer = null;
let $index = 0;
let $index2 = 4;

// 克隆元素，分别追加到首尾
let firstpic = $($aLi_pic[$aLi_pic.length - 1]).clone().prependTo($oUl_moveul);//把第五张图片克隆一份，追加到第一张图片前面
let lastpic = $($aLi_pic[0]).clone().appendTo($oUl_moveul);//把第一张图片克隆一份，追加到第五张图片后面



//2.给ul赋值宽度和位置。(已浮动，只查设置ul宽度，让他们横排一行，要设置ul的width,刚好够放下七张图片--即ul的width等于7个li的width)
$liwidth = $aLi_pic[0].offsetWidth; //一个li的width
// a:给ul赋值宽度(ul的子元素li里面有length属性，得到子节点个数7个，乘以任何一个li的width--每次移动也是一个li的宽度，所以可以存个变量，存下来)
$($oUl_moveul).width($(".banner ul li").length * $liwidth + "px");

// b:给ul赋值位置
$($oUl_moveul).css('left', -$liwidth + 'px');

// 3.给小圆圈添加点击事件，同时被点击的小圆圈变红(加类)
$btnli.on("click", function () {
    //当前的小圆圈按钮添加类active;
    $(this).addClass("active").siblings().removeClass("active") //操作类的，所以不用前面再加点
    $num = $(this).index(); //获得当前点击小圆圈按钮的索引             
    $($oUl_moveul).css('left', -$liwidth * ($num + 1) + 'px'); // 重新给ul赋值位置
});

//4.显示隐藏箭头
$oBanner.hover(function () {
    $right.show();
    $left.show();
    clearInterval($timer);
}, function () {
    $right.hide();
    $left.hide();
    $timer = setInterval(function () {
        $right.click();
    }, 1500);

});

//5.点击箭头切换图片
$right.on("click", function () {
    $btnli.eq($index + 1).addClass("active").siblings().removeClass("active");
    $index++; //当前索引
    // console.log($index);
    if ($index < 5) {
        $($oUl_moveul).css('left', -$liwidth * ($index + 1) + 'px'); // 重新给ul赋值位置
    } else {
        $index = 0;
        $btnli.eq($index).addClass("active").siblings().removeClass("active");
        $($oUl_moveul).css('left', -$liwidth + 'px'); // ul回到初始位置
    }
});

$left.on("click", function () {
    $btnli.eq($index2).addClass("active").siblings().removeClass("active");
    // console.log($index2);
    if ($index2 <= 0) {
        $index2 = 4;
        $($oUl_moveul).css('left', -$liwidth * ($index2 + 2) + 'px'); // 重新给ul赋值位置           
    }
    else {
        $($oUl_moveul).css('left', -$liwidth * ($index2 + 1) + 'px');// ul回到初始位置
        $index2--; //当前索引
    }
});

// 6.自动切换
$timer = setInterval(function () {
    $right.click();
}, 1500);







//加定时器
//    var timer=null;
// function autoplay(){
//     timer = setInterval(function(){
//         num++;
//         num%=arrUrl.length;
//         fn();
//     },1000);
// }autoplay();

// oDiv.onmouseover=function(){
//     clearInterval(timer);
// };
// oDiv.onmouseout= autoplay;//注意：事件调用不能加括号，函数名称加括号就等于函数返回的值，若你函数没有返回值那么就是undefined





// 敲的过程中出现的某些问题
// js写法
// $oUl_moveul.style.width=$oUl_moveul.children.length* $liwidth+"px";
// $oUl_moveul.children求得的lengthy有问题 ？？？？？？
// $($oUl_moveul).width($oUl_moveul.children.length* $liwidth+"px");
 // $aLi_pic求得的lengthy只有原来的5个   ？？？？？？
// $($oUl_moveul).width($aLi_pic.length* $liwidth+"px");

// 补充回顾知识
// 1.appendTo(content)把所有匹配的元素追加到另一个指定的元素元素集合中。
// 这个方法是颠倒了常规的$(A).append(B)的操作，即不是把B追加到A中，而是把A追加到B中。
// 在jQuery 1.3.2中，
// appendTo
// prependTo
// insertBefore
// insertAfter
// replaceAll
// 这个几个方法成为一个破坏性操作，返回值是所有被追加的内容，而不仅仅是先前所选中的元素。所以，要选择先前选中的元素，需要使用end()方法，参见例二。

// 2.append(content|fn)向每个匹配的元素内部追加内容。
// 这个操作与对指定的元素执行appendChild方法，将它们添加到文档中的情况类似。
// 参数
// content 要追加到目标中的内容           String, Element, jQuery         V1.0   
// function(index, html)                Function                        V1.4
// 返回一个HTML字符串，用于追加到每一个匹配元素的里边。接受两个参数，index参数为对象在这个集合中的索引值，html参数为这个对象原先的html值。

// $("b").clone().prependTo("p");
// $("p").appendTo("div");

// 3.end()回到最近的一个"破坏性"操作之前。即，将匹配的元素列表变为前一次的状态。
// 如果之前没有破坏性操作，则返回一个空集。所谓的"破坏性"就是指任何改变所匹配的jQuery元素的操作。这包括在 Traversing 中任何返回一个jQuery对象的函数--'add', 'andSelf', 'children', 'filter', 'find', 'map', 'next', 'nextAll', 'not', 'parent', 'parents', 'prev', 'prevAll', 'siblings' and 'slice'--再加上 Manipulation 中的 'clone'。

// 4.contents()  V1.2概述
// 查找匹配元素内部所有的子节点（包括文本节点）。如果元素是一个iframe，则查找文档内容

// 5.wrap(html|element|fn)把所有匹配的元素用其他元素的结构化标记包裹起来。
// 这种包装对于在文档中插入额外的结构化标记最有用，而且它不会破坏原始文档的语义品质。这个函数的原理是检查提供的第一个元素（它是由所提供的HTML标记代码动态生成的），并在它的代码结构中找到最上层的祖先元素－－这个祖先元素就是包裹元素。当HTML标记代码中的元素包含文本时无法使用这个函数。因此，如果要添加文本应该在包裹完成之后再行添加。
// 参数
// htmlStringV1.0HTML标记代码字符串，用于动态生成元素并包裹目标元素
// elementElementV1.0用于包装目标元素的DOM元素
// fnFunctionV1.4生成包裹结构的一个函数
// 示例
// html参数描述:
// 把所有的段落用一个新创建的div包裹起来
// jQuery 代码:
// $("p").wrap("<div class='wrap'></div>");

// elem参数描述:
// 用ID是"content"的div将每一个段落包裹起来
// jQuery 代码:
// $("p").wrap(document.getElementById('content'));

// 回调函数 描述:
// 用原先div的内容作为新div的class，并将每一个元素包裹起来
// HTML 代码:
// <div class="container">
// <div class="inner">Hello</div>
// <div class="inner">Goodbye</div>
// </div>

// jQuery 代码:
// $('.inner').wrap(function() {
// return '<div class="' + $(this).text() + '" />';
// });

// 结果:
// <div class="container">
// <div class="Hello">
//     <div class="inner">Hello</div>
// </div>
// <div class="Goodbye">
//     <div class="inner">Goodbye</div>
// </div>
// </div>

// 6.clone([Even[,deepEven]])
// 概述
// 克隆匹配的DOM元素并且选中这些克隆的副本。
// 在想把DOM文档中元素的副本添加到其他位置时这个函数非常有用。

// 参数
// Events                Boolean            V1.0
// 一个布尔值（true 或者 false）指示事件处理函数是否会被复制。V1.5以上版本默认值是：false

// Events[,deepEvents]   Boolean,Boolean    V1.5
// 1:一个布尔值（true 或者 false）指示事件处理函数是否会被复制。
// 2:一个布尔值，指示是否对事件处理程序和克隆的元素的所有子元素的数据应该被复制。

// 示例
// 描述:克隆所有b元素（并选中这些克隆的副本），然后将它们前置到所有段落中。

// HTML 代码:
// <b>Hello</b><p>, how are you?</p>

// jQuery 代码:
// $("b").clone().prependTo("p");

// 结果:
// <b>Hello</b><p><b>Hello</b>, how are you?</p>

// 7.eq(index|-index)获取第N个元素
// 获取匹配的第二个元素
// HTML 代码:
// <p> This is just a test.</p> <p> So is this</p>jQuery 代码:
// $("p").eq(1)



// nodeType是用来获得当前节点对象的类型。
// nodeType 属性可返回节点的类型。
// 元素element 1
// 属性attr 2
// 文本text 3
// 注释comments 8
// 文档document 9



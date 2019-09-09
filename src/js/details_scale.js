class scale {
    constructor() {
        // 取元素 
        this.detail = $(".detail");
        this.spic = $(".spic");
        this.bpic = $(".bpic");
        this.sf = $(".sf");
        this.bf = $(".bf");
    }

    init() {
        let _this = this;
        // 1.鼠标移入小图，显示小放和大放 (鼠标移入移出事件)
        this.spic.mouseover(function () {  //_this = jQuery.fn.init [scale]
            _this.show();  //显示隐藏的匹配元素。
            // 3.小放跟随鼠标 (鼠标移动事件)
            _this.spic.mousemove(function (ev) {
                ev = ev || window.event;
                _this.spicmove(ev);
                // $("span").text(e.pageX + ", " + e.pageY);
            })
        });

        // 2.鼠标移出小图，隐藏小放和大放 (鼠标移入移出事件)
        $(_this.spic).mouseout(function () {
            _this.hide(); //隐藏显示的元素
        });

        // 4.利用公式求小放的尺寸。小放/小图=大放/大图
        this.sf.css({
            width: this.spic.width() * this.bf.width() / this.bpic.width(),
            height: this.spic.height() * this.bf.height() / this.bpic.height()-30,
        });

        // 5.求比例
        //    this.bili=this.bf.heighth()/this.sf.height();
        this.bili = this.bf.width() / this.sf.width();
    }
  

    // 3.小放跟随鼠标 (鼠标移动事件)  限定范围
    spicmove(ev) {
       
        let l = ev.pageX - this.detail.offset().left - this.sf.width() / 2;
        let t = ev.pageY - this.detail.offset().top - this.sf.height() / 2;

        if (l < 0) {
            l = 0;
        } else if (l >= this.spic.width() - this.sf.width()) {
            l = this.spic.width() - this.sf.width();
        }
        if (t < 0) {
            t = 0;
        } else if (t >= this.spic.height() - this.sf.height()) {
            t = this.spic.height() - this.sf.height();
        }

        this.sf.css({
            left: l,
            top: t
        });

        this.bpic.css({
            left: -l * this.bili,
            top: -t * this.bili
        })
    



        
    }

    // 鼠标移动到spic上时，sf和显示
    show() {
        $('.sf,.bf').css('display', 'block');
        // this.sf.attr({ visibility: "visible" });
        // this.bf.attr({ visibility: "visible" });
    }

    // 鼠标移动到spic上时，sf和隐藏
    hide() {
        $('.sf,.bf').css('display', 'none');
        // this.sf.attr({ visibility: "hidden" });
        // this.bf.attr({ visibility: "hidden" });
    }

}


new scale().init();




// 点击按钮，加入购物车效果
! function ($) {
    //1.获取首页商品列表传入的sid
    let $sid = location.search.substring(1).split('=')[1];

    $.ajax({
        url: 'http://localhost/js1907/Day%2031/php/getdata.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function (d) { //获取后端返回的数据。
        let $smallpic = d.urls.split(',');
        $('#spic img').attr('src', d.url);
        $('#spic img').attr('sid', d.sid); //添加自定义属性sid
        $('.loadtitle').html(d.titile);
        $('.loadpcp').html(d.price);
        //拼接小图片
        let $htmlstr = ''
        $.each($smallpic, function (index, value) {
            $htmlstr += `
                <li>
                    <img src="${value}" />
                </li>
            `;
        });
        $('#list ul').html($htmlstr);
    });



    //2.加入购物车。
    let sidarr = []; //存放商品的编号数组
    let numarr = []; //存放商品的数量数组

    //2.1取cookie(假设是第二次点击，获取第一次的cookie),提前约定cookie的key值
    //cookie添加， 获取， 删除
    let myobj = {
        addcookie: function (key, value, day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
        },
        getcookie: function (key) {
            let arr = decodeURIComponent(document.cookie).split('; ');
            for (let value of arr) {
                let newarr = value.split('=');
                if (key === newarr[0]) {
                    return newarr[1];
                }
            }
        },
        delcookie: function (key) {
            addcookie(key, '', -1);
        }
    }
    //编号：[2,4,5] 数量：[12,34,68]
    //将cookie取出转换成数组，利用数组进行判断是否是第一次。
    function cookieToArray() {
        if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
            sidarr = myobj.getcookie('cookiesid').split(',') //cookie存放商品编号的key值
            numarr = myobj.getcookie('cookienum').split(',') //cookie存放商品数量的key值
        }
    }
    $('.p-btn a').on('click', function () {
        //通过当前点击的按钮，获取当前商品的(图片)sid。
        let $sid = $(this).parents('.goodsinfo').find('#spic').find('img').attr('sid');
        //是否第一次，获取cookie才能知道是否是第一次。第一次会存储cookie(编号和数量)
        cookieToArray(); //取出转换成数组
        if ($.inArray($sid, sidarr) !== -1) { //存在
            //通过sid获取对应的数量，取出数量+当前新添加的商品的数量。
            // console.log(numarr);
            // console.log(sidarr); //当前sid对应的数组的索引位置
            // console.log($.inArray($sid, sidarr)); //当前sid对应的数组的索引位置
            // console.log(numarr[$.inArray($sid, sidarr)]);
            let changenum = parseInt(numarr[$.inArray($sid, sidarr)]) + parseInt($('#count').val());//原来的数量+当前的数量。
            numarr[$.inArray($sid, sidarr)]=changenum;//数组值改变
            myobj.addcookie('cookienum', numarr.toString(), 10);//继续添加cookie 
        } else { //不存在
            sidarr.push($sid); //将编号push进数组
            myobj.addcookie('cookiesid', sidarr.toString(), 10); //存储cookie ，整个数组。
            numarr.push($('#count').val()); //将商品的数量push进数组
            myobj.addcookie('cookienum', numarr.toString(), 10);
        }
    });
}(jQuery);
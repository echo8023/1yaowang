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
            // alert(1);   没有生效，上一句又没有报错。？？？？？??????????
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
            height: this.spic.height() * this.bf.height() / this.bpic.height(),
        });

        // 5.求比例
        // this.bili=this.bf.width()/this.sf.width();
        this.bili = this.bf.width() / this.sf.width();
    }

    // 3.小放跟随鼠标 (鼠标移动事件)  限定范围
    spicmove(ev) {
        let l = ev.clientX - this.detail.offset().left - this.sf.width() / 2;
        let t = ev.clientY - this.detail.offset().top - this.sf.height() / 2;

        // 限定范围
        if (l < 0) { //左
            l = 0;
        } else if (l > this.spic.width() - this.sf.width() - 2) { //右  -2是因为上下左右多了1px边框
            l = this.spic.width() - this.sf.width() - 2
        }

        if (t < 0) { //上
            t = 0;
        } else if (t > this.spic.height() - this.sf.height() - 2) { //下
            t = this.spic.height() - this.sf.height() - 2
        }

        this.sf.css({
            left: l,
            top: t
        });

        this.bpic.css({
            left: -l * this.bili,
            top: -t * this.bili
        })

        // // 小放大镜的left/top
        // let left_sf =l +"px";
        // this.sf.attr({ left: $left_sf });

        // let $top_sf = t +"px";
        // this.sf.attr({ top: $top_sf });


        // // 大放大镜的left/top
        // let $left_bf=-(_this.bili*l)+"px";
        // this.bf.attr({ left: $left_bf});

        // let $top_bf=-(_this.bili*t)+"px";
        // this.bf.attr({ top: $top_bf});
    }

    // 鼠标移动到spic上时，sf和显示
    show() {
        $('.sf,.bf').css('visibility', 'visible');
        // this.sf.attr({ visibility: "visible" });
        // this.bf.attr({ visibility: "visible" });
    }

    // 鼠标移动到spic上时，sf和隐藏
    hide() {
        $('.sf,.bf').css('visibility', 'hidden');
        // this.sf.attr({ visibility: "hidden" });
        // this.bf.attr({ visibility: "hidden" });
    }

}


new scale().init();

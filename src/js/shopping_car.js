! function ($) {
    //cookie操作方法
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
    //获取cookie,进行商品列表的渲染。
    if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
        let csid = myobj.getcookie('cookiesid').split(','); //数组
        let cnum = myobj.getcookie('cookienum').split(',');
        $.each(csid, function (index, value) {
            showgoodslist(csid[index], cnum[index]);
        })
    }
    //封装函数，实现商品列表的渲染。
    function showgoodslist(sid, num) { //sid:商品的编号   num：商品的数量。
        $.ajax({
            url: 'http://localhost/jquery_taobaocart/php/taobaodata.php',
            dataType: 'json'
        }).done(function (data) {
            let $strhtml = '';
            $.each(data, function (index, value) {
                if (value.sid == sid) {
                    //对隐藏的元素进行克隆。
                    let $clonebox = $('.goods-item:hidden').clone(true, true);
                    $clonebox.find('.goods-pic img').attr('src',value.url);
                    $clonebox.find('.goods-d-info a').html(value.titile);
                    $clonebox.find('.b-price strong').html(value.price)
                    $clonebox.find('.quantity-form input').val(num);
                    //计算总和：
                    let zmoney=(value.price*num).toFixed(2);
                    $clonebox.find('.b-sum strong').html(zmoney);
                    $clonebox.css('display', 'block');
                    $('.item-list').append($clonebox); 
                }
            });
            calc()
        })
    }
    //如果购物车为空,隐藏empty-cart
    empty();
    function empty(){
        if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
            $('.empty-cart').hide();
        }else{
            $('.empty-cart').show();
        }
    }

    //全选
    $('.allsel').on('click',function(){
        //$(this).parents().find('.goods-info').find('.cart-checkbox').find('input')
        $('.goods-item:visible').find('.cart-checkbox').find('input').prop('checked',$(this).prop('checked'));
        calc();//重新计算
    });

    //alert($('.goods-item:visible').find('.cart-checkbox').find('input').length);
    //事件委托
    $('.item-list').on('click','input:checkbox',function(){
        if($('.goods-item:visible').find('.cart-checkbox').find('input').length==$('.goods-item:visible').find('.cart-checkbox').find('input:checked').length){
            $('.allsel').prop('checked',true);
        }else{
            $('.allsel').prop('checked',false);
        }
        calc();//重新计算
    });

    

    //总价和总的数量
    function calc(){
        let allprice=0;//总价
        let allnum=0;//总的数量。
        $('.goods-item:visible').each(function(index,element){//遍历复选框是否选中
            if($(element).find('.goods-info').find('.cart-checkbox').find('input').is(':checked')){
                console.log($(element).find('.b-sum strong').html());
                allprice+=parseInt($(element).find('.b-sum strong').html());
                allnum+=parseInt($(element).find('.quantity-form input').val());
            }
        });
        $('.totalprice').html('￥'+allprice);
        $('.amount-sum em').html(allnum);
    }
    
    //商品数量的改变

    //删除单个商品，删除全部商品。





    // function showgoodslist(sid, num) { //sid:商品的编号   num：商品的数量。
    //     //通过判断根据sid找到对应的数据。
    //     $.ajax({
    //         url: 'http://localhost/jquery_taobaocart/php/taobaodata.php',
    //         dataType: 'json'
    //     }).done(function (data) {
    //         let $strhtml = '';
    //         $.each(data,function(index,value){
    //             if(value.sid==sid){
    //                 $strhtml+=`
    //                 <div class="goods-item goods-item-sele">
    //                 <div class="goods-info">
    //                     <div class="cell b-checkbox">
    //                         <div class="cart-checkbox">
    //                             <input type="checkbox" checked="" name="" id="" value="" />
    //                             <span class="line-circle"></span>
    //                         </div>
    //                     </div>
    //                     <div class="cell b-goods">
    //                         <div class="goods-name">
    //                             <div class="goods-pic">
    //                                 <a href=""><img src="${value.url}" alt="" /></a>
    //                             </div>
    //                             <div class="goods-msg">
    //                                 <div class="goods-d-info">
    //                                     <a href="">${value.titile}</a>
    //                                 </div>
    //                                 <div class="goods-ex">
    //                                     <span class="promise"></span>
    //                                     <span class="promise">
    //                                             <i></i><a href="">购买京东服务</a>
    //                                         </span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div class="cell b-props">
    //                         <div class="prop-text">尺码：27英寸Retina 5K 显示屏</div>
    //                     </div>
    //                     <div class="cell b-price">
    //                         <strong>${value.price}</strong>
    //                         <a class="sales-promotion" href="">
    //                                 促销优惠
    //                                 <b></b>
    //                             </a>
    //                         <div class="sales-promotion-dropdown">
    //                         </div>
    //                     </div>
    //                     <div class="cell b-quantity">
    //                         <div class="quantity-form">
    //                             <a class="quantity-down" href="javascript:void(0)">-</a>
    //                             <input type="text" value="${num}" />
    //                             <a class="quantity-add" href="javascript:void(0)">+</a>
    //                         </div>
    //                         <div class="quantity-text">有货</div>
    //                     </div>
    //                     <div class="cell b-sum">
    //                         <strong>${value.price*num}</strong>
    //                     </div>
    //                     <div class="cell b-action">
    //                         <a href="javascript:void(0)">删除</a><a href="javascript:void(0)">移到我的关注</a>
    //                     </div>
    //                 </div>
    //             </div>
    //                 `;
    //             }
    //         });
    //         $('.item-list').html( $('.item-list').html() + $strhtml);

    //     });
    // }



}(jQuery);
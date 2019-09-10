const $username = $("#username");
const $psd = $("#psd");
// 取元素，拿他们的值。当点击登录按钮的时候取值
const $login = $("#login");
const $i = $("i");
const $form = $("form");
let usernameflag = true;
let pswflag = true;
let flags = true;
// 给login加点击事件,点击时发送ajax请求--把用户名和密码传给后端(此时还需要一个php文件接收)
// login.onclick=function(){
$login.click(function () {
    // 校验 flag 
    if (!usernameflag || !pswflag || !flags) { //阻止
        return ;
    }
    $.ajax({
        type: "post",
        url: "http://10.31.157.31/js/meself-code/day33/php/lg_reg_php/login.php",//接收登录传输过来的数据
        data: {
            username: $username.val(),
            psd: $psd.val()
        },
        success: function (d) {
            if (!d) {
                $i[2].innerText = "用户名或密码错误输入有误";
                $i[2].style.cssText = "color:red;"
                // alert("用户名或密码错误输入有误");
            } else {//成功跳转到首页，前端的跳转是location.href="url"
                localStorage.setItem("customname", $username.val());//首页里只要存在本地存储就取，所以首页里也要写JS
                location.href = "http://10.31.157.31/js/meself-code/day33/src/yyw_index.html";
            }
        }
    });
});

// }



// 表单验证
// 用户名(邮箱/手机号)
$username.focus(function () {
    $i[0].innerText = "请输入内容";
    $i[0].style.cssText = "color:red;"
    usernameflag = false;
})

$username.blur(function () {
    // alert($username.val())
    if ($username.val() !== "") {
        let $usernamreg = /(^(\w+[+-._]*\w+)\@(\w+[+-._]*\w+).(\w+[+-._]*\w+)$)|(^1[3|4|5|7|8]\d{9}$)/; //同时验证手机号和邮箱
        // let $usernamreg=/(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)|(^1[3|4|5|8]\d{9}$)/; //百度同时验证手机号和邮箱写法
        if ($usernamreg.test($username.val())) {
            $i[0].innerText = "√";
            $i[0].style.cssText = "color:green;";
            usernameflag = true;
        }
        else {
            $i[0].innerText = "用户名格式有误"
            $i[0].style.cssText = "color:red;";
            usernameflag = false;
        }
    }
    else {
        $i[0].innerText = "用户名不能为空";
        $i[0].style.cssText = "color:red;"
        // $username.focus();
        usernameflag = false;
    }
})

// 密码
$psd.focus(function () {
    $i[1].innerText = "请输入6-12位的密码";
    $i[1].style.cssText = "color:red;"
    pswflag = false;
})


$psd.bind("input", function () {
    // alert($psd.val());
    //获取input 元素,并实时监听用户输入
    //逻辑
    let $pwdtype = 0;
    let $numReg = /\d+/;
    let $upCase = /[A-Z]+/;
    let $lowCase = /[a-z]+/;
    let $others = /[\W\_]+/;
    if ($numReg.test($psd.val())) {
        $pwdtype++;
    }
    if ($upCase.test($psd.val())) {
        $pwdtype++;
    }
    if ($lowCase.test($psd.val())) {
        $pwdtype++;
    }
    if ($others.test($psd.val())) {
        $pwdtype++;
    }

    switch ($pwdtype) {
        case 1:
            $i[1].innerText = "弱";
            $i[1].style.cssText = "color:red;";
            pswflag = false;
            break;
        case 2:
        case 3:
            $i[1].innerText = "中";
            $i[1].style.cssText = "color:green;";
            pswflag = true;
            break;
        case 4:
            $i[1].innerText = "强";
            $i[1].style.cssText = "color:green;";
            pswflag = true;
            break;
    }
})

$psd.blur(function () {
    if ($psd.val() !== "") {
        if ($psd.val().length >= 6 && $psd.val().length <= 12) {
            $i[1].innerText = "√";
            $i[1].style.cssText = "color:green;";
            pswflag = true;
        }
        else {
            $i[1].innerText = "密码长度有误";
            $i[1].style.cssText = "color:red;";
            pswflag = false;
        }
    }
    else {
        $i[1].innerText = "密码不能为空";
        $i[1].style.cssText = "color:red";
        pswflag = false;
    }
    // $psd.focus();
})

// 表单提交
// 通过jquery提交form表单，在前面加个提交确认
// $(function () {
//     $form.click(function () {
//         var $result = confirm("确定要登录吗");
//         if ($result) {
//             $('#actionForm').submit()
//         }
//     });
// });
$form.submit = function () {
        if($username.value===""){
            $i[0].innerText="请输入内容";
            $i[0].innerText="邮箱格式有误";
            $i[0].innerText="邮箱不能为空";
            emailflag=false;
        }

        if($psd.value===""){
            $i[1].innerText="请输入6-12位的密码";
            $i[1].innerText="弱";
            $i[1].innerText="密码长度有误";
            $i[1].innerText="密码不能为空";
            pswflag=false;
        }

        

};
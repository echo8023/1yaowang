// 获取输入框元素对象，操作它的值，当失去焦点时传输给后端--ajax传输，后端获取用户名和数据库里面的用户名进行比较，将返回的结果给前端

// 取元素，拿他们的值。当点击注册按钮的时候取值
const $username = $("#username");
const $psd = $("#password");
const $checkpsd = $("#checkpsd");
const $register = $("#register");
const $i = $("i");
const $form = $("form");
let usernameflag = true;
let pswflag = true;
let checkpsdflag = true;
let flags = true;


// 一、提交事件(数据传输到后端，再)
$register.click(function () {
    // 校验 flag 
    if (!usernameflag || !pswflag || !flags || !checkpsdflag) { //阻止
        return;
    }
    $.ajax({
        type: "post",
        url: "http://10.31.157.31/js/meself-code/day33/php/lg_reg_php/register-data.php",//ajax传输数据给后端
        data: { //给后端
            username: $username.val(),
            psd: $psd.val(),
            checkpsd: $checkpsd.val()
        },
        success: function (d) { //获取d，为register.php中返回的true或false。  后端获取用户名/密码/密码重复等数据，和数据库里面的用户名进行比较
            if (!d) {
                $i[3].innerText = "用户名或密码错误输入有误";
                $i[3].style.cssText = "color:red;"
                // alert("用户名或密码错误输入有误");
            }
            else {//成功跳转到首页，前端的跳转是location.href="url"
                location.href = "login.html";
            }
        }
    });
});

// 二、表单验证
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

// 登录密码
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

//密码重复
$checkpsd.focus(function () {
    if ($checkpsd.val() === '') {
        $i[2].innerText = '密码重复不能为空';
        $i[2].style.cssText = 'color:#999;';
        checkpsdflag = false;
    }
});

$checkpsd.blur(function () {
    if ($checkpsd.val() !== '') {
        if ($checkpsd.val() === $psd.val()) {
            $i[2].innerText = '√';
            $i[2].style.cssText = 'color:green;';
            checkpsdflag = true;
        } else {
            $i[2].innerText = '两次密码不一致';
            $i[2].style.cssText = 'color:red;';
            checkpsdflag = false;
        }
    } else {
        $i[2].innerText = '密码重复不能为空';
        $i[2].style.cssText = 'color:red;';
        checkpsdflag = false;
    }
});



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
    if ($username.value === "") {
        $i[0].innerText = "请输入内容";
        $i[0].innerText = "邮箱格式有误";
        $i[0].innerText = "邮箱不能为空";
        usernameflag = false;
    }

    if ($psd.value === "") {
        $i[1].innerText = "请输入6-12位的密码";
        $i[1].innerText = "弱";
        $i[1].innerText = "密码长度有误";
        $i[1].innerText = "密码不能为空";
        pswflag = false;
    }
    if ($checkpsd.value === '') {
        $i[2].innerText = '密码重复不能为空';
        $i[2].innerText = '两次密码不一致';
        $i[2].style.cssText = 'color:red;';
        checkpsdflag = false;    
    }
};
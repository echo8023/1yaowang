const $username=$("#username");
const $psd=$("#psd");
// 取元素，拿他们的值。当点击登录按钮的时候取值
const $login=$("#login");
const $i=$("i");
const $$=$("form");
let usernameflag=true;
let pswflag=true;
let flags=true;
// 给login加点击事件,点击时发送ajax请求--把用户名和密码传给后端(此时还需要一个php文件接收)
// login.onclick=function(){
    $login.click(function(){
        $.ajax({
            type:"post",
            url:"http://localhost/js/meself-code/day33/php/lg&reg_php/login.php",//接收登录传输过来的数据
            data:{
                username:$username.value,
                psd:$psd.value
            },
            success:function(d){
                if(!d){
                    alert("用户名和密码错误");
                }else{//成功跳转到首页，前端的跳转是location.href="url"
                    localStorage.setItem("customname",$username.value);//首页里只要存在本地存储就取，所以首页里也要写JS
                    location.href="http://localhost/js/meself-code/day33/src/yyw_index.html";
                }
            }
        });
    });
    
// }




// 用户名(邮箱手机号用户名)
$username.onfocus=function(){
    $i[0].innerHTML="请输入内容";
    $i[0].style.cssText="color:red;"
    usernameflag=false;
}

$username.onblur=function(){
    if(this.value!==""){
        let emailreg=/^(\w+[+-._]*\w+)\@(\w+[+-._]*\w+).(\w+[+-._]*\w+)$/;
        if(emailreg.test(this.value)){
        $i[0].innerHTML="√";
        $i[0].style.cssText="color:green;";
        }
        else{
            $i[0].innerHTML="邮箱格式有误"
            $i[0].style.cssText="color:red;";
            emailflag=false;
        }
    }
    else{
        $i[0].innerHTML="邮箱不能为空";
        $i[0].style.cssText="color:red;"
        // $username.focus();
        emailflag=false;
    }
}

// 密码
$psd.onfocus=function(){
    $i[1].innerHTML="请输入6-12位的密码";
    $i[1].style.cssText="color:red;"
    pswflag=false;
}

$psd.oninput=function(){
        let pwdtype=0;
        let numReg=/\d+/;
        let upCase=/[A-Z]+/;
        let lowCase=/[a-z]+/;
        let others=/[\W\_]+/;
        if(numReg.test(this.value)){
            pwdtype++;
        }
        if(upCase.test(this.value)){
            pwdtype++;
        }
        if(lowCase.test(this.value)){
            pwdtype++;
        }
        if(others.test(this.value)){
            pwdtype++;
        }

        switch(pwdtype){
            case 1: 
                $i[1].innerHTML="弱";
                $i[1].style.cssText="color:red;";
                pswflag=false;
                break;
            case 2: 
            case 3: 
                $i[1].innerHTML="中";
                $i[1].style.cssText="color:green;";
                break;
            case 4:
                $i[1].innerHTML="强";
                $i[1].style.cssText="color:green;";
                break;
        }
}

$psd.onblur=function(){
    if(this.value!==""){
        if(this.value.length>=6 && this.value.length<=12){
            $i[1].innerHTML="√";
            $i[1].style.cssText="color:green;";
        }
        else{
            $i[1].innerHTML="密码长度有误";
            $i[1].style.cssText="color:red;";
            pswflag=false;
        }
    }
    else{
        $i[1].innerHTML="密码不能为空";
        $i[1].style.cssText="color:red";
        pswflag=false;
    }
    // aInput[2].focus();
}

// 表单提交
$oForm.submit=function(){
    if($username.value===""){
        $i[0].innerHTML="请输入内容";
        $i[0].innerHTML="邮箱格式有误";
        $i[0].innerHTML="邮箱不能为空";
        emailflag=false;
    }

    if($psd.value===""){
        $i[1].innerHTML="请输入6-12位的密码";
        $i[1].innerHTML="弱";
        $i[1].innerHTML="密码长度有误";
        $i[1].innerHTML="密码不能为空";
        pswflag=false;
    }

    if(aInput[2].value===""){
        aSpan[2].innerHTML="请重复输入密码";
        aSpan[2].innerHTML="两次的密码不一致，请重新输入";
        aSpan[2].innerHTML="输入不能为空";
        flags=false;
    }
     

    if (!emailflag || !psdflag || !flags) { //阻止
        return false;
    }
    
};
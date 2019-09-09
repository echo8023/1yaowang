// 获取输入框元素对象，操作它的值，当失去焦点时传输给后端--ajax传输，后端获取用户名和数据库里面的用户名进行比较，将返回的结果给前端
const username=document.querySelector("#username");
const oSpan=document.querySelectorAll("$span")[0];

username.onblur=function(){
    ajax({
        url:"http://localhost/js/meself-code/day33/php/lg&reg_php/register-data.php",
        data:{//给后端
            checkname:username.value
        },
        success:function(d){//获取d，为register.php中返回的true或false
            // console.log(d);
            if(!d){
                oSpan.innerHTML="ok";
                oSpan.style.color="green";
            }else{
                oSpan.innerHTML="该用户名已存在，请重新输入";
                oSpan.style.color="red";
            }

        }
    })
}
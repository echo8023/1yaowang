<?php
// 引入连接的php
require "conn.php";
// 判断是否有这两个值。存在，就取到这两个值
if(isset($_POST["username"]) && isset($_POST["psd"])){
    $username=$_POST["username"];
    $psd=sha1($_POST["psd"]);

    // 取的数据和数据库中的匹配
    $result=$conn->query("select * from usertable where username='$username' and password='$psd'");
    if($result->fetch_assoc()){//上面的匹配，通过$result->fetch_assoc()方法,能取到值，代表匹配能取到值，代表匹配成功。
        // echo true;//返回成功，前端可以接收这个值，见login.js文件(--ajax封装函数的success:function(d){} )
        // header("location:http://10.31.157.31/js/meself-code/day33/src/yyw_index.html");
        echo true;
    }else{
        echo false;
    }
}
<?php
// 引入连接好了的数据库
require "conn.php";

// 2.检测用户名
if(isset($_GET["checkname"])){
    $checkname=$_GET["checkname"];
    // 通过查询方式来测试是否存在用户名，
    // 并将用户名检测结果(true/false)返回后端---在reg.js文件中写
    $result=$conn->query("select * from usertable where username='$checkname'");
    if($result->fetch_assoc()) {
        echo true;
    } else {
        echo false;
    }
}

// 1。获取数据
// 判断前端用户是否点击了submit按钮(点击了后，能接收到前端输入表单的值。通过name传递值，不点击得不到)
if(isset($_POST["submit"])){
    $username=$_POST["username"];
    $psd=sha1($_POST["password"]);//四十位的加密
    // $email=$_POST["email"];
    // 利用sql语句，将上面获取的数据，添加到数据库中(用conn对象下面的成员query)
    $sql="insert into usertable(`username`,`password`,`date`) values('$username', '$psd', NOW())"; //日期自动的，函数NOW()
    // $sql="insert into usertable(`username`,`password`,`email`,`date`) values('$username', '$psd' ,'$email',NOW())"; //日期自动的，函数NOW()
    if($conn->query($sql) === TRUE ) {
        // 3.注册成功，PHP的跳转--通过header("location:url")
        header("location:http://localhost/js/meself-code/day33/src/login.html");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
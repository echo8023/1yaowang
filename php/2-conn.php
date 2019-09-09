<?php
// 连接数据库
header("content-type:text/html;charset=utf-8"); //设置字符编码(防止中文乱码)
define("HOST","localhost");
define("NAME","root");
define("PSD","");
define("DBNAME","yhr");//数据库的名字
$conn=@new mysqli(HOST,NAME,PSD,DBNAME);
if($conn->connect_error){
    die("数据库连接失败".$conn->connect_error);
}

// 此页面在服务器下打开，地址栏中的链接就为得到的接口数据。再通过ajax进行数据交互
// http://localhost/js/meself-code/day33/php/3-floor_datalist.php    //得到的接口数据

// define()
// define( string $name , mixed $value [, bool $case_insensitive ])
// Defines a named constant


<?php
// 连接数据库
header("content-type:text/html;charset=utf-8"); //设置字符编码(防止中文乱码)
define("HOST","localhost");
define("NAME","root");
define("PSD","");
define("DBNAME","yhr");
$conn=@new mysqli(HOST,NAME,PSD,DBNAME);
if($conn->connect_error){
    die("数据库连接失败".$conn->connect_error);
}
// define()
// define( string $name , mixed $value [, bool $case_insensitive ])
// Defines a named constant

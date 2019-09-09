<?php
    header('content-type:text/html;charset=utf-8');//设置字符编码
    //连接数据库
    $conn=@mysql_connect('localhost','root','');//无密码置空
    if(!$conn){
        die('数据库连接错误'.mysql_error());
    }
    //选择数据库
    mysql_select_db("yhr");//数据库的名字
    //设置字符集
    mysql_query('SET NAMES UTF8');

    //获取记录集
    $result=mysql_query("select * from floor_data");
    

    $arr=array();
    //mysql_num_rows():获取记录集的条数
    //mysql_fetch_array($result,MYSQL_ASSOC):获取记录的第一条，没执行一次，继续获取下一条。
    //MYSQL_ASSOC:获取的数组是字符串下标。
    for($i=0;$i<mysql_num_rows($result);$i++){
        $arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
    }

    echo json_encode($arr);

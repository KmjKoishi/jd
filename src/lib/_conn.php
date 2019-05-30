<?php
    @header("content-type:text/html;charset=utf-8");

    // 创建数据库参数
    $mySql_conf=array(
        "host"=>"localhost:3306",
        "db_user"=>"root",
        "db_pwd"=>"",
        "db"=>"h5_1903"
    );

    // 连接数据库,@ 屏蔽报错
    $mysqli=@new mysqli($mySql_conf["host"],$mySql_conf["db_user"],$mySql_conf["db_pwd"]);

    // 设置编码格式
    $mysqli->query("set name 'utf8'");

    // 判断是否连接出错，如果出错则禁止代码继续执行
    if($mysqli->connect_errno)
    {
        die("链接错误".$mysqli->connect_errno);
    }

    // 选择数据库
    $select_db=$mysqli->select_db($mySql_conf["db"]);

    // 检查数据库是否连接成功，如果失败则禁止代码继续执行
    if(!$select_db)
    {
        die("连接错误".$mysqli->error);
    }
?>
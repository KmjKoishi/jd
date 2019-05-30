<?php
    // 链接数据库
    include('./_conn.php');

    // 创建数据库语句
    $sql = "select * from product";

    // 执行数据库命令，取表内所有行
    $res = $mysqli->query($sql);

    // 包装json用数组
    $arr = array();

    // 遍历返回值，push进数组
    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    // 转json
    $json = json_encode($arr);
    
    // 返回json给前端
    echo $json;

    // 关闭数据库
    $mysqli->close();
?>
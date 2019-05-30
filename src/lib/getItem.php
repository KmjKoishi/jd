<?php
    // 导入文件
    include('./_conn.php');

    // 取前端返回数据
    $id = $_REQUEST['id'];

    // 创建数据库语句
    $sql = "select * from product where id = $id";

    // 执行数据库语句根据ID检索商品
    $res = $mysqli->query($sql);

    // 拼接检索后的数据
    $row = $res->fetch_assoc();

    // 转json
    $json = json_encode($row);

    // 返给前端
    echo $json;

    // 关闭数据库
    $mysqli->close();
?>
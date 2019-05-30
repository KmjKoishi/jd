<?php
    // 连接数据库
    include('./_conn.php');

    // 接收前端发送的数据
    $idList = $_REQUEST['idList'];

    // 创建数据库语句
    $sql = "select * from product where id in ($idList)";

    // 执行数据库语句，根据前端传来的ID遍历数据库取出所有对应ID的商品信息
    $res = $mysqli -> query($sql);

    // 创建数组用于push数据
    $arr = array();
    
    // 遍历取到的所有数据，逐条push
    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    // 将push完毕的数组转成json
    $json = json_encode($arr);
    
    // 返给前端
    echo $json;

    // 关闭数据库
    $mysqli->close();
?>
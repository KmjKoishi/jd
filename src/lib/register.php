<?php
    // 引入php
    include("./_conn.php");

    // 注册的业务逻辑
    // 1. 连接数据库
    // 2. 接收前端传入的内容
    // 3. 查找前端给予的用户名在数据库中是否存在
    // 如果存在 注册失败
    // 不存在 插入一条数据 注册成功

    // 取前端返回内容
    $userName=$_REQUEST["userName"];
    $userPWD=$_REQUEST["userPWD"];
    $userEml=$_REQUEST["userEml"];
    $userSex=$_REQUEST["userSex"];
    $userPhone=$_REQUEST["userPhone"];

    // 创建数据库命令
    $sql="select * from jd_users where userName='$userName'";

    // 执行数据库命令,查找数据库内是否已存在欲提交的用户名
    $result=$mysqli->query($sql);

    // 如果返回数据的num_rows>0则表示欲提交的用户名已存在。
    // 终止代码执行并返回提示内容
    if($result->num_rows>0)
    {
        die('{"regHas":false,"msg":"该用户名已存在！"}');
    }

    // 创建数据库命令
    $insertSql="insert into jd_users(userName,userPWD,userEml,userSex,userPhone)values('$userName','$userPWD','$userEml','$userSex','$userPhone')";

    // 执行数据库命令，在数据库内创建新行并插入前端传入的数据
    $res=$mysqli->query($insertSql);

    // 判断状态，如果传入成功则弹出提示，并跳转到登陆页面
    if($res)
    {
        echo '{"regHas":true,"msg":"注册成功！点击登陆！"}';
    }

    //关闭数据库连接，释放资源
    $mysqli->close();
?>
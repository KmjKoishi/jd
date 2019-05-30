<?php
    // 引入php文件
    include('./_conn.php');

    // 登陆的业务逻辑
    // 1. 连接数据库
    // 2. 获取前端传过来的数据
    // 3. 在数据库查询数据
    // 4. 存在并且用户名密码都正确 登陆成功  否则 失败
    // 5. 如果成功 跳转到主页   如果失败 跳回登陆页

    // 取前端提交的的内容
   
    $userName=$_REQUEST["userName"];
    $userPWD=$_REQUEST["userPWD"];

    // 创建数据库命令
    $sql="select * from jd_users where userName='$userName' and userPWD='$userPWD'";

    // 执行数据库命令，寻找数据库内是否有某一条数据的账号与密码与用户所输入的一致。
    $result=$mysqli->query($sql);

    // 如果返回的num_rows>0则表示输入的内容与数据库的内容匹配，弹出登陆成功
    // 反之打回
    if($result->num_rows>0)
    {
        echo '{"logHas":true,"msg":"OK"}';
    }
    else
    {
        echo '{"logHas":false,"msg":"Err"}';
    }

    // 关闭服务器
    $mysqli->close();
?>
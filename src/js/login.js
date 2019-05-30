$(function()
{
    let $logSubimt=$(".logSubimt");
    let $userName=$("#userName");
    let $userPwd=$("#userPwd");

    $logSubimt.on("click",function()
    {

        if($userName.val()&&$userPwd.val())
        {
            $.ajax(
                {
                    type:"POST",
                    url:"../lib/login.php",
                    data:
                    {
                        userName:$userName.val(),
                        userPWD:$userPwd.val()
                    },
                    success:function(data)
                    {
                        data=$.parseJSON(data);
                        console.log(data);
                        if(data.logHas)
                        {
                            cookie.set("isLogin","true",1);
                            cookie.set("userName",$userName.val(),1);
                            alert("登陆成功，点击跳转");
                            location.href="./index.html";
                        }
                        else
                        {
                            alert("用户名，密码错误，请检查");
                        }
                    },
                    err:function(xhr)
                    {
                        console.log(xhr.status);
                    }
                });
        }
        else
        {
            alert("账户、密码不能为空!");
        }
    });
    
});
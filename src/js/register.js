$(function()
{
    // 输入检测正则
    let regs=
    {
        userName:/^[a-z0-9_-]{3,16}$/,
        userPWD:/^[a-z0-9_-]{6,18}$/,
        userEml:/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/,
        userPhone:/^1(3|4|5|7|8)\d{9}$/
    }

    // 取dom
    let $userName=$(".userName");
    let $userPWD=$(".userPWD");
    let $userEml=$(".userEml");
    let $userPhone=$(".userPhone");

    // 初始化input状态
    for(let i=0;i<$("input:not(:radio)").length;i++)
    {
        $($("input:not(:radio)")[i]).data("pass",false);
    }

    // 用户名正则检测
    $userName.on("blur",function()
    {
        // 如果输入框内容不为空
        if(this.value!=="")
        {
            // 正则检测，如果通过
            if(regs.userName.test(this.value))
            {
                // 发送ajax检测用户名是否已存在
                let that=this;
                $.ajax(
                    {
                        type:"POST",
                        url:"../lib/hasUser.php",
                        data:
                        {
                            userName:$userName.val()
                        },
                        success:function(data)
                        {
                            data=$.parseJSON(data);
                            // 如果已存在
                            if(data.hasExist)
                            {
                                // 提示用户已存在，要求更换
                                $(that).parents("p").find(".statusIco").removeClass("isOk").addClass("isErr");
                                $(that).parents("p").find(".statusText").html("该用户名已存在，请更换");
                                $(that).addClass("errTip");
                                $(that).data("pass",false);
                            }
                            // 否则表示该用户名不存在，可以注册
                            else
                            {
                                // 清空错误文本，添加类名isOk
                                $(that).parents("p").find(".statusText").html("");
                                $(that).parents("p").find(".statusIco").removeClass("isErr").addClass("isOk");
                                $(that).removeClass("errTip");
                                $(that).data("pass",true);
                            }
                        },
                        err:function(xhr)
                        {
                            console.log(xhr.status);
                        }
                    });
            }
            // 否则则表示未通过正则检测
            else
            {
                // 显示错误文本，添加类名isErr
                $(this).parents("p").find(".statusIco").removeClass("isOk").addClass("isErr");
                $(this).parents("p").find(".statusText").html("用户名不符合规定，请检查");
                $(this).addClass("errTip");
                $(this).data("pass",false);
            }
        }
        // 否则则表示输入框为空
        else
        {
            // 清空错误文本，清空所有类名
            $(this).parents("p").find(".statusText").html("");
            $(this).parents("p").find(".statusIco").removeClass("isErr").removeClass("isOk");
            $(this).removeClass("errTip");
            $(this).data("pass",false);
        }
    });

   // 密码正则检测
   $userPWD.on("blur",function()
   {
       // 如果输入框内容不为空
       if(this.value!=="")
       {
           // 正则检测，如果通过
           if(regs.userPWD.test(this.value))
           {
               // 清空错误文本，添加类名isOk
               $(this).parents("p").find(".statusText").html("");
               $(this).parents("p").find(".statusIco").removeClass("isErr").addClass("isOk");
               $(this).removeClass("errTip");
               $(this).data("pass",true);
           }
           // 否则则表示未通过正则检测
           else
           {
               // 显示错误文本，添加类名isErr
               $(this).parents("p").find(".statusIco").removeClass("isOk").addClass("isErr");
               $(this).parents("p").find(".statusText").html("密码不符合规定，请检查");
               $(this).addClass("errTip");
               $(this).data("pass",false);
           }
       }
       // 否则则表示输入框为空
       else
       {
           // 清空错误文本，清空所有类名
           $(this).parents("p").find(".statusText").html("");
           $(this).parents("p").find(".statusIco").removeClass("isErr").removeClass("isOk");
           $(this).removeClass("errTip");
           $(this).data("pass",false);
       }
   });

   // 邮箱正则检测
   $userEml.on("blur",function()
   {
       // 如果输入框内容不为空
       if(this.value!=="")
       {
           // 正则检测，如果通过
           if(regs.userEml.test(this.value))
           {
               // 清空错误文本，添加类名isOk
               $(this).parents("p").find(".statusText").html("");
               $(this).parents("p").find(".statusIco").removeClass("isErr").addClass("isOk");
               $(this).removeClass("errTip");
               $(this).data("pass",true);
           }
           // 否则则表示未通过正则检测
           else
           {
               // 显示错误文本，添加类名isErr
               $(this).parents("p").find(".statusIco").removeClass("isOk").addClass("isErr");
               $(this).parents("p").find(".statusText").html("邮箱格式不正确，请检查");
               $(this).addClass("errTip");
               $(this).data("pass",false);
           }
       }
       // 否则则表示输入框为空
       else
       {
           // 清空错误文本，清空所有类名
           $(this).parents("p").find(".statusText").html("");
           $(this).parents("p").find(".statusIco").removeClass("isErr").removeClass("isOk");
           $(this).removeClass("errTip");
           $(this).data("pass",false);
       }
   });

   // 手机正则检测
   $userPhone.on("blur",function()
   {
       // 如果输入框内容不为空
       if(this.value!=="")
       {
           // 正则检测，如果通过
           if(regs.userPhone.test(this.value))
           {
               // 清空错误文本，添加类名isOk
               $(this).parents("p").find(".statusText").html("");
               $(this).parents("p").find(".statusIco").removeClass("isErr").addClass("isOk");
               $(this).removeClass("errTip");
               $(this).data("pass",true);
           }
           // 否则则表示未通过正则检测
           else
           {
               // 显示错误文本，添加类名isErr
               $(this).parents("p").find(".statusIco").removeClass("isOk").addClass("isErr");
               $(this).parents("p").find(".statusText").html("手机号码格式不正确，请检查");
               $(this).addClass("errTip");
               $(this).data("pass",false);
           }
       }
       // 否则则表示输入框为空
       else
       {
           // 清空错误文本，清空所有类名
           $(this).parents("p").find(".statusText").html("");
           $(this).parents("p").find(".statusIco").removeClass("isErr").removeClass("isOk");
           $(this).removeClass("errTip");
           $(this).data("pass",false);
       }
   });

    // 判断是否有input输入状态不合法，如果有，返回下标
   function judeStatus()
   {
        for(let i=0;i<$("input:not(:radio)").length;i++)
        {
            if(!$($("input:not(:radio)")[i]).data("pass"))
            {
                return i;
            }
        }
        return -1;
   }

    // 注册按钮被点击
    $(".submit").on("click",function()
    {
        // 如果所有正则匹配通过则发送ajax
        if(judeStatus()===-1)
        {
            $.ajax(
                {
                    type:"POST",
                    url:"../lib/register.php",
                    data:
                    {
                        userName:$userName.val(),
                        userPWD:$userPWD.val(),
                        userEml:$userEml.val(),
                        userSex:$(".userSex:checked").attr("value"),
                        userPhone:$userPhone.val()
                    },
                    success:function(data)
                    {
                        data=$.parseJSON(data);
                        alert(data.msg);
                        location.href="./login.html";
                    },
                    err:function(xhr)
                    {
                        console.log(xhr.status);
                    }
                });
        }
        // 反之告知客户哪里不合法
        else
        {
            // 让不正确的input获取焦点并添加class与错误文本
            $($("input:not(:radio)")[judeStatus()]).focus();
            $($("input:not(:radio)")[judeStatus()]).parents("p").find(".statusIco").addClass("isErr");
            $($("input:not(:radio)")[judeStatus()]).parents("p").find(".statusText").html("该字段格式错误，请检查");
            $($("input:not(:radio)")[judeStatus()]).addClass("errTip");
        }
    });
});
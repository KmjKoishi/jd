$(function ()
{
    // 取cookie并渲染页面登录文本
    getCookie();
    function getCookie()
    {
        // 如果取到cookie，表示已经登录过
        if(cookie.get("isLogin")==="true")
        {
            $(".loginDel").css("display","none");
            $(".welLogin").css("display","block").addClass("jdFont").html("欢迎你,"+cookie.get("userName"));
            $(".quitLogin").css("display","block").removeClass("jdFont").html("退出登录").attr("href","javascript:;");
            $(".welLogin").attr("href","javascript:;");

            $(".welCome").html("Hi~"+cookie.get("userName"));
            $(".middLogin").css("display","inline-block").addClass("jdFont").html(cookie.get("userName")).attr("href","javascript:;");
            $(".midQuitLogin").css("display","inline-block").removeClass("jdFont").html("退出登录").attr("href","javascript:;");

            $(".face").attr("src","../images/100.jpg");
        }
        // 否则表示为游客模式
        else
        {
            $(".loginDel").css("display","block");
            $(".welLogin").css("display","block").removeClass("jdFont").html("您好,请登录");
            $(".quitLogin").css("display","block").addClass("jdFont").html("免费注册").attr("href","./register.html");
            $(".welLogin").attr("href","./login.html");

            $(".welCome").html("Hi~欢迎来到京东！");
            $(".middLogin").css("display","inline-block").removeClass("jdFont").html("登录").attr("href","./login.html");;
            $(".midQuitLogin").css("display","inline-block").removeClass("jdFont").html("注册").attr("href","./register.html");
            $(".face").attr("src","../images/no_login.jpg");
        }
    }

    // 置随机数
    function randNum(minNum,maxNum)
    {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
    }
    // 渲染城市列表
    appendCityList();
    function appendCityList()
    {
        $.ajax(
            {
                type:"GET",
                url:"../json/city.json?callback=callback",
                dataType:"jsonp",
                jsonpCallback:"callback",
                success:function (data)
                {
                    let index=randNum(0,data.length);
                    for(let i=0;i<data.length;i++)
                    {
                        let _name=data[i].name;
                        if(data[i].name.length>=3)
                        {
                            _name=data[i].name.substring(0,data[i].name.length-1);
                        }
                        let childDom=$("<li><a href=\"javascript:;\">"+_name+"</a></li>").prependTo($(".cityTwoMenu>.clear"));
                    }
                    $($(".cityTwoMenu>.clear a")[index]).addClass("cityIsChoice");
                    $(".changeSty>span").html($($(".cityTwoMenu>.clear a")[index]).html());
                },
                error:function (err)
                {
                    console.log(err.status);
                },
            });
    }
    // 避免样式覆盖
    $("body").delegate(".cityIsChoice","mouseenter",function ()
    {
        $(".cityIsChoice").css(
            {
                "background": "#f10215",
                "color": "#fff",
            });
    });

    // footer精灵图定位
    footerSet();
    function footerSet()
    {
        for(let s=0;s<$(".ftIcoFont").length;s++)
        {
            $($(".ftIcoFont")[s]).css("background","url(../images/sprite.footer.png) -"+(41*s)+"px -192px");
        }
    }

    // 页面载入完后发送ajax
    getItem();
    function getItem()
    {
        if(cookie.get("shop"))
        {
            $(".cartConBox").removeClass("cartisHidden");
            $(".cartEmptyBox").addClass("cartisHidden");
            let idList = $.parseJSON(cookie.get('shop')).map(el => el.id).join();
            $.ajax(
                {
                    type:"POST",
                    url:"../lib/cart.php",
                    data:
                    {
                        idList:idList,
                    },
                    success:function(data)
                    {
                        data=$.parseJSON(data);
                        // console.log(data);
                        for(let i=0;i<data.length;i++)
                        {
                            let itemBox=$("<div class=\"itmBox\">\n" +
                            "                    <div class=\"itmConBox\">\n" +
                            "                        <input type=\"checkbox\" name=\"checkbox\" class=\"itmCheckbox\">\n" +
                            "                        <div class=\"itmCellTit\">\n" +
                            "                            <a href=\""+"./product.html?id="+data[i].id+"\" class=\"itmImgBox\">\n" +
                            "                                <img src=\""+$.parseJSON(data[i].pic)[0].src+"\" alt=\""+$.parseJSON(data[i].pic)[0].title+"\">\n" +
                            "                            </a>\n" +
                            "                            <div class=\"childBox\">\n" +
                            "                                <a href=\""+"./product.html?id="+data[i].id+"\" class=\"titText\">"+data[i].title+"</a>\n" +
                            "                                <div class=\"otherServeBox\">\n" +
                            "                                    <i class=\"serveIco\"></i>\n" +
                            "                                    <a href=\"javascript:;\">选服务</a>\n" +
                            "                                </div>\n" +
                            "                            </div>\n" +
                            "                        </div>\n" +
                            "                        <div class=\"itmProps\">\n" +
                            "                            <div class=\"ov\" title=\"点击图片或标题可跳转\">点击图片或标题可跳转</div>\n" +
                            "                            <div class=\"ov\" title=\""+data[i].details+"\">"+data[i].details+"</div>\n" +
                            "                        </div>\n" +
                            "                        <div class=\"itmPrice\">\n" +
                            "                            <strong title=\"¥"+parseFloat(data[i].nowPrice).toFixed(2)+"为物品单价"+"\">"+"¥"+parseFloat(data[i].nowPrice).toFixed(2)+"</strong>\n" +
                            "                        </div>\n" +
                            "                        <div class=\"itmQuantity\">\n" +
                            "                            <a href=\"javascript:;\" class=\"subItm\">-</a>\n" +
                            "                            <input type=\"text\" value=\""+$.parseJSON(cookie.get("shop"))[i].num+"\" class=\"itmRes\">\n" +
                            "                            <a href=\"javascript:;\" class=\"addItm\">+</a>\n" +
                            "                            <div>库存"+data[i].num+"件</div>\n" +
                            "                        </div>\n" +
                            "                        <div class=\"itmSum\">\n" +
                            "                            <strong>¥"+itemTotalPrice(parseFloat(data[i].nowPrice).toFixed(2),$.parseJSON(cookie.get("shop"))[i].num).toFixed(2)+"</strong>\n" +
                            "                        </div>\n" +
                            "                        <div class=\"cell\">\n" +
                            "                            <a href=\"javascript:;\" class=\"itmDel\">删除</a>\n" +
                            "                            <a href=\"javascript:;\" class=\"itmDel\">移到我的关注</a>\n" +
                            "                        </div>\n" +
                            "                    </div>\n" +
                            "                </div>");
                            $(".optionsBox").before(itemBox);
                            $(".allItmNum").html($(".itmBox").length);
                        }
                    },
                    err:function(xhr)
                    {
                        console.log(xhr);
                    }
                });
        }
        else
        {
            $(".cartConBox").addClass("cartisHidden");
            $(".cartEmptyBox").removeClass("cartisHidden");
        }
    }
    
    /*
     * ajax加载渲染页面完毕后先取cookie内有无key[checkbox]
     * 有则代表之前存过这条cookie，取出并将其渲染进页面的checkbox，用于设置checkedbox是否为选中状态
     * ajax是异步的，所以讨一个一次性计时器
     */
    setTimeout(function()
    {
        chageCheckbox();
    },200);
    function chageCheckbox()
    {
        if(cookie.get("checkbox"))
        {
            // for循环改变所有checkbox选中状态
            let checked=cookie.get("checkbox").split(",");
            for(let i=0;i<$("input[type=checkbox]").length;i++)
            {
                $("input[type=checkbox]")[i].checked=!!parseInt(checked[i]);
            }
            jdCheckBox();
        }
    }

    // 商品总价渲染
    function itemTotalPrice()
    {
        // 如果长度为2，做乘法运算(商品小计)
        if(arguments.length===2)
        {
            return arguments[0]*arguments[1];
        }
        // 如果参数1为数组，遍历数组做加法操作(商品总计)
        else if(Array.isArray(arguments[0]))
        {
            let tmp=0;
            for(let i=0;i<arguments[0].length;i++)
            {
                tmp+=parseFloat(arguments[0][i]);
            }
            return tmp;
        }
        // 如果参数1为对象，取对象内的数量和单价相乘(商品小计数量被改变)
        else if(typeof arguments[0] === "object")
        {
            return parseFloat($(arguments).parents(".itmConBox").find(".itmRes").val()*$(arguments[0]).parents(".itmConBox").find(".itmPrice>strong").html().slice(1)).toFixed(2);
        }
    }

    // 页面载入后先获取一次checkbox选中状态并渲染总价
    setTimeout(function()
    {
        jdCheckBox();
    },200);

    // 选择商品checkbox被点击
    $("body").on("click",".itmCheckbox",function()
    {
        jdCheckBox();
    })

    // 全选商品checkbox被点击
    $(".checkBox>input").on("click",function()
    {
        // 创建数组储存checkbox选中状态
        let checkArr=[];
        // 根据当前checkbox状态渲染提示文本
        if(this.checked)
        {
            $(".checkBox>input").next().html("取消全选");
        }
        else
        {
            $(".checkBox>input").next().html("全选");
        }
        // for循环改变所有checkbox选中状态
        for(let i=0;i<$("input[type=checkbox]").length;i++)
        {
            $("input[type=checkbox]")[i].checked=this.checked;
            // 存入当前所有checkbox状态并存入数组
            if($("input[type=checkbox]")[i].checked)
            {
                checkArr.push(1);
            }
            else
            {
                checkArr.push(0);
            }
        }
        // 根据选中结果渲染总价
        jdCheckBox();
        // 选中状态存入cookie
        cookie.set("checkbox",checkArr,1);
    });

    // 判断选择商品checkbox
    function jdCheckBox()
    {
        // 总价数组
        let totalArr=[];
        for(let i=0;i<$(".itmSum>strong").length;i++)
        {
            if($(".itmConBox").find(".itmCheckbox")[i].checked)
            {
                totalArr.push($(".itmSum>strong")[i].innerHTML.slice(1))
            }
        }
        $(".priceSum>em").html("¥"+itemTotalPrice(totalArr).toFixed(2));
    }

    // 数量增加被点击
    $("body").on("click",".addItm",function()
    {
        if(parseInt($(this).parents(".itmConBox").find(".itmRes").val())+1>parseInt($(this).parents(".itmConBox").find(".itmQuantity>div").html().slice(2)))
        {
            $(this).parents(".itmConBox").find(".itmRes").val(parseInt($(this).parents(".itmConBox").find(".itmQuantity>div").html().slice(2)));
            alert("所选数量超过了库存数量，请重新输入");
            $(this).parents(".itmConBox").find(".itmSum>strong").html("¥"+itemTotalPrice(this));

            // 调用函数判断选择商品checkbox状态，为true渲染总价
            jdCheckBox();
        }
        else
        {   
            let tmpNum=parseInt($(this).parents(".itmConBox").find(".itmRes").val());
            $(this).parents(".itmConBox").find(".itmRes").val(tmpNum+1);
            $(this).parents(".itmConBox").find(".itmSum>strong").html("¥"+itemTotalPrice(this));

            // 调用函数判断选择商品checkbox状态，为true渲染总价
            jdCheckBox();
        }
    });
    // 数量减少被点击
    $("body").on("click",".subItm",function()
    {
        if(parseInt($(this).parents(".itmConBox").find(".itmRes").val())-1<1)
        {
            $(this).parents(".itmConBox").find(".itmRes").val(1)
            alert("所选数量超过了库存数量，请重新输入");
            $(this).parents(".itmConBox").find(".itmSum>strong").html("¥"+itemTotalPrice(this));

            // 调用函数判断选择商品checkbox状态，为true渲染总价
            jdCheckBox();
        }
        else
        {   
            let tmpNum=parseInt($(this).parents(".itmConBox").find(".itmRes").val());
            $(this).parents(".itmConBox").find(".itmRes").val(tmpNum-1);
            $(this).parents(".itmConBox").find(".itmSum>strong").html("¥"+itemTotalPrice(this));

            // 调用函数判断选择商品checkbox状态，为true渲染总价
            jdCheckBox();
        }
    });
    // 数量input失去焦点检测
    $("body").on("blur",".itmRes",function()
    {
        if($(this).parents(".itmConBox").find(".itmRes").val()<0)
        {
            this.value=1;
        }
        if($(this).parents(".itmConBox").find(".itmRes").val()>parseInt($(this).parents(".itmConBox").find(".itmQuantity>div").html().slice(2)))
        {
            $(this).parents(".itmConBox").find(".itmRes").val(parseInt($(this).parents(".itmConBox").find(".itmQuantity>div").html().slice(2)));
        }
        if($(this).parents(".itmConBox").find(".itmRes").val()==="")
        {
            $(this).parents(".itmConBox").find(".itmRes").val(1);
        }

        // 渲染小计价格
        $(this).parents(".itmConBox").find(".itmSum>strong").html("¥"+itemTotalPrice(this));

        // 调用函数判断选择商品checkbox状态，为true渲染总价
        jdCheckBox();
    });
});
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
    // 退出登录点击事件
    $(".quitLogin").on("click",function()
    {
        if($(this).attr("href")==="javascript:;")
        {
            cookie.remove("isLogin");
            cookie.remove("userName");
            alert("退出成功，欢迎下次再来！");
            location.reload();
        }
    });

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
        if(cookie.get("shop")&&cookie.get("shop")!=="[]")
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
                            "                            <a href=\"javascript:;\" class=\"itmRemove\">移到我的关注</a>\n" +
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
            if(cookie.get("isLogin"))
            {
                $(".logBtn").css("display","none");
            }
            else
            {
                $(".logBtn").css("display","inline-block");
            }
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
        // 创建临时数组取出cookie
        let tmpArr=cookie.get("checkbox").split(",");
        // 遍历所有checkbox，取出点击checkbox的索引，根据点击的checkbox的checked值来替换临时数组对应下标的值
        // 为true时替换为1，false时替换成0
        if(this.checked)
        {
            tmpArr[$("input[type=checkbox]").index($(this))]=1;
        }
        else
        {
            tmpArr[$("input[type=checkbox]").index($(this))]=0;
        }
        // 修改cookie
        cookie.set("checkbox",tmpArr,1);
        // 渲染总价
        jdCheckBox();
    });

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
        // 临时计数变量
        let itemRes=0;
        for(let i=0;i<$(".itmSum>strong").length;i++)
        {
            if($(".itmConBox").find(".itmCheckbox")[i].checked)
            {
                totalArr.push($(".itmSum>strong")[i].innerHTML.slice(1))
            }
        }
        $(".priceSum>em").html("¥"+itemTotalPrice(totalArr).toFixed(2));
        for(let i=0;i<$(".itmCheckbox").length;i++)
        {
            if($(".itmCheckbox")[i].checked)
            {
                itemRes++;
            }
        }
        $(".connRight .jdFont").html(itemRes);
    }

    // 数量增加被点击
    $("body").on("click",".addItm",function()
    {
        if(parseInt($(this).parents(".itmConBox").find(".itmRes").val())+1>parseInt($(this).parents(".itmConBox").find(".itmQuantity>div").html().slice(2)))
        {
            $(this).parents(".itmConBox").find(".itmRes").val(parseInt($(this).parents(".itmConBox").find(".itmQuantity>div").html().slice(2)));
            alert("所选数量超过了库存数量，请重新输入");
            $(this).parents(".itmConBox").find(".itmSum>strong").html("¥"+itemTotalPrice(this));

            // 单项商品数量点击增加时候，修改cookie内存的原数值
            addShopCar($(this).parents(".itmConBox").find(".itmImgBox").attr("href").split("=")[1],$(this).parents(".itmConBox").find(".itmRes").val());

            // 调用函数判断选择商品checkbox状态，为true渲染总价
            jdCheckBox();
        }
        else
        {   
            let tmpNum=parseInt($(this).parents(".itmConBox").find(".itmRes").val());
            $(this).parents(".itmConBox").find(".itmRes").val(tmpNum+1);
            $(this).parents(".itmConBox").find(".itmSum>strong").html("¥"+itemTotalPrice(this));

            // 单项商品数量点击增加时候，修改cookie内存的原数值
            addShopCar($(this).parents(".itmConBox").find(".itmImgBox").attr("href").split("=")[1],$(this).parents(".itmConBox").find(".itmRes").val());

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

            // 单项商品数量点击减少时候，修改cookie内存的原数值
            addShopCar($(this).parents(".itmConBox").find(".itmImgBox").attr("href").split("=")[1],$(this).parents(".itmConBox").find(".itmRes").val());

            // 调用函数判断选择商品checkbox状态，为true渲染总价
            jdCheckBox();
        }
        else
        {   
            let tmpNum=parseInt($(this).parents(".itmConBox").find(".itmRes").val());
            $(this).parents(".itmConBox").find(".itmRes").val(tmpNum-1);
            $(this).parents(".itmConBox").find(".itmSum>strong").html("¥"+itemTotalPrice(this));

            // 单项商品数量点击减少时候，修改cookie内存的原数值
            addShopCar($(this).parents(".itmConBox").find(".itmImgBox").attr("href").split("=")[1],$(this).parents(".itmConBox").find(".itmRes").val());

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

        // 单项商品数量input失去焦点判断是否改变过value，如果改变过则更改cookie内原数值
        addShopCar($(this).parents(".itmConBox").find(".itmImgBox").attr("href").split("=")[1],$(this).parents(".itmConBox").find(".itmRes").val());

        // 调用函数判断选择商品checkbox状态，为true渲染总价
        jdCheckBox();
    });

    // 购物车存cookie处理
    function addShopCar(id, num) {
        // 获取cookie
        var shop = cookie.get('shop');
        // 根据传入参数创建商品JSON对象
        var product = {
            "id": id,
            "num": num
        };

        // 判断如果有cookie
        if (shop)
        {
            // 将push到数组内的字符串转成json对象
            shop = JSON.parse(shop);
            // 调用some函数判断是否点击商品已存过cookie
            if (shop.some(elm => elm.id == id))
            {
                shop.forEach(function(elm, i)
                {
                    // 如果匹配到，操作被匹配到的商品的数量，替换位最后一次点击的最新数值
                    elm.id == id ? elm.num = num : null;
                    cookie.set("carNum",(i+1),1)
                });
            }
            // 否则表示点击的商品未存过cookie
            else
            {
                // 存
                shop.push(product);
            }
            cookie.set('shop', JSON.stringify(shop), 1);
        }
        // 如果没cookie
        else
        {
            // 创建数组，用于push json对象
            shop = [];
            // push
            shop.push(product);
            // 设置当前商品的cookie
            cookie.set('shop', JSON.stringify(shop), 1);
        }
    }

    // 清理购物车被点击
    $(".removeAllItems").on("click",function()
    {
        if(confirm("确定清除购物车内所有物品吗？此操作不可逆！"))
        {
            cookie.remove("shop");
            cookie.remove("checkbox");
            cookie.remove("carNum");
            location.reload();
        }
    });

    // 商品右侧删除选项被点击
    $("body").on("click",".itmDel",function()
    {
        // 取cookie内商品信息
        let item=$.parseJSON(cookie.get("shop"));
        // 取点击的商品的id
        let delID=($(this).parents(".itmConBox").find(".itmImgBox").attr("href").split("=")[1]);
        // for循环比对cookie内的id是否与取到的id匹配，如果匹配，删除匹配项
        for(let i=0;i<item.length;i++)
        {
            if(item[i].id===delID)
            {
                item.splice(i,1);
            }
        }
        // 删除完毕继续将剩下的商品信息转成json字符串
        item=JSON.stringify(item);
        // 存入cookie内
        cookie.set("shop",item,1);
        // 修改商品数量cookie
        cookie.set("carNum",parseInt(cookie.get("carNum")-1));
        // 刷新页面
        location.reload();
    });

    // 删除选中商品被点击
    $(".delSelectItem").on("click",function()
    {
        // 取cookie内商品信息
        let item=$.parseJSON(cookie.get("shop"));
        // 创建ID数组
        let IDs=[];
        // 遍历商品checkbox，取选中状态的checkbox，将该商品的ID push进数组
        for(let i=0;i<$(".itmCheckbox").length;i++)
        {
            if($(".itmCheckbox")[i].checked)
            {
                IDs.push($($(".itmCheckbox")[i]).parents(".itmConBox").find(".itmImgBox").attr("href").split("=")[1]);
            }
        }
        // for+for遍历取出的cookie，如果匹配到存过的ID，则进行删除操作
        for(let j=0;j<IDs.length;j++)
        {
            for(let k=0;k<item.length;k++)
            {
                if(IDs[j]===item[k].id)
                {
                    item.splice(k,1);
                    k--;
                }
            }
        }
        // 删除完毕继续将剩下的商品信息转成json字符串
        item=JSON.stringify(item);
        // 存入cookie内
        cookie.set("shop",item,1);
        // 修改商品数量cookie
        cookie.set("carNum",parseInt(cookie.get("carNum")-IDs.length));
        // 刷新页面
        location.reload();
    });
});
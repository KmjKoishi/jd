$(function()
{
    // 渲染购物车数值
    cartNum();
    function cartNum()
    {
        if(cookie.get("carNum"))
        {
            $(".carNum").html(cookie.get("carNum"));
            $(".shopCarTwoMenu b").html("已选<span> "+cookie.get("carNum")+" </span>件商品，立即付款购买！");
        }
        else
        {
            $(".carNum").html(0);
            $(".shopCarTwoMenu b").html("购物车中还没有商品，赶紧选购吧！");
        }
    }
    
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
        }
        // 否则表示为游客模式
        else
        {
            $(".loginDel").css("display","block");
            $(".welLogin").css("display","block").removeClass("jdFont").html("您好,请登录");
            $(".quitLogin").css("display","block").addClass("jdFont").html("免费注册").attr("href","./register.html");
            $(".welLogin").attr("href","./login.html");
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

    // .cate二级导航渲染
    cateTwoMenuAppend();
    function cateTwoMenuAppend()
    {
        for(let j=0;j<$(".cateContent").length;j++)
        {
            let $cateTwoMenuChild=$("<div class=\"cateTwoMenu\">\n" +
                "                            <div class=\"cateChannel\">\n" +
                "                                <a href=\"javascript:;\" class=\"BtnA\">家电馆<b class=\"iconFont\"></b></a>\n" +
                "                                <a href=\"javascript:;\" class=\"BtnA\">乡镇专卖店<b class=\"iconFont\"></b></a>\n" +
                "                                <a href=\"javascript:;\" class=\"BtnA\">家电服务<b class=\"iconFont\"></b></a>\n" +
                "                                <a href=\"javascript:;\" class=\"BtnA\">企业采购<b class=\"iconFont\"></b></a>\n" +
                "                                <a href=\"javascript:;\" class=\"BtnA\">商用电器<b class=\"iconFont\"></b></a>\n" +
                "                            </div>\n" +
                "                            <div class=\"cateDetail\">\n" +
                "                                <ul class=\"clear\">\n" +
                "                                    <li class=\"firstTitle\"><a href=\"javascript:;\">电视<b class=\"iconFont\"></b></a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">超薄电视</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">全面屏电视</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">智能电视</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">OLED电视</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">曲面电视</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">4K超清电视</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">55英寸</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">65英寸</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电视配件</a></li>\n" +
                "                                </ul>\n" +
                "                                <ul class=\"clear\">\n" +
                "                                    <li class=\"firstTitle\"><a href=\"javascript:;\">空调<b class=\"iconFont\"></b></a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">空调挂机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">精选推荐</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">中央空调</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">省电空调</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">变频空调</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">以旧换新</a></li>\n" +
                "                                </ul>\n" +
                "                                <ul class=\"clear\">\n" +
                "                                    <li class=\"firstTitle\"><a href=\"javascript:;\">洗衣机<b class=\"iconFont\"></b></a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">滚筒洗衣机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">洗烘一体机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">波轮洗衣机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">迷你洗衣机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">烘干机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">洗衣机配件</a></li>\n" +
                "                                </ul>\n" +
                "                                <ul class=\"clear\">\n" +
                "                                    <li class=\"firstTitle\"><a href=\"javascript:;\">冰箱<b class=\"iconFont\"></b></a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">多门</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">对开门</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">三门</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">双门</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">冷柜/冰吧</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">酒柜</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">冰箱配件</a></li>\n" +
                "                                </ul>\n" +
                "                                <ul class=\"clear\">\n" +
                "                                    <li class=\"firstTitle\"><a href=\"javascript:;\">厨卫大电<b class=\"iconFont\"></b></a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">油烟机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">煤气灶</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">烟灶套装</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">集成灶</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">消毒柜</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">洗碗机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电热水器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">燃气热水器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">嵌入式厨电</a></li>\n" +
                "                                </ul>\n" +
                "                                <ul class=\"clear\">\n" +
                "                                    <li class=\"firstTitle\"><a href=\"javascript:;\">厨房小电<b class=\"iconFont\"></b></a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">破壁机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电烤箱</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电饭煲</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电压力锅</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电炖锅</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">豆浆机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">料理机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">咖啡机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电饼铛</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">榨汁机/原汁机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电水壶/热水器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">微波炉</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电火锅</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">养生壶</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电磁炉</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">面包机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">空气炸锅</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">面条机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电陶炉</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电烤烤炉</a></li>\n" +
                "                                </ul>\n" +
                "                                <ul class=\"clear\">\n" +
                "                                    <li class=\"firstTitle\"><a href=\"javascript:;\">厨房小电<b class=\"iconFont\"></b></a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">破壁机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电烤箱</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电饭煲</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电压力锅</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电炖锅</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">豆浆机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">料理机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">咖啡机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电饼铛</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">榨汁机/原汁机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电水壶/热水器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">微波炉</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电火锅</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">养生壶</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电磁炉</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">面包机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">空气炸锅</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">面条机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电陶炉</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电烤烤炉</a></li>\n" +
                "                                </ul>\n" +
                "                                <ul class=\"clear\">\n" +
                "                                    <li class=\"firstTitle\"><a href=\"javascript:;\">生活电器<b class=\"iconFont\"></b></a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电风扇</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">冷风扇</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">空气净化器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">吸尘器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">除螨仪</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">扫地机器人</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">除湿机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">干衣机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">加湿器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">蒸汽拖把/拖地机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">挂烫机/熨斗</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电话机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">饮水机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">净水器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">取暖电器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">毛球修剪器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">生活电器配件</a></li>\n" +
                "                                </ul>\n" +
                "                                <ul class=\"clear\">\n" +
                "                                    <li class=\"firstTitle\"><a href=\"javascript:;\">个护健康<b class=\"iconFont\"></b></a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">剃须刀</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电动牙刷</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">电吹风</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">美容器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">洁面仪</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">按摩器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">健康秤</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">卷/直发器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">剃/脱毛器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">理发器</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">足浴盆</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">足疗机</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">按摩椅</a></li>\n" +
                "                                </ul>\n" +
                "                                <ul class=\"clear\">\n" +
                "                                    <li class=\"firstTitle\"><a href=\"javascript:;\">食品影音<b class=\"iconFont\"></b></a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">家庭影院</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">KTV音响</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">迷你音响</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">DVD</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">功放</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">回音壁</a></li>\n" +
                "                                    <li class=\"otherTitle\"><a href=\"javascript:;\">麦克风</a></li>\n" +
                "                                </ul>\n" +
                "                            </div>\n" +
                "                            <div class=\"cateImg\">\n" +
                "                                <a href=\"javascript:;\">\n" +
                "                                    <img src=\"../images/cate-1.jpg\" alt=\"cate-1\">\n" +
                "                                </a>\n" +
                "                                <a href=\"javascript:;\">\n" +
                "                                    <img src=\"../images/cate-2.jpg\" alt=\"cate-2\">\n" +
                "                                </a>\n" +
                "                                <a href=\"javascript:;\">\n" +
                "                                    <img src=\"../images/cate-3.jpg\" alt=\"cate-3\">\n" +
                "                                </a>\n" +
                "                            </div>\n" +
                "                        </div>").css("top","-"+(j*26)+"px").appendTo($($(".cateContent")[j]));
        }
    }

    // 表单placeholder
    let fTopArr=[
        "雅马哈电钢琴",
        "移动硬盘500G",
        "古筝",
        "拉杆箱",
        "外置光驱",
        "美孚1号",
        "触摸屏笔记本",
        "花王拉拉裤",
        "网络机顶盒",
        "HTML权威宝典",
        "Steam正版代购",
        "洗衣液",
        "iPhone X",
        "DIY台式机",
        "酷睿I9",
        "超薄本",
        "阿迪达斯",
        "真皮沙发",
        "护发素",
        "Dior",
        "RTX2080",
        "家装墙纸",
    ];
    placTimer=function ()
    {
        let placRan=randNum(0,fTopArr.length-1);
        for(let f=0;f<$(".plac").length;f++)
        {
            $(".plac")[f].setAttribute("placeholder",fTopArr[placRan]);
        }
    };
    setInterval(placTimer,3500);

    // footer精灵图定位
    footerSet();
    function footerSet()
    {
        for(let s=0;s<$(".ftIcoFont").length;s++)
        {
            $($(".ftIcoFont")[s]).css("background","url(../images/sprite.footer.png) -"+(41*s)+"px -192px");
        }
    }
});
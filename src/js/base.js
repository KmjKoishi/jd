$(function ()
{
    // 渲染购物车数值
    cartNum();
    function cartNum()
    {
        if(cookie.get("carNum"))
        {
            $(".carNum").html(cookie.get("carNum"));
        }
        else
        {
            $(".carNum").html(0);
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
    $(".midQuitLogin").on("click",function()
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

    // 中部大轮播
    let timer1Set=1;
    let timer1=function ()
    {
        $(".bannerBox>a>img").stop().animate(
            {
                "opacity":0,
                "zIndex":0,
                "position": "relative",
            },100,function ()
            {
                $(".bannerBox>a>img")[0].setAttribute("src","../images/lb"+timer1Set+".jpg");
                $(".bannerBox>a>img")[0].setAttribute("alt","lb"+timer1Set);
                for(let k=0;k<$(".sliderBox>ul>li").length;k++)
                {
                    if(k===timer1Set)
                    {
                        $($(".sliderBox>ul>li")[k]).addClass("isSelectParent");
                        $($(".sliderBox>ul>li>b")[k]).addClass("isSelectChild");
                    }
                    else
                    {
                        $($(".sliderBox>ul>li")[k]).removeClass("isSelectParent");
                        $($(".sliderBox>ul>li>b")[k]).removeClass("isSelectChild");
                    }
                }
                $(".bannerBox>a>img").stop().animate(
                    {
                        "opacity":1,
                        "zIndex":0,
                        "position": "relative",
                    },100,function ()
                    {
                        timer1Set++;
                        if(timer1Set===8)
                        {
                            timer1Set=0;
                        }
                    });
            });
    };
    setInterval(timer1,2000);

    // 秒杀倒计时
    let RanTimerH=randNum(0,1);
    let RanTimerM=randNum(0,59);
    let RanTimerS=randNum(0,59);
    let day,hour,minute,second;
    let intDiff = (RanTimerH*60*60)+(RanTimerM*60)+RanTimerS;
    skInnHTML();
    function skInnHTML()
    {
        if(RanTimerH.toString().length===1)
        {
            RanTimerH="0"+RanTimerH;
        }
        if(RanTimerM.toString().length===1)
        {
            RanTimerM="0"+RanTimerM
        }
        if(RanTimerS.toString().length===1)
        {
            RanTimerS="0"+RanTimerS;
        }
        $(".timeH>b").html(RanTimerH);
        $(".timeM>b").html(RanTimerM);
        $(".timeS>b").html(RanTimerS);
    }
    let tSkMsgTimer=function()
    {
        if (intDiff >= 0)
        {
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(hour.toString().length===1)
        {
            hour="0"+hour;
        }
        if(minute.toString().length===1)
        {
            minute="0"+minute
        }
        if(second.toString().length===1)
        {
            second="0"+second;
        }
        $(".timeH>b").html(hour);
        $(".timeM>b").html(minute);
        $(".timeS>b").html(second);
        intDiff--;
    };
    setInterval(tSkMsgTimer,1000);

    // 秒杀list关键词数组
    // let skItmTitleArr=["【情侣款】法国公鸡（paril  rooster）潮流时尚舒适百搭情侣休闲鞋 米色-男款 41",
    //         "扬子 1.5匹 一级能效 变频冷暖 舒适节能 静音智能壁挂式空调挂机 KFRd-35GW/(35V3912)aBp2-A1",
    //         "惠普（HP）战66 13.3英寸轻薄笔记本电脑（i5-8265U 8G 256G PCIe SSD Win10 一年上门）银色",
    //         "AHC  B5玻尿酸臻致柔肤水 韩国原装进口  120ml （ 补水保湿 滋润爽肤  细滑嫩弹 化妆水）",
    //         "四书五经全译全套正版 全6册 大学中庸论语孟子诗经尚书礼记易经春秋 随机赠送 国学精粹系列一本",
    //         "联想(Lenovo)小新14英寸 英特尔酷睿I5 轻薄笔记本电脑(I5-8265U 8G 1T+256G PCIE MX230独显 IPS)渣渣灰",
    //         "联想Z5 6GB+64GB 极光色 6.2英寸全面屏双摄 全网通4G手机 双卡双待",
    //         "Apple Watch Series 4智能手表（GPS款 44毫米深空灰色铝金属表壳 黑色回环式运动表带 MU6E2CH/A)"];

    // 原价
    // let skBeforeArr=[
    //     "599.00","3099.00","5399.00","185.00","99.00","5499.00","1398.00","3499.00"];

    // 秒杀价
    // let skPriceArr=[
    //     "189.00","2299.00","4499.00","125.00","59.00","5099.00","987.00","3288.00"];

    // 渲染秒杀list,以备轮播
    skItmAppend();
    function skItmAppend()
    {
        $.ajax(
            {
                type:"POST",
                url:"../lib/getProduct.php",
                dataType:"json",
                success:function(data)
                {
                    for(let l=0;l<12;l++)
                    {
                        let skItmChild=$("<li>\n" +
                            "                            <a href=\"./product.html?id="+data[l].id+"\">\n" +
                            "                                <img src=\""+$.parseJSON(data[l].pic)[0].src+"\" alt=\"sk-"+JSON.parse(data[l].pic)[0].title+"\" width=\"140\" height=\"140\">\n" +
                            "                                <p class=\"skItmTitle\">"+data[l].title+"</p>\n" +
                            "                                <div class=\"priceBox\">\n" +
                            "                                    <span class=\"skPrice jdBgc\"><b>¥</b>"+parseFloat(data[l].nowPrice).toFixed(2)+"</span>\n" +
                            "                                    <span class=\"skBefore\"><b>¥</b>"+parseFloat(data[l].oldPrice).toFixed(2)+"</span>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"itemMask\"></div>\n" +
                            "                            </a>\n" +
                            "                        </li>").appendTo($(".itemBox>.clear"));
                    }
                    for(let n=0;n<4;n++)
                    {
                        let skItmChild=$("<li>\n" +
                            "                            <a href=\"./product.html?id="+data[n].id+"\">\n" +
                            "                                <img src=\""+JSON.parse(data[n].pic)[0].src+"\" alt=\"sk-"+JSON.parse(data[n].pic)[0].title+"\" width=\"140\" height=\"140\">\n" +
                            "                                <p class=\"skItmTitle\">"+data[n].title+"</p>\n" +
                            "                                <div class=\"priceBox\">\n" +
                            "                                    <span class=\"skPrice jdBgc\"><b>¥</b>"+parseFloat(data[n].nowPrice).toFixed(2)+"</span>\n" +
                            "                                    <span class=\"skBefore\"><b>¥</b>"+parseFloat(data[n].oldPrice).toFixed(2)+"</span>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"itemMask\"></div>\n" +
                            "                            </a>\n" +
                            "                        </li>").appendTo($(".itemBox>.clear"));
                    }
                },
                err:function(xhr)
                {
                    console.log(xhr.status);
                }
            });
        // for(let l=0;l<8;l++)
        // {
        //     let skItmChild=$("<li>\n" +
        //         "                            <a href=\"javascript:;\">\n" +
        //         "                                <img src=\"../images/sk"+l+".jpg\" alt=\"sk"+(l+1)+"\" width=\"140\" height=\"140\">\n" +
        //         "                                <p class=\"skItmTitle\">"+skItmTitleArr[l]+"</p>\n" +
        //         "                                <div class=\"priceBox\">\n" +
        //         "                                    <span class=\"skPrice jdBgc\"><b>¥</b>"+skPriceArr[l]+"</span>\n" +
        //         "                                    <span class=\"skBefore\"><b>¥</b>"+skBeforeArr[l]+"</span>\n" +
        //         "                                </div>\n" +
        //         "                                <div class=\"itemMask\"></div>\n" +
        //         "                            </a>\n" +
        //         "                        </li>").appendTo($(".itemBox>.clear"));
        // }
        // for(let n=0;n<4;n++)
        // {
        //     let skItmLastChild=$("<li>\n" +
        //         "                            <a href=\"javascript:;\">\n" +
        //         "                                <img src=\"../images/sk"+n+".jpg\" alt=\"sk"+(n+1)+"\" width=\"140\" height=\"140\">\n" +
        //         "                                <p class=\"skItmTitle\">"+skItmTitleArr[n]+"</p>\n" +
        //         "                                <div class=\"priceBox\">\n" +
        //         "                                    <span class=\"skPrice jdBgc\"><b>¥</b>"+skPriceArr[n]+"</span>\n" +
        //         "                                    <span class=\"skBefore\"><b>¥</b>"+skBeforeArr[n]+"</span>\n" +
        //         "                                </div>\n" +
        //         "                                <div class=\"itemMask\"></div>\n" +
        //         "                            </a>\n" +
        //         "                        </li>").appendTo($(".itemBox>.clear"));
        // }
    }

    // 秒杀轮播计时器
    let tMoveLeft=792;
    let skBannerTimer=function ()
    {
        $(".itemBox").stop().animate(
            {
                "left":"-"+tMoveLeft+"px",
            },700,function ()
            {
                tMoveLeft+=792;
                if(tMoveLeft===3168)
                {
                    $(".itemBox").css("left",0);
                    tMoveLeft=792;
                }
            });
    };
    setInterval(skBannerTimer,4000);

    // 秒杀右部轮播计时器
    let tChnMoveLeft= 188;
    let skChnBanner=function ()
    {
        $(".chnBox>.clear").stop().animate(
            {
                left:"-"+tChnMoveLeft+"px",
            },500,function ()
            {
                tChnMoveLeft+=188;
                if(tChnMoveLeft===564)
                {
                    tChnMoveLeft=188;
                    $(".chnBox>.clear").css("left",0);
                }
            });
        for(let m=0;m<$(".slider>b").length;m++)
        {
            if($($(".slider>b")[m]).is(".jdBgc"))
            {
                $($(".slider>b")[m]).removeClass("jdBgc");
            }
            else
            {
                $($(".slider>b")[m]).addClass("jdBgc");
            }
        }
    };
    setInterval(skChnBanner,2000);

    // 排行榜轮播
    let tRankMoveLeft=370;
    let tRankTimer=function ()
    {
        $(".bannerLBannerBox").stop().animate(
            {
                "left":"-"+tRankMoveLeft+"px",
            },500,function ()
            {
                tRankMoveLeft+=370;
                if(tRankMoveLeft === 1110)
                {
                    $(".bannerLBannerBox").css("left",0);
                    tRankMoveLeft=370;
                }
            });
        for(let o=0;o<$(".BannerLSlider>span").length;o++)
        {
            if($($(".BannerLSlider>span")[o]).is(".__isSelect1"))
            {
                $($(".BannerLSlider>span")[o]).removeClass("__isSelect1");
            }
            else
            {
                $($(".BannerLSlider>span")[o]).addClass("__isSelect1");
            }
            if($($(".BannerLSlider>span")[o]).find("i").is(".__isSelect2"))
            {
                $($(".BannerLSlider>span")[o]).find("i").removeClass("__isSelect2");
            }
            else
            {
                $($(".BannerLSlider>span")[o]).find("i").addClass("__isSelect2");
            }
        }
    };
    setInterval(tRankTimer,3000);
    // 排行榜title鼠标移入color改变
    $(".gridInnerBannerLBox>ul>li").mouseover(function ()
    {
        for(let p=0;p<$(".gridInnerBannerLBox>ul>li").length;p++)
        {
            if($(this)[0] === $(".gridInnerBannerLBox>ul>li")[p])
            {
                $(this).find("a").css("color","#f10215");
            }
            else
            {
                $($(".gridInnerBannerLBox>ul>li")[p]).find("a").css("color","rgb(102,102,102)");
            }
        }
    });

    // 会买专辑轮播
    let tRichMoveMiddle=350;
    let tRichIndex=1;
    let tRichTimer=function ()
    {
        $(".bannerMMoveBox").stop().animate(
            {
                "left":"-"+tRichMoveMiddle+"px",
            },650,function ()
            {
                tRichMoveMiddle+=350;
                if(tRichMoveMiddle===1400)
                {
                    $(".bannerMMoveBox").css("left",0);
                    tRichMoveMiddle=350;
                }
            });
        for(let q=0;q<$(".BannerMSlider>span").length;q++)
        {
            if(q===tRichIndex)
            {
                $($(".BannerMSlider>span")[q]).addClass("__isSelect1");
                $($(".BannerMSlider>span")[q]).find("i").addClass("__isSelect2");
                setTimeout(function ()
                {
                    $($(".BanBigDle")[q]).stop().animate(
                        {
                            "height":"20px",
                            "width":"20px",
                            "bottom": "10px",
                            "margin-left":"-10px",
                        },250,function ()
                        {
                            $($(".BanBigDle")[q]).stop().animate(
                                {
                                    "height":"16px",
                                    "width":"16px",
                                    "bottom": "12px",
                                    "margin-left":"-8px",
                                },150);
                        });
                },600);
            }
            else
            {
                $($(".BannerMSlider>span")[q]).removeClass("__isSelect1");
                $($(".BannerMSlider>span")[q]).find("i").removeClass("__isSelect2");
                setTimeout(function ()
                {
                    $($(".BanBigDle")[q]).stop().animate(
                        {
                            "height":"0",
                            "width":"0px",
                            "bottom":"12px",
                            "margin-left":"-8px",
                        },250);
                },600);
            }
        }
        tRichIndex++;
        if(tRichIndex===3)
        {
            tRichIndex=0
        }
    };
    setInterval(tRichTimer,4650);
    // 会买专辑first以及伦博内图片title渲染
    setAnmt();
    function setAnmt()
    {
        $($(".BanBigDle")[0]).css(
            {
                "height":"16px",
                "width":"16px",
                "bottom":"12px",
                "margin-left":"-8px",
            });
        for(let w=0;w<$(".bannerMTitle").length;w++)
        {
            $(".bannerMTitle")[w].setAttribute("title",$($(".bannerMTitle")[w]).html());
        }
        for(let e=0;e<$(".bannerMTitle").length;e++)
        {
            $(".bannerMContent")[e].setAttribute("title",$($(".bannerMContent")[e]).html());
        }
    }

    // 领券中心计时器
    let tCouponRight=350;
    let tCouponTimer=function ()
    {
        $(".bannerRMoveBox").stop().animate(
            {
                "left":"-"+tCouponRight+"px",
            },500,function ()
            {
                tCouponRight+=350;
                if(tCouponRight === 1050)
                {
                    $(".bannerRMoveBox").css("left",0);
                    tCouponRight=350;
                }
            });
    };
    setInterval(tCouponTimer,3000);
    // 领券中心title渲染
    for(let a=0;a<$(".couponLimit").length;a++)
    {
        $(".couponLimit")[a].setAttribute("title",$($(".couponLimit")[a]).html());
        $(".couponDesc")[a].setAttribute("title",$($(".couponDesc")[a]).html());
    }

    // 觅me轮播
    let tMime=350;
    let tMimeIndex=1;
    let tMimeTimer=function ()
    {
        $(".mimeMoveBox").stop().animate(
            {
                "left":"-"+tMime+"px",
            },650,function ()
            {
                tMime+=350;
                if(tMime===1400)
                {
                    $(".mimeMoveBox").css("left",0);
                    tMime=350;
                }
            });
        for(let z=0;z<$(".miSlider>span").length;z++)
        {
            if(z===tMimeIndex)
            {
                $($(".miSlider>span")[z]).addClass("__isSelect1");
                $($(".miSlider>span")[z]).find("i").addClass("__isSelect2");
            }
            else
            {
                $($(".miSlider>span")[z]).removeClass("__isSelect1");
                $($(".miSlider>span")[z]).find("i").removeClass("__isSelect2");
            }
        }
        tMimeIndex++;
        if(tMimeIndex===3)
        {
            tMimeIndex=0
        }
    };
    setInterval(tMimeTimer,5000);

    // 包治百病随机数
    bbSet();
    function bbSet()
    {
        $(".ranNum1").html(randNum(999,9999)+" 人关注");
        $(".ranNum2").html(randNum(999,9999)+" 人关注");
    }

    // 还没逛够title数组
    let soRichTitArr=[
        "原森太 进口乌檀木实木菜板 粘板砧板 整木切菜板 厨房擀面板 加厚案板 整木小号款36×25×2.5CM",
        "荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机 双卡双待",
        "TEEK短袖T恤男 2019新品半袖体恤夏季上衣 韩版男装衣服小衫 D766-白色 175/96(L码)",
        "三只松鼠营养早餐口袋面包网红零食乳酸菌小伴侣面包520g整箱装",
        "【8件装】新款短袖T恤男士夏季衣服圆领印花棉体恤男装休闲时尚潮流半袖衫 随机发8件 M",
        "亿色(ESR)iphone xr钢化膜 苹果xr钢化膜【全屏不碎边】高清6.1英寸iPhone全覆盖防爆玻璃手机前贴膜(含神器)",
        "必品阁（bibigo） 鲜菜猪肉水饺 250g （27只 迷你饺子 儿童早餐 老人易消化）",
        "满199减120三只松鼠 碧根果120g坚果炒货每日坚果 1袋装",
        "【免配送费，赠运费险】POLO 男士钱包短款皮夹男款真皮包包 竖款黑色",
        "迈跃（MAIYUE） 小米vivo耳机入耳式 运动耳机金属重低音带麦线控 手机游戏电脑音乐耳机通用》 枪灰色",
        "帕宾pabin真皮驾驶证钱包男竖款植糅头层牛皮男士钱夹休闲欧美风票夹多功能卡包PB521黑色",
        "亿色（ESR）华为p30pro手机壳p30保护套超薄透明硅胶防摔全包包边软壳男女por 华为P30Pro【纯透明】通透不发黄",
        "湾仔码头 速冻水饺 玉米蔬菜猪肉口味 720g （36只 早餐 火锅食材 烧烤 饺子）",
        "慕尼缔手表男学生运动电子表时尚腕表韩版潮流薄皮带运动非智能机械表款钟表石英表男士手表男表 玫瑰金白色面1026（新人专享，颜色随机）",
        "仙笛 V8声卡套装手机直播设备全套快手全民K歌神器喊麦唱歌通用苹果安卓主播麦克风电脑录音话筒 声卡+话筒+耳机+支架",
        "三只松鼠肉干肉脯休闲零食特产小吃靖江风味猪肉脯自然片150g/袋",
        "英国TOWER厨具 家用切菜板防霉砧板实木加厚粘板进口相思木厨房刀板案板擀面板菜板切水果菜板 长方形菜板",
        "三只松鼠休闲零食肉脯牛肉干手撕牛肉麻辣味蜀香牛肉100g",
        "小白鞋女2019春季新款百搭韩版基础休闲学生板鞋网红 颜色和码请自已备注 或联系客户各备注",
        "三只松鼠坚果炒货零食每日坚果手剥东北开口松子100g/袋",
        "小熊（Bear） 电烤箱 多功能家用迷你小型入门级烘焙烤箱10升做蛋糕机器 DKX-A09A1 10升",
        "蒙牛 真果粒牛奶饮品（四种口味）250g*24 缤纷礼盒装  青春有你训练生助力版",
        "乔丹运动鞋男2019春夏季新品网面透气跑步鞋时尚潮流鞋子 黑色 40",
        "旅行家用便捷携带电动牙刷声波按摩可换头 软毛中毛三个头护齿 三头可换",
        "美罗邦  短袖T恤男2019夏季新品时尚韩版休闲修身体恤青年潮流打底POLO衫学生个性男装上衣 白色 XL",
        "蒙牛 纯甄 常温酸牛奶 200g*24 礼盒装",
        "TEEK短袖T恤男士 2019春夏季新品上衣体恤打底衫 半袖衣服小衫 D377杏色 175/96(L码)",
        "Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机",
        "必品阁（bibigo）韩式烤肉煎饺 640g（25只装 饺子 锅贴 儿童早餐）",
        "亿色(ESR)华为mate20pro钢化膜 mate20pro手机膜全屏覆盖 曲面无白边防摔防指纹贴膜 非水凝玻璃膜(UD)高清款",
        "牛船长皮具（BULLCAPTAIN）横款头层牛皮多功能多卡位三折短款钱夹 真皮拉链钱包竖款 褐色",
        "探路蜂led手电筒强光远射超亮可变焦防身户外多功能骑行家用小型 XPE版 干电池套餐",
        "帕宾pabin男士钱包短款植糅头层牛皮钥匙包商务休闲真皮零钱包男女通用潮流小卡包PB516黑色",
        "南极人10双袜子男士袜子运动舒适透气休闲商务男袜男士棉袜中筒袜 净色款",
        "千年恋木乌檀木砧板整木防霉抗菌厨房家用菜板实木切菜刀板占案板 整木乌檀36*24cm，适合2-4人",
        "海天 生抽酱油 1.9L",
        "安踏男鞋运动鞋男2019夏季新品网面青年小白鞋缓震厚底休闲鞋黑色圆头跑步鞋男耐磨慢跑鞋子 纯黑 42",
        "桌面小垃圾桶办公家用床头垃圾筒塑料带盖客厅卧室迷你创意篓 米白",
        "TEEK加绒迷彩卫衣男 新品圆领上衣服男装 2019春季韩版男士长袖t恤 【加绒保暖】HW699迷彩 175/96(L码)",
        "OPPO K1  光感屏幕指纹 水滴屏拍照手机  6G+64G 梵星蓝 全网通 移动联通电信4G 双卡双待手机",
        "雨伞男女全自动开收大号双人三折折叠加固晴雨两用伞遮阳太阳伞 加大10骨黑色",
        "【超值爆款】【疯狂抢购】时尚潮流经典简约黑色百搭双肩包 逛街旅行户外小双肩背包女包 18800",
        "南极人 男士内裤男平角裤95%精梳纯棉中腰男式四角内裤u凸短裤头4条礼盒装NHT9999 混色4条XL",
        "蒙牛 纯牛奶 PURE MILK 250ml*16 礼盒装",
        "【199减120】良品铺子猪肉脯100gx1 肉干肉脯休闲零食小吃  肉脯零食 100g 原味",
        "必品阁（bibigo） 传统煎饺 250g（10只装 饺子 锅贴 早餐食材）",
        "绿联（UGREEN）六类CAT6类网线 千兆网络连接线 工程家用电脑宽带监控非屏蔽8芯双绞成品跳线 2米 黑 20160",
        "【XGANG】grnx 2019新款潮流男帅气圆领T恤春夏男士短袖图案T恤 灰色 M",
        "满199减120三只松鼠 蜀香牛肉100g 休闲零食肉脯手撕牛肉麻辣味 牛肉粒牛肉片 麻辣味",
        "【99元4件】步之霸短袖T恤男2019打底衫棉质圆领字母印花衣服男宽松 套餐九:短斜字母黑+鹿头黑+一枝花黑+大Z黑 XL (135-150斤)",
    ];
    // 还没逛够价格数组
    let soRichPriceArr=[
        139,1299,98,48.6,99,35.9,15.8,26.9,99,55,
        99,38,33.9,39,138,29.9,499,25.9,39.9,39.9,
        129,62.9,159,10,79,92.9,59.9,6349,22.8,39.9,
        110,49.9,88,29.9,69,13.9,179.9,16,148,1599,
        29.9,49,49,42.9,22.9,12.8,12,99,25.9,99,
    ];
    // append还没逛够商品列表
    soRichAppend();
    function soRichAppend()
    {
        for(let x=0;x<50;x++)
        {
            let elSet,elSet2,outPrice;
            let r=randNum(1,10);
            let r2=randNum(1,10);
            if(r>=9)
            {
                elSet="jx";
            }
            else if(r>=5)
            {
                elSet="zy";
            }
            else
            {
                elSet="";
            }
            if(r2>=9)
            {
                elSet2="券";
            }
            else if(r2>=5)
            {
                elSet2="满减";
            }
            else
            {
                elSet2="";
            }
            if(soRichPriceArr[x].toString().split(".").length>1)
            {
                outPrice=soRichPriceArr[x].toString()+"0";
            }
            else
            {
                outPrice=soRichPriceArr[x].toString()+".00";
            }
            let $soRichChild=$("<li>\n" +
                "                    <a href=\"javascript:;\">\n" +
                "                        <img src=\"../images/br"+x+".webp\" alt=\"br"+(x+1)+"\">\n" +
                "                        <p class=\"rTit\"><i class=\""+elSet+"\"></i>"+soRichTitArr[x]+"</p>\n" +
                "                        <div class=\"brPrice\">\n" +
                "                            <i>¥</i>\n" +
                "                            <span>"+outPrice+"</span>\n" +
                "                            <b class=\"yhq\">"+elSet2+"</b>\n" +
                "                        </div>\n" +
                "                        <div class=\"brMask\"></div>\n" +
                "                    </a>\n" +
                "                    <div class=\"moreItm\">\n" +
                "                        <a href=\"javascript:;\" class=\"like\"><b></b>找相似</a>\n" +
                "                        <a href=\"javascript:;\" class=\"dtlike\"><b></b>不喜欢</a>\n" +
                "                    </div>\n" +
                "                </li>");
            if(elSet === "zy")
            {
                $soRichChild.find(".rTit").find("i").html("自营");
            }
            if(elSet2 === "")
            {
                $soRichChild.find(".brPrice").find("b").removeClass("yhq");
            }
            $soRichChild.appendTo(".soRich>.h>ul");
        }
        for(let d=0;d<50;d++)
        {
            let elSet,elSet2,outPrice;
            let r=randNum(1,10);
            if(r>=9)
            {
                elSet="jx";
                elSet2="券";
            }
            else if(r>=5)
            {
                elSet="zy";
                elSet2="满减";
            }
            else
            {
                elSet="";
                elSet2="";
            }

            if(soRichPriceArr[d].toString().split(".").length>1)
            {
                outPrice=soRichPriceArr[d].toString()+"0";
            }
            else
            {
                outPrice=soRichPriceArr[d].toString()+".00";
            }
            let $soRichChild=$("<li>\n" +
                "                    <a href=\"javascript:;\">\n" +
                "                        <img src=\"../images/br"+d+".webp\" alt=\"br"+(d+1)+"\">\n" +
                "                        <p class=\"rTit\"><i class=\""+elSet+"\"></i>"+soRichTitArr[d]+"</p>\n" +
                "                        <div class=\"brPrice\">\n" +
                "                            <i>¥</i>\n" +
                "                            <span>"+outPrice+"</span>\n" +
                "                            <b class=\"yhq\">"+elSet2+"</b>\n" +
                "                        </div>\n" +
                "                        <div class=\"brMask\"></div>\n" +
                "                    </a>\n" +
                "                    <div class=\"moreItm\">\n" +
                "                        <a href=\"javascript:;\" class=\"like\"><b></b>找相似</a>\n" +
                "                        <a href=\"javascript:;\" class=\"dtlike\"><b></b>不喜欢</a>\n" +
                "                    </div>\n" +
                "                </li>");
            if(elSet === "zy")
            {
                $soRichChild.find(".rTit").find("i").html("自营");
            }
            if(elSet2 === "")
            {
                $soRichChild.find(".brPrice").find("b").removeClass("yhq");
            }
            $soRichChild.appendTo(".soRich>.h>ul");
        }
        for(let c=0;c<50;c++)
        {
            let elSet,elSet2,outPrice;
            let r=randNum(1,10);
            if(r>=9)
            {
                elSet="jx";
                elSet2="券";
            }
            else if(r>=5)
            {
                elSet="zy";
                elSet2="满减";
            }
            else
            {
                elSet="";
                elSet2="";
            }

            if(soRichPriceArr[c].toString().split(".").length>1)
            {
                outPrice=soRichPriceArr[c].toString()+"0";
            }
            else
            {
                outPrice=soRichPriceArr[c].toString()+".00";
            }
            let $soRichChild=$("<li>\n" +
                "                    <a href=\"javascript:;\">\n" +
                "                        <img src=\"../images/br"+c+".webp\" alt=\"br"+(c+1)+"\">\n" +
                "                        <p class=\"rTit\"><i class=\""+elSet+"\"></i>"+soRichTitArr[c]+"</p>\n" +
                "                        <div class=\"brPrice\">\n" +
                "                            <i>¥</i>\n" +
                "                            <span>"+outPrice+"</span>\n" +
                "                            <b class=\"yhq\">"+elSet2+"</b>\n" +
                "                        </div>\n" +
                "                        <div class=\"brMask\"></div>\n" +
                "                    </a>\n" +
                "                    <div class=\"moreItm\">\n" +
                "                        <a href=\"javascript:;\" class=\"like\"><b></b>找相似</a>\n" +
                "                        <a href=\"javascript:;\" class=\"dtlike\"><b></b>不喜欢</a>\n" +
                "                    </div>\n" +
                "                </li>");
            if(elSet === "zy")
            {
                $soRichChild.find(".rTit").find("i").html("自营");
            }
            if(elSet2 === "")
            {
                $soRichChild.find(".brPrice").find("b").removeClass("yhq");
            }
            $soRichChild.appendTo(".soRich>.h>ul");
        }
    }

    // footer精灵图定位
    footerSet();
    function footerSet()
    {
        for(let s=0;s<$(".ftIcoFont").length;s++)
        {
            $($(".ftIcoFont")[s]).css("background","url(../images/sprite.footer.png) -"+(41*s)+"px -192px");
        }
    }

    // 顶部固定导航检测
    let TopTimer=function jdTopJude()
    {
        let maxHeight=parseInt($("body").css("height"));
        if($(window).scrollTop()>=maxHeight/20)
        {
            $(".fixTop").stop().animate(
                {
                    "top":"0",
                    "zIndex":5,
                },100);
        }
        else
        {
            $(".fixTop").stop().animate(
                {
                    "top":"-50px",
                },100,function ()
                {
                    $(".fixTop").css("zIndex",1);
                });
        }
    };
    setInterval(TopTimer,500);

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
});
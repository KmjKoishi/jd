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
        $(".timeH").html(RanTimerH);
        $(".timeM").html(RanTimerM);
        $(".timeS").html(RanTimerS);
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
        $(".timeH").html(hour);
        $(".timeM").html(minute);
        $(".timeS").html(second);
        intDiff--;
    };

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

    // 赠品数组
    let giftArr=[
        "低占地高功率小风扇",
        "无纺布袋、布包随机发放",
        "指甲剪套装",
        "钛合金钥匙扣/钥匙包",
        "有氧运动型随手杯",
        "塑钢材质手机支架",
        "铝合金脸盆",
        "铝合金水桶",
        "铝合金筷子",
        "铝合金油壶",
        "铝合金杯子",
        "5元话费充值卡(移动联通电信通用)",
        "雷军笑容同款''ARE YOU OK?'毛绒玩具",
        "小黄人钥匙扣",
        "京东通用满1000减0.5优惠券",
        "天猫3元购物卡",
        "店家心意小礼包",
        "马爸爸笑容同款床上五件套",
        "蓝月亮洗衣液100g装",
        "雕牌新升级透明皂",
        "维达抽纸",
        "小行星小夜灯(低功耗高亮度)",
        "印有店家logo的小型保温杯",
        "印有店家logo的折叠太阳伞",
        "Remax/睿量 RE-805喵星人萌宠优盘(16GB)",
        "床头小台灯",
        "高仿HIFI魔音蓝牙小音箱"
    ];
    // 取连接中的id并发送ajax
    const ID=location.search.split('=')[1];
    $.ajax(
        {
            type:"POST",
            url:"../lib/getItem.php",
            data:
            {
                id:ID
            },
            success:function(data)
            {
                data=$.parseJSON(data);
                $(".itmTit").html(data.title);
                $(".small-box>img").attr("src",$.parseJSON(data.pic)[0].src).attr("alt",$.parseJSON(data.pic)[0].title);
                $(".item-cur").attr("data-src",$.parseJSON(data.pic)[0].src);
                $(".item-cur>img").attr("src",$.parseJSON(data.pic)[0].src);
                window.bigSrc=$.parseJSON(data.pic)[1].src;
                window.itemMax=data.num
                $(".big-box>img").attr("src",window.bigSrc).attr("alt",$.parseJSON(data.pic)[1].title)
                $(".itemName").html(data.title);
                $(".itemDetails").html(data.details);
                $(".nowP>strong").html(parseFloat(data.nowPrice).toFixed(2));
                $(".befP>i").html(parseFloat(data.oldPrice).toFixed(2));
                $(".commCon>a").html(parseFloat(randNum(1,100)/10).toFixed(1)+"万+");
                $(".GiftName").html(giftArr[randNum(0,giftArr.length-1)]+" × 1");
                let day=new Date();
                day=day.setDate(day.getDate()+2);
                $(".gotoTime").html("("+(new Date(day).getMonth()+1)+"月"+new Date(day).getDate()+"日)");
                setInterval(tSkMsgTimer,1000);
            },
            err:function(xhr)
            {
                console.log(xhr.status);
            }
        });

        // 数量增加被点击
        let numInp=$(".numInp")
        $(".add").on("click",function()
        {
            if(parseInt(numInp.val())+1>window.itemMax)
            {
                numInp.val(window.itemMax);
                alert("所选数量超过了库存数量，请重新输入");
            }
            else
            {
                numInp.val(parseInt(numInp.val())+1);
            }
        });
        // 数量减少被点击
        $(".sub").on("click",function()
        {
            if(parseInt(numInp.val())-1<1)
            {
                alert("数值输入错误，不能小于1");
                numInp.val(1);
            }
            else
            {
                numInp.val(parseInt(numInp.val())-1);
            }
        });
        // 数量input失去焦点检测
        $(".numInp").on("blur",function()
        {
            if(this.value<0)
            {
                this.value=1;
            }
            if(this.value>window.itemMax)
            {
                this.value=window.itemMax;
            }
            if(this.value==="")
            {
                this.value=1;
            }
        });

        // 加入购物车被点击
        $(".addCart").on("click",function()
        {
            addShopCar(ID,numInp.val());
            cartNum();
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
});
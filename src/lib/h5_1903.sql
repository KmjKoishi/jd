-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-05-31 03:24:59
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `h5_1903`
--

-- --------------------------------------------------------

--
-- 表的结构 `jd_users`
--

CREATE TABLE `jd_users` (
  `userID` int(10) NOT NULL COMMENT '用户ID',
  `userName` varchar(20) NOT NULL COMMENT '用户姓名',
  `userPWD` varchar(30) NOT NULL COMMENT '用户密码',
  `userEml` varchar(40) NOT NULL COMMENT '用户邮箱',
  `userSex` tinyint(2) NOT NULL COMMENT '用户性别',
  `userPhone` varchar(11) NOT NULL COMMENT '用户手机号'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `jd_users`
--

INSERT INTO `jd_users` (`userID`, `userName`, `userPWD`, `userEml`, `userSex`, `userPhone`) VALUES
(100000001, 'Koishi', '5622', '985778113@qq.com', 1, '13012345678'),
(100000002, 'zhangsan', '123123', 'zhangsan@163.com', 0, '13014725836'),
(100000003, 'lisi', '123123', 'lisi@qq.com', 1, '13598765432'),
(100000004, 'wangwu', '123123', 'wangwu@163.com', 0, '13555555555');

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `id` int(10) NOT NULL COMMENT '商品ID',
  `title` varchar(255) NOT NULL COMMENT '商品标题',
  `nowPrice` float NOT NULL COMMENT '优惠价',
  `oldPrice` float NOT NULL COMMENT '原价',
  `num` int(10) NOT NULL COMMENT '商品库存',
  `pic` varchar(255) NOT NULL COMMENT '商品图片',
  `details` varchar(255) NOT NULL COMMENT '商品详情'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `title`, `nowPrice`, `oldPrice`, `num`, `pic`, `details`) VALUES
(1, 'VAIO S11 11.6英寸 845克 轻薄商务笔记本电脑 (i5-8250U 8G 256G SSD FHD Win10 指纹识别 背光/静音键盘)金榈棕', 7658, 9998, 5289, '[{"title":"small","src":"../images/sk1-1.jpg"},{"title":"big","src":"../images/sk1-2.jpg"}]', '日本原装，防溅水键盘，仅重845g，VGA等超全接口，轻薄不卡顿。'),
(2, '优漫佳 儿童床上下床双层床高低床实木床安全弧白蜡木子母床儿童家具北欧 仅高低床 现货 下铺1.35*1.9米', 4599, 6828, 2257, '[{"title":"small","src":"../images/sk2-1.jpg"},{"title":"big","src":"../images/sk2-2.jpg"}]', '【618提前购，买贵返差价】【CQC环保认证】【京东秒杀】5月27日20点开始，24小时直降低价！白条3期免息。高低床配套床垫买1送1！'),
(3, '蒙牛 早餐奶 麦香味牛奶 250ml*16 礼盒装', 32.5, 44.8, 4923, '[{"title":"small","src":"../images/sk3-1.jpg"},{"title":"big","src":"../images/sk3-2.jpg"}]', '大家好，5月24日618年中大促盛大开幕，牛奶麦片大火腿，蜂蜜咖啡方便面，自热火锅螺蛳粉第二件半价啦~~来会场逛一逛。'),
(4, '索尼（SONY）ILCE-6000L APS-C微单数码相机标准套装 白色（约2430万有效像素 E PZ 16-50mm镜头 a6000）', 3649, 4199, 2819, '[{"title":"small","src":"../images/sk4-1.jpg"},{"title":"big","src":"../images/sk4-2.jpg"}]', '相机买索尼，闪瞎你的眼！'),
(5, '第一卫【秒杀中..】蓝牙耳机 真无线迷你隐形超小车载商务运动通话音乐吃鸡单双耳麦苹果华为小米通用 单耳版【商务黑】入耳舒适丨蓝牙不掉线丨2年质保', 59.2, 78, 6585, '[{"title":"small","src":"../images/sk5-1.jpg"},{"title":"big","src":"../images/sk5-2.jpg"}]', '限时秒杀，买贵包赔 ✅京仓配送，次日达 ✅Hi-Fi原音，智能降噪。'),
(6, 'Tenma天马株式会社 Fits收纳盒抽屉式收纳箱单层透明塑料衣柜收纳盒衣物整理箱子储物柜 F316(31.6*41*17.2cm) 日本tenma（中国工厂）', 59, 89, 5279, '[{"title":"small","src":"../images/sk6-1.jpg"},{"title":"big","src":"../images/sk6-2.jpg"}]', '1、爆款抽屉5月27日20点秒杀开抢！低至25元起！ 2、买满2件就送日本霜山衣架一套（3个），赠完即止！ 3、领券下单更优惠，与618同价，买贵退差价！'),
(7, '爱华仕（OIWAS）飞机轮密码锁拉杆箱6182 商务出差旅行箱 行李箱男女登机箱20英寸灰色', 289, 649, 2347, '[{"title":"small","src":"../images/sk7-1.jpg"},{"title":"big","src":"../images/sk7-2.jpg"}]', '【618抢先购！满149减40，满399减100，满599减150】 京东配送，闪电发货，次日达！'),
(8, '戴尔(DELL)灵越3670 游戏 台式电脑主机(八代i7-8700 8G 128GSSD 1T GTX1050Ti 4G独显 WIFI 蓝牙 三年上门)', 5869, 6199, 7219, '[{"title":"small","src":"../images/sk8-1.jpg"},{"title":"big","src":"../images/sk8-2.jpg"}]', '英特尔八代处理器,3年上门服务,办公无忧高效工作.内置WIFI摆脱网线羁绊,畅想无线网络的方便快捷.'),
(9, '佳能TS3180打印机家用彩色照片喷墨复印扫描一体机连供无线wifi办公 套餐五（豪华连供系统+12瓶墨水）', 658, 1099, 8894, '[{"title":"small","src":"../images/sk9-1.jpg"},{"title":"big","src":"../images/sk9-2.jpg"}]', '★ 每日抢购 ★ 0点到12点下单立送学生智能护眼台灯一台 ★ TS3180 ★ 手机无线WiFi多功能一体机 套餐循环加墨 ★ 开学狂送 ★ 购买套餐再送价值70元专用墨水一套 ★ 套餐豪礼 ★ 套餐专享10重豪礼 防尘纱罩 等 价值89元'),
(10, '洁丽雅（Grace）毛巾家纺 110g/条纯棉洗脸巾柔软亲肤面巾加厚洁面巾两条装 肉粉+卡其 76*36cm', 23.8, 29.9, 4683, '[{"title":"small","src":"../images/sk10-1.jpg"},{"title":"big","src":"../images/sk10-2.jpg"}]', '限时秒杀23.8！京东自有品牌！干湿两用加厚装，吸水吸油去污效果好！'),
(11, '【顺丰航空包邮】壹农壹果 山东烟台大樱桃 樱桃2斤装 果径24-28mm 樱桃水果 非车厘子 樱桃', 49.9, 149, 4625, '[{"title":"small","src":"../images/sk11-1.jpg"},{"title":"big","src":"../images/sk11-2.jpg"}]', '【顺丰/跨越航空】个大汁多，樱桃园子直采，坏果包赔！乡村偏远地区时效不保证，无法售后！'),
(12, '贝亲(Pigeon) 洗衣液 婴儿洗衣液 宝宝洗衣液 儿童洗衣液 1.2L/桶 (阳光香型) MA55', 31.8, 37.9, 3416, '[{"title":"small","src":"../images/sk12-1.jpg"},{"title":"big","src":"../images/sk12-2.jpg"}]', '超级少女日，小仙女必囤好物，部分2件5折。(此商品不参加上述活动)');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT '用户id',
  `us_name` varchar(16) NOT NULL COMMENT '用户姓名',
  `us_pwd` varchar(20) NOT NULL COMMENT '用户密码',
  `us_eml` varchar(30) NOT NULL COMMENT '用户邮箱',
  `us_sex` tinyint(2) NOT NULL COMMENT '用户性别',
  `us_phone` varchar(11) NOT NULL COMMENT '用户手机号'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `us_name`, `us_pwd`, `us_eml`, `us_sex`, `us_phone`) VALUES
(10000001, 'Koishi', '5622', '985778113@qq.com', 1, '13101234567'),
(10000002, 'zhangsan', '123', 'zhangsan@163.com', 0, '13012345678');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jd_users`
--
ALTER TABLE `jd_users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `jd_users`
--
ALTER TABLE `jd_users`
  MODIFY `userID` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户ID', AUTO_INCREMENT=100000005;
--
-- 使用表AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '商品ID', AUTO_INCREMENT=13;
--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=10000003;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

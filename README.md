# 项目说明
模拟京东注册、登录、添加购物车、预览商品详情页效果。

---
## v 0.4
```
新增了首页中部渐隐轮播和秒杀轮播的点击逻辑、鼠标移入移出逻辑。
首页html文件添加了部分漏掉的class。
添加了lazy插件，应用于首页最下部的“还没逛够”部分图片懒加载。
同步提交了数据库导出文件。
新增一个静态结算页面。
```

---
## v 0.3
```
补全了结算页面的checkbox逻辑，避免移除商品后出现checkbox的checked值出问题的bug。
补全了购物车数量预览区域的文本提示，动态获取已添加的商品数量并且渲染。
添加了部分css。
修改了部分css。
```

---
## v 0.2
```
保存页面当前状态(checkbox)，页面刷新后也不会重置，提升体验。
修正了部分页面一些输入有误的地方。
修正了上一版本中发现的一些bug。
```

---
## v 0.1
```
增加了购物车页面checkbox的选择逻辑，修改了总价计算逻辑。
为购物车页面增加退出登录按钮事件，点击后退出登录。
再购物车页面无商品的时候所显示内容根据登录信息判断是否显示页面中部"登录"按钮。
修改了购物车页面中一处因复制而漏修改文本的地方。
发现并修改了商品详情页面手动输入数值时会造成数值秒变数据库库存最大值的BUG。
新增购物车页面单项商品数量input失去(点击增加、点击减少、失去焦点)判断是否改变过value，如果改变过则更改cookie内原数值。
```
---
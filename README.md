# 用 node 搭建的个人开源博客
这个项目是为了学习 node 而建的，从前端到后端一手包办。相对来说，还是有一定难度的，适合有一定编程基础的人进阶学习。

如果有问题，欢迎提 [issues](https://github.com/woai3c/node-blog/issues)

注意，本项目的前后端代码都是放在一起的，前端代码放在 `src` 目录，后端代码放在 `server` 目录。

## [在线预览](http://118.190.217.8:3389/)
由于服务器网速原因，加载时间较久

## 相关文档
* [多个请求下 loading 的展示与关闭](https://github.com/woai3c/Front-end-articles/blob/master/control%20loading.md)
* [Vue 页面权限控制和登陆验证](https://github.com/woai3c/Front-end-articles/blob/master/authentication.md)
* [Vue 实现前进刷新，后退不刷新的效果](https://github.com/woai3c/Front-end-articles/blob/master/vue%20refresh.md)
* [用 node 搭建个人博客（一）：代码热更新](https://github.com/woai3c/node-blog/blob/master/doc/node-blog1.md)
* [用 node 搭建个人博客（二）：导出模块同时兼容 import 和 require](https://github.com/woai3c/node-blog/blob/master/doc/node-blog2.md)
* [用 node 搭建个人博客（三）：token](https://github.com/woai3c/node-blog/blob/master/doc/node-blog3.md)
* [用 node 搭建个人博客（四）：评论功能](https://github.com/woai3c/node-blog/blob/master/doc/node-blog4.md)
* [用 node 搭建个人博客（五）：数据库](https://github.com/woai3c/node-blog/blob/master/doc/node-blog5.md)
* [阿里云服务器部署个人网站](https://github.com/woai3c/Front-end-articles/blob/master/ecs.md)
* [性能优化--开启 gzip 压缩](https://github.com/woai3c/node-blog/blob/master/doc/optimize.md)

## 前端页面
* 首页(index)

  包含内容及标签子页面
  
* 编辑(editor)
* 登陆(login)
* 管理(manage)

## 使用的库、框架
### 前端
* [vue](https://cn.vuejs.org/v2/guide/)
* [vue-router](https://router.vuejs.org/zh/)
* [vuex](https://vuex.vuejs.org/zh/)
* [vue-markdown](https://github.com/miaolz123/vue-markdown)
* [iview](https://www.iviewui.com/docs/guide/install)
* [axios](https://www.kancloud.cn/yunye/axios/234845)

### 后端
* [node](https://nodejs.org/zh-cn/)
* [express](https://expressjs.com/zh-cn/)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)

### 数据库
* [mongodb](https://www.runoob.com/mongodb/mongodb-databases-documents-collections.html)

### 测试
* [mocha](https://mochajs.org/)

### 其他
* [lib-qqwry](https://github.com/cnwhy/lib-qqwry)——IP 地址转换为对应的城市名称

## 使用
#### 注意
1. **登陆入口在页面脚部的 Copyright ©2020 woai3c**
2. **博客内容、评论使用的都是 `markdown` 语法**

需要先下载 mongodb，建议按照[windows 安装教程](https://www.runoob.com/mongodb/mongodb-window-install.html)一步步安装。

* [mongodb 教程一](https://www.runoob.com/mongodb/mongodb-databases-documents-collections.html)
* [mongodb 教程二](https://www.runoob.com/nodejs/nodejs-mongodb.html)

在安装完 mongodb 后，克隆项目。
```
git clone https://github.com/woai3c/node-blog.git
```
在运行前还得进行一些准备工作：

因为没有注册功能，所以在使用前需要先把用户信息添加到数据库。

打开 `mongod.exe`，再打开 `mongo.exe`，在 `mongo.exe` 打开的命令行进行如下操作：

**创建数据库**
```js
use blog
```
**创建 user 集合，用来保存用户信息**
```js
db.createCollection(userCollection)
```
**添加用户信息**
```js
db.user.insert({
    user: 'admin', // 用户名 随意填写
    password: 'admin', // 密码 随意填写
    visits: 0, // 博客访问次数 每次刷新网站 自增1
    token: '', // 用户登录创建 token 后，保存在这
})
```
接下来就可以开始运行项目了。

**安装依赖**
```
npm i
```
**开发环境**（前端代码热更新，修改完即可查看效果，后端代码修改完需要重启服务）
```
npm run dev
```
**生产环境** （打包，打包过程有点长，需要等待）
```
npm run build
```
运行服务
```js
npm run server
```
**测试**
```
npm run test
```
**访问地址**
```
http://localhost:8080/
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623190928985.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3E0MTEwMjAzODI=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623190938540.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3E0MTEwMjAzODI=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190623190948955.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3E0MTEwMjAzODI=,size_16,color_FFFFFF,t_70)

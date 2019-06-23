# 用 node 搭建个人博客
这个项目是为了学习 node 而建的，从前端到后端一手包办。

相对来说，这个项目还是有一定难度的，适合有一定编程基础的人进阶学习。

注意，本项目前后端的代码都是放在一起的，前端代码放在 `src` 目录，后端代码放在 `server` 目录。

## 相关文档
* [多个请求下 loading 的展示与关闭](https://github.com/woai3c/Front-end-articles/blob/master/control%20loading.md)
* [Vue 实现前进刷新，后退不刷新的效果](https://github.com/woai3c/Front-end-articles/blob/master/vue%20refresh.md)
* [用 node 搭建个人博客（一）：代码热更新](https://github.com/woai3c/Front-end-articles/blob/master/node-blog1.md)
* [Vue 页面权限控制和登陆验证](https://github.com/woai3c/Front-end-articles/blob/master/authentication.md)

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

## 使用
需要先下载 mongodb，建议按照[windows 安装教程](https://www.runoob.com/mongodb/mongodb-window-install.html)一步步安装。

* [mongodb 教程一](https://www.runoob.com/mongodb/mongodb-databases-documents-collections.html)
* [mongodb 教程二](https://www.runoob.com/nodejs/nodejs-mongodb.html)

在安装完 mongodb 后，打开 `mongod.exe` 和 `mongo.exe`，然后克隆项目
```
git clone git@github.com:woai3c/node-blog.git
```
安装依赖
```
npm i
```
开发环境（前端代码热更新，修改完即可查看效果，后端代码修改完需要重启服务）
```
npm run dev
```
生产环境 打包并开启服务（打包过程有点长，需求等待）
```
npm run build
```
测试
```
npm run test
```
访问地址
```
http://localhost:8080/
```

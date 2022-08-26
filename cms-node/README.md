#### node项目目录结构（临时版）
```
atlas
├─ README.md
├─ api
│  ├─ index.js
│  └─ order.js
├─ app.js
├─ bin
│  └─ www
├─ config
│  ├─ config.common.js
│  ├─ config.env.dev.js
│  ├─ config.env.prod.js
│  ├─ config.js
│  └─ index.js
├─ controller
│  ├─ base.js
│  └─ cms.js
├─ extend
│  ├─ controller.js
│  ├─ index.js
│  └─ service.js
├─ logs
├─ models
├─ nodemon.json
├─ package-lock.json
├─ package.json
├─ public
├─ routes
│  ├─ index.js
│  └─ cms.js
├─ service
│  ├─ base.js
│  └─ cms.js
├─ utils
│  ├─ fetch.js
│  └─ logger.js
└─ views
   └─ index.ejs

```
#### 项目启动
安装mysql，下载navicat
创建cms数据库，执行cms.sql脚本
删除 package.json中"atlas": "0.0.1"
npm install
npm --registry https://maven.fuchuang-auto.com/repository/npm-local/ install atlas
npm start

node版本 >= v12.4

#### mysql安装
https://dev.mysql.com/downloads/file/?id=501470 下载安装包

#### redis安装
https://redis.io 下载

#### 下载私有库
$ npm --registry https://maven.fuchuang-auto.com/repository/npm-local/ install atlas

#### swagger
http://localhost:3000/cms/swagger

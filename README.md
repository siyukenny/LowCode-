# 一、项目启动

项目包含三个部分：

1. cms-manage管理配置页面系统
2. crs h5显示界面，嵌入cms-manage中显示，也可以完成预览
3. cms-node 服务端部分
   项目需要分别启动这三个文件

## 1-1 启动cms-manage

1. 先配置好vue脚手架，安装vue-cli@4.5.10版本
2. 终端执行npm install
3. 终端执行npm start

## 1-2  启动crs

1. 保证已经全局安装vue-cli@4.5.10版本
2. 终端执行npm install
3. 终端执行npm start

## 1-3 启动cms-node

1. 安装mysql
2. 创建cms数据库，执行cms.sql脚本
3. 删除 package.json中"atlas": "0.0.1"
4. npm install
5. npm --registry https://maven.fuchuang-auto.com/repository/npm-local/ install atlas
6. npm start

# 二、分支创建 



1. 仓库含master，develop，feature分支 
2. 个人加入仓库后基于develop建立feature-姓名
   - 本地仓库和gitlab仓库关联之后，在自己所在的feature分支开发
   - push代码之后，自己merge到develop分支 
   - 频繁交流，一段时间把较为完善的版本一（位于develop分支）推到master分支，然后继续加新功能，继续基于develop开发
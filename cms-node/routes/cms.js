const express = require('express');
const router = express.Router()

module.exports = (app) => {
  const { controller } = app
  // router.post('/initData', controller.cms.initData)
  // router.get('/getComponentCategory', controller.cms.getComponentCategory)
  // router.post('/deleteComponent', controller.cms.deleteComponent)
  router.post('/addPageJson', controller.cms.addPageJson) // 新增页面数据
  router.post('/updateCmsJson', controller.cms.updateCmsJson) // 编辑页面数据
  router.get('/getPageJson', controller.cms.getPageJson) // cms获取当前页数据
  router.get('/getH5PageJson', controller.cms.getH5PageJson) // H5获取页面数据
  router.get('/getPageList', controller.cms.getPageList) // cms页面列表
  router.post('/deletePage', controller.cms.deletePage) // cms删除页面
  router.post('/updatePageStatus', controller.cms.updatePageStatus) // 更新页面上架状态
  router.get('/getPageAll', controller.cms.getPageAll) // 获取上线的活动页
  router.post('/file/upload', controller.cms.fileUpload)
  router.post('/login', controller.cms.login) // 登录
  return router
}

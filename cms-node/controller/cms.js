const BaseController = require('./base')
const { orderServer } = require('../api')
const formidable = require('formidable')
const ftp = require('../utils/ftp')
const dayjs = require('dayjs')


class CmsController extends BaseController {
  async initData () {
    await this.app.service.cms.initData()
    return this.success()
  }

  async addPageJson () {
    const { req } = this
    const validate = this.validate({
      name: { required: true, type: 'string' },
    }, req.body)
    if (validate) {
      return this.error(this.getValidate(validate))
    }

    const result = await this.app.service.cms.addPageJson(req.body)
    return this.response(result)
  }

  async updateCmsJson () {
    const { req } = this
    const data = {
      id: req.body.id
    }
    const validate = this.validate({
      id: { required: true, type: 'number' },
    }, data)
    if (validate) {
      return this.error(this.getValidate(validate))
    }
    await this.app.service.cms.updateCmsJson(req.body)
    return this.success()
  }

  async getPageJson () {
    const { req } = this
    const { id } = req.query
    const result = await this.app.service.cms.getPageData({id, type:'cms'})
    return this.success(result)
  }

  async getComponentCategory () {
    const result = await this.app.service.cms.getComponentCategory()
    return this.response(result)
  }

  async deleteComponent () {
    const { req } = this
    const { id } = req.body
    await this.app.service.cms.deleteComponent(id )
    return this.success()
  }

  async getH5PageJson () {
    const { req } = this
    const { id } = req.query
    const result = await this.app.service.cms.getPageData({id, type:'h5'})
    return this.success(result)
  }

  async getPageList () {
    const { req } = this
    const data = {
      pageNum: Number(req.query.pageNum),
      pageSize: Number(req.query.pageSize),
      name: req.query.name,
      id: req.query.id,
      creator: req.query.publisher,
      is_abled: req.query.isAbled,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    }
    const validate = this.validate({
      pageNum: { required: true, type: 'number' },
      pageSize: { required: true, type: 'number' },
    }, data)
    if (validate) {
      return this.error(this.getValidate(validate))
    }
    const result = await this.app.service.cms.getPageList(data)
    return this.success(result)
  }

  async deletePage () {
    const { req } = this
    const { id } = req.body
    const data = {
      id
    }
    const validate = this.validate({
      id: { required: true, type: 'number' }
    }, data)
    if (validate) {
      return this.error(this.getValidate(validate))
    }
    const result = await this.app.service.cms.deletePage(id)
    return this.success(result)
  }
  async updatePageStatus () {
    const { req } = this
    const { id, isAbled } = req.body
    const data = {
      id,
      isAbled
    }
    const validate = this.validate({
      id: { required: true, type: 'number' },
      isAbled: { required: true, type: 'number' }
    }, data)
    if (validate) {
      return this.error(this.getValidate(validate))
    }
    const result = await this.app.service.cms.updatePageStatus(id, isAbled)
    return this.success(result)
  }

  async getPageAll () {
    const result = await this.app.service.cms.getPageAll()
    return this.success(result)
  }

  async fileUpload() {
    const { req, res } = this
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      ftp(files.file.filepath, files.file.originalFilename);
      return this.success(`http://43.129.13.3/${files.file.originalFilename}`)
    });
   
  }

  async login() {
    const { req } = this
    const { username, password } = req.body
    const data = {
      username,
      password
    }
    const validate = this.validate({
      username: { required: true, type: 'string' },
      password: { required: true, type: 'string' }
    }, data)

    if (validate) {
      return this.error(this.getValidate(validate))
    }
    const result = await this.app.service.cms.login({username, password})
    if (result) {
      return this.success(result)
    } else {
      return this.error('账号密码有误')
    } 
  }
}

module.exports = CmsController

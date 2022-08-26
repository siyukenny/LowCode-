const BaseService = require('./base')
const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
const _ = require('lodash')
const { sequelize } = require('../models')
const { model } = require('./base')
const loginTools = require('../utils/login')
const { createHmac } = require('crypto');
dayjs.extend(isBetween)

class CMSService extends BaseService {
  static async initData() {
    const { model } = this
    const t = await model.sequelize.transaction();
    try {

      // 创建应用
      await model.application.create({
        name: '商城小程序'
      })

      // 创建组件类目
      const basis = await model.component_group.create({
        name: '基础组件',
        update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
      const basis_id = basis.id
      await model.component_group.create({
        name: '业务组件',
        update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })

      // 创建组件定义数据
      const componentData = [
        {
          group_id: basis_id,
          name: '魔方',
          component_key: 'cubeSelection',
          update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          group_id: basis_id,
          name: '文本',
          component_key: 'RichText',
          update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          group_id: basis_id,
          name: '轮播图',
          component_key: 'swip',
          update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          group_id: basis_id,
          name: '横向滑动',
          component_key: 'slider',
          update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          group_id: basis_id,
          name: '辅助线',
          component_key: 'AssistLine',
          update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          group_id: basis_id,
          name: '浮标',
          component_key: 'FloatLayer',
          update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          group_id: basis_id,
          name: '客服',
          component_key: 'OnlineService',
          update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
      ]
      await model.component_definition.bulkCreate(componentData)
      await t.commit()
    } catch(err) {
      await t.rollback()
    }
  }

  static async addPageJson(data) {
    const { model } = this
    const t = await model.sequelize.transaction();

    try {
      // 获取页面数据
      const { name, cover, shareDesc, shareImage, componentList, creator = "" } = data
      const pageString = _.omit(data, ['name', 'cover', 'componentList', 'shareDesc', 'shareImage'])
      const insert_page = await model.page.create({
        application_id: 1,
        name,
        cover,
        page_type: 0, //0标准活动；1首页
        is_abled: 0, // 默认未启用
        page_string: JSON.stringify(pageString),
        create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        update_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        creator,
        share_desc: shareDesc,
        share_image: shareImage
      })
      // 处理组件数据
      const componentData = componentList.map(data => {
        const { sort } = data
        return {
          page_id: insert_page.id,
          component_string: JSON.stringify(data.data),
          name: data.name,
          sort
        }
      })
      // 批量插入
      await model.components.bulkCreate(componentData)
      await t.commit()
      return this.success({id: insert_page.id})
    } catch(err) {
      console.log(err)
      await t.rollback()
      return this.error('接口调用失败')
    }
  }

  static async updateCmsJson(data) {
    const { model } = this
    const t = await model.sequelize.transaction();
    const updateId = data.id
    try {
      // 获取页面数据
      const { name, cover, componentList, shareDesc, shareImage } = data
      const pageString = _.omit(data, ['name', 'cover', 'componentList', 'shareDesc', 'shareImage'])
      console.log(pageString, 'pageString')
      // 更新页面数据
      await model.page.update({
        name,
        cover,
        page_string: JSON.stringify(pageString),
        update_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        share_desc: shareDesc,
        share_image: shareImage
      },{
        where: {
          id: updateId
        }
      })
      // 组件数据先删除后新增
      await model.components.destroy({
        where: {
          page_id: updateId,
        }
      })

      // 处理组件数据
      const componentData = componentList.map(data => {
        const { sort, name } = data
        const componentString = _.omit(data, ['sort'])
        return {
          page_id: updateId,
          component_string: JSON.stringify(componentString.data),
          sort,
          name
        }
      })
      // 批量插入
      await model.components.bulkCreate(componentData)

      await t.commit()
    } catch(err) {
      await t.rollback()
      return this.error('接口调用失败')
    }
    // 更新page表数据
    // await
  }

  static async getComponentCategory () {
    const { model } = this
    try {
      const result = await model.component_group.findAll({
        attributes: {
          exclude: ['update_time']
        },
        include: [
          {
            model: model.component_definition,
            attributes: {
              exclude: ['update_time','group_id']
            },
          }
        ]
      })
      return result
    } catch(err) {
      console.log(err)
    }
  }

  static async deleteComponent () {

  }

  static async getPageData(data) {
    const { model } = this
    const { id, type } = data
    try {

      const res = await model.page.findOne({
        include: [
          {
            model: model.components,
          }
        ],
        where: {
          id
        },
        order: [[sequelize.col('sort'), 'asc']] // 根据sort正序排列
      })
      let result = {}
      if (res) {
        const { name, color, bgColor, cover, components, share_desc, share_image, page_string} = res
        console.log(page_string)
        
        const pageData = {
          id: res.id,
          name,
          color,
          bgColor,
          cover,
          shareDesc: share_desc,
          shareImage: share_image,
          backgroundColor: page_string.backgroundColor,
          backgroundImage: page_string.backgroundImage
        }
        // 组件数据处理
        const componentList = []


        components.forEach(({ component_string, name, id }) => {
          const componentData = _.pick(component_string, ['id', 'name'])
          componentData.data = _.omit(component_string, ['id', 'name'])
          componentData.name = name
          componentData.id = id
          // 如果当前为cms，生效时间直接返回，H5则返回isDisplay
          if (type == 'cms') {
            componentList.push(componentData)
          } else {
            // 如果填写生效时间，则判断组件是否在时间范围内
            if (component_string.validTime.length) {
              if (dayjs(component_string.validTime[0]).isBetween(new Date().getTime(), component_string.validTime[1])) {
                componentList.push(componentData)
              }
            } else {
              componentList.push(componentData)
            }
          }
        })
        result = {
          ...pageData,
          componentList
        }
      }
      return result
    } catch(err) {
      console.log(err)
      return err

    }
  }

  static async getPageList(data) {
    const { pageNum, pageSize, name, id, creator, is_abled, startDate, endDate } = data
    const { Op } = this.Sequelize
    try {
      const where = {}
      if (name) {
        where.name = {
          [Op.like]: `%${name}%`
        }
      }
      if (id) {
        where.id = id
      }
      if (creator) {
        where.creator = creator
      }
      if (is_abled) {
        where.is_abled = is_abled
      }
      if (startDate || endDate) {
        where.create_time = {
          [Op.lt]: startDate,
          [Op.gt]: endDate
        }
      }
      const page = await model.page.findAndCountAll({
        where,
        offset: (pageNum-1)*pageSize,
        limit: pageSize,
        order: [['update_time', 'desc']]
      })
      return {
        list: page.rows,
        total: page.count,
        pageNum,
        pageSize
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  static async deletePage(id) {
    const { model } = this
    try {
      // 先删除关联组件
      await model.components.destroy({
        where: {
          page_id: id,
        }
      })
      // 删除页面
      await model.page.destroy({
        where: {
          id,
        }
      })
      return {}
    } catch(err) {
      console.log(err)
      return null
    }
  }

  static async updatePageStatus (id, is_abled) {
    const { model } = this
    try {
      await model.page.update({
        is_abled
      }, {
        where: { id }
      })
      return {}
    } catch (err) {
      console.log(err)
      return null
    }
  }

  static async getPageAll () {
    try {
      const page = await model.page.findAll({
        where: {
          is_abled: 1
        },
        attributes: ['id', 'name']
      })
      return page
    } catch(err) {
      console.log(err)
      return null
    }
  }
  static async login (data) {
    const { username, password } = data
    try {
      const user = await model.user.findOne({
        where: {
          user_name: username
        }
      })
      const secret = 'cmsSecret';
      const hash = createHmac('sha256', secret)
                  .update(password)
                  .digest('hex');
      if (hash === user.password) {
        return {
          token: hash,
          username: user.user_name
        }
      }
      return null
    } catch(err) {
      return null
    }
  }
}

module.exports = CMSService

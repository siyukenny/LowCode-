const Sequelize = require('sequelize')
const models = require('../models')

class BaseService {
  static model = models
  static Sequelize = Sequelize
  // static pageSize = 30

  static success(data, message, code) {
    return {
      code: code || 10000,
      message: message || 'success',
      data
    }
  }

  static error(message, code, data=null) {
    return {
      code: code || -1,
      message: message || 'error',
      data
    }
  }
}

module.exports = BaseService

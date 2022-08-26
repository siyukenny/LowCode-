const axios = require('axios')
const _ = require('lodash')
const { baseURL } = require('../config')
const logger = require('./logger')

const instance = axios.create({
  baseURL,
  timeout: 1000 * 15,
})

instance.interceptors.request.use(config => {
  const req = config.req
  config.headers = _.pick(config.req.headers, ['authorization', 'cookie', 'user-info-wms'])
  config = _.omit(config, ['req'])
  if (config.method.toUpperCase() === 'GET') {
    logger.log('info', `[${config.method.toUpperCase()}] ${config.url} ${JSON.stringify(req.query)}`)
  } else {
    logger.log('info', `[${config.method.toUpperCase()}] ${config.url} ${JSON.stringify(req.body)}`)
  }

  return config
})

instance.interceptors.response.use(response => {
  return response.data
}, error => {

  if (
    error.code === 'ECONNABORTED' &&
    error.message.indexOf('timeout') !== -1
  ) {
    // 记录网络中断日志
    if (config.method.toUpperCase() === 'GET') {
      logger.log('error', `[${config.method.toUpperCase()}] ${config.url} ${JSON.stringify(req.query)}`)
    } else {
      logger.log('error', `[${config.method.toUpperCase()}] ${config.url} ${JSON.stringify(req.body)}`)
    }
  }
  return Promise.reject(error);
})

module.exports = instance

const fetch = require('../utils/fetch')
const config = require('../config')
const { orderServer } = config.common

exports.getDetailById = (req, params) => {
  return fetch.get(`${orderServer}/order/saleReturnOrder/getDetailById?`,{ req, params })
}

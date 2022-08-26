const dev = require('./config.env.dev')
// const test = require("./config.env.test")
// const lpt = require("./config.env.lpt")
// const uat = require("./config.env.uat")
const prod = require('./config.env.prod')
// const common = require('./config.common')
const common = require('@bigbighu/altas')

const config = {
  dev,
  prod
}

for(let i in config) {
  config[i]['common'] = common
}
module.exports = config

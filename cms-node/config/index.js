const config = require("./config")
const env = config[process.env.NODE_ENV] || config.dev
module.exports = env

// const { createHmac } = require('crypto');
const model = require('../models')

const whiteUrl = ['/atlas-cms/login', '/atlas-cms/getH5PageJson']

module.exports = function () {
  return (req, res, next) => {
    // console.log(req.url,res)
    // if (!whiteUrl.includes(req.url.split('?')[0])) {
    //   model.user.findOne({
    //     where: {
    //       password: req.headers['x-token'] || ''
    //     }
    //   }).then(data => {
    //     if (data) {
    //       next()
    //     } else {
    //       res.send({code: -2, message: 'token错误'})
    //     } 
    //   })
    // } else {
      next()
    // }
  }
}
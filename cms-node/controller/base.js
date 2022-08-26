const Controller = require('../extend/controller').Controller
const Parameter = require('parameter')

const parameter = new Parameter({ validateRoot: true })
class BaseController extends Controller {
  response(data) {
    return this.res.send(data)
  }

  success(data = {}, code = 10000, message = 'success') {
    return this.res.send({
      code,
      message,
      data
    })
  }

  error(message = 'error', code = -1, data = null) {
    return this.res.send({
      code,
      message,
      data
    })
  }

  validate(rules, data) {
    try {
      return  parameter.validate(rules, data)
    } catch (e) {
      return e.message
    }
  }

  getValidate(value) {
    return value.map(v => {
      return `${v.field} ${v.message}`
    }).join(';')
  }
}

module.exports = BaseController

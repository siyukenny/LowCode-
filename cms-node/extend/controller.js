const fs = require('fs')
const path = require('path')

class Controller {
  constructor(req, res, app) {
    this.req = req
    this.res = res
    this.app = app
  }
}

exports.Controller = Controller

const loadController = controllerPath => {
  const controllerMap = {}
  const files = fs.readdirSync(controllerPath)
  files.forEach(file => {
    const fileState = fs.statSync(path.join(controllerPath, file))
    if (fileState.isDirectory()) {
      controllerMap[file] = {
        isDir: true,
        ...loadController(path.join(controllerPath, file))
      }
    } else {
      const controllerName = file.substr(0, file.lastIndexOf('.'))
      if (controllerName) {
        controllerMap[controllerName] = {
          isDir: false,
          value: require(path.join(controllerPath, file))
        }
      }
    }
  })
  return controllerMap
}

const errMsg = message => ({ code: 1, message, data: null })
const createProxy = (controllerMap, app) => {
  return new Proxy(controllerMap, {
    get(target, name) {
      if (target[name]) {
        if (!target[name].isDir) {
          return new Proxy(target[name], {
            get(target, name) {
              return (req, res) => {
                if (Object.getOwnPropertyNames(target.value.prototype).includes(name)) {
                  new target.value(req, res, app)[name]()
                } else {
                  res.send(errMsg('method not exist'))
                }
              }
            }
          })
        } else {
          return createProxy(target[name], app)
        }
      } else {
        return new Proxy({}, {
          get() {
            return (req, res) => {
              res.send(errMsg('controller not exist'))
            }
          }
        })
      }
    }
  })
}

const controllerMap = loadController(path.join(__dirname, '../controller'))

module.exports = app => {
  app.controller = createProxy(controllerMap, app)
  return (req, res, next) => {
    next()
  }
}

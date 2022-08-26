const fs = require('fs')
const path = require('path')

const loadService = servicePath => {
  const serviceMap = {}
  const files = fs.readdirSync(servicePath)
  files.forEach(file => {
    const fileState = fs.statSync(path.join(servicePath, file))
    if (fileState.isDirectory()) {
      serviceMap[file] = {
        isDir: true,
        ...loadService(path.join(servicePath, file))
      }
    } else {
      const serviceName = file.substr(0, file.lastIndexOf('.'))
      if (serviceName) {
        serviceMap[serviceName] = {
          isDir: false,
          value: require(path.join(servicePath, file))
        }
      }
    }
  })
  return serviceMap
}

const errMsg = message => ({ code: 1, message, data: null })

const createProxy = serviceMap => {
  return new Proxy(serviceMap, {
    get(target, name) {
      if (target[name]) {
        if (!target[name].isDir) {
          return new Proxy(target[name], {
            get(target, name) {
              return target.value[name] ? target.value[name] : () => errMsg('service method not exist')
            }
          })
        } else {
          return createProxy(target[name])
        }
      } else {
        return new Proxy({}, {
          get() {
            return () => errMsg('service not exist')
          }
        })
      }
    }
  })
}

// load all service from service directory
const serviceMap = loadService(path.join(__dirname, '../service'))
module.exports = app => {
  app.service = createProxy(serviceMap)
  return (req, res, next) => {
    next()
  }
}

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const _ = require('lodash')
const basename = path.basename(__filename) // 当前模块文件名
const config = require(__dirname + '/../config').db
const db = {}
const { database, username, password } = config
const sequelize = new Sequelize(database, username, password, _.pick(config, ['port', 'dialect', 'host']))

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db

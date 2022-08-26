const dayjs = require('dayjs')
module.exports = (sequelize, DataTypes) => {
  const page = sequelize.define('page', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    page_type: {
      type: DataTypes.INTEGER
    },
    is_abled: {
      type: DataTypes.INTEGER
    },
    page_string: {
      type: DataTypes.STRING(256),
      allowNull: false,
      get () {
        const page_string = this.getDataValue('page_string')
        return page_string ? JSON.parse(page_string) : ''
      }
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      get () {
        const create_time = this.getDataValue('create_time')
        return create_time ? dayjs(create_time).format('YYYY-MM-DD HH:mm:ss') : ''
      }
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      get () {
        const update_time = this.getDataValue('update_time')
        return update_time ? dayjs(update_time).format('YYYY-MM-DD HH:mm:ss') : ''
      }
    },
    creator: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    share_desc: {
      type: DataTypes.STRING(100)
    },
    share_image: {
      type: DataTypes.STRING(100)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  })
  page.associate = models => {
    page.belongsTo(models.application, { foreignKey: 'application_id' })
    page.hasMany(models.components, { foreignKey: 'page_id' })
  }
  return page
}

module.exports = (sequelize, DataTypes) => {
  const components = sequelize.define('components', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    component_string: {
      type: DataTypes.STRING(500),
      allowNull: false,
      get () {
        const str = this.getDataValue('component_string')
        return str ? JSON.parse(str) : ''
      }
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  },{
    freezeTableName: true,
    timestamps: false
  })
  components.associate = models => {
    components.belongsTo(models.page, { foreignKey: 'page_id' })
    // components.belongsTo(models.component_definition, { foreignKey: 'defin_id' })
  }
  return components
}

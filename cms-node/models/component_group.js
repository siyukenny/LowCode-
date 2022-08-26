module.exports = (sequelize, DataTypes) => {
  const componentGroup = sequelize.define('component_group', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },{
    freezeTableName: true,
    timestamps: false
  })
  componentGroup.associate = models => {
    componentGroup.hasMany(models.component_definition, { foreignKey: 'group_id' })
  }
  return componentGroup
}

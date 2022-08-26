module.exports = (sequelize, DataTypes) => {
  const componentDefinition = sequelize.define('component_definition', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    component_key: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },{
    freezeTableName: true,
    timestamps: false
  })
  componentDefinition.associate = models => {
    componentDefinition.belongsTo(models.component_group, { foreignKey: 'group_id' })
    // componentDefinition.hasMany(models.components, { foreignKey: 'defin_id' })
  }
  return componentDefinition
}

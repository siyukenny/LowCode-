module.exports = (sequelize, DataTypes) => {
  const application = sequelize.define('application', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    application_string: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  })
  application.associate = models => {
    application.hasMany(models.page, { foreignKey: 'application_id' })
  }
  return application;
}

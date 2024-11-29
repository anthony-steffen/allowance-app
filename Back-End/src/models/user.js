
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'Users',
  });

  user.associate = (models) => {
    user.belongsToMany(models.Task, {
      as: 'tasks',
      through: 'UserTasks',
      foreignKey: 'userId',
      otherKey: 'taskId',
    });
  }
  return user;
};
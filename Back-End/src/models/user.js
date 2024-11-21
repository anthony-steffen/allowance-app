
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'Users',
  });

  User.associate = (models) => {
    User.belongsToMany(models.Task, {
      as: 'tasks',
      through: 'UserTasks',
      foreignKey: 'userId',
      otherKey: 'taskId',
    });
  }
  return User;
};

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    value: DataTypes.FLOAT,
  }, {
    timestamps: false,
    tableName: 'Tasks',
  });

  Task.associate = (models) => {
    Task.belongsToMany(models.User, {
      as: 'users',
      through: 'UserTasks',
      foreignKey: 'taskId',
      otherKey: 'userId',
    });
  }
  return Task;
}
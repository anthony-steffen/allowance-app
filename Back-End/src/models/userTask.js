
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('UserTask', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    taskId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tasks',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    timestamps: false,
    tableName: 'UserTasks',
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
    Task.belongsTo(models.Task, {
      as: 'task',
      foreignKey: 'taskId',
    });
  }
  return Task;
};
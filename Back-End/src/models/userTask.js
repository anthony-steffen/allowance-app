
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('UserTask', {
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

  task.associate = (models) => {
    task.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
    task.belongsTo(models.Task, {
      as: 'task',
      foreignKey: 'taskId',
    });
  }
  return task;
};
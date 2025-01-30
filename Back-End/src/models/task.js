
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: {
    type: DataTypes.STRING, // Supondo que esteja no formato "dd/mm/yyyy"
    allowNull: false,
    unique: true, // Restringe valores duplicados para a mesma data
  },
    value: DataTypes.FLOAT,
  }, {
    timestamps: false,
    tableName: 'Tasks',
  });

  task.associate = (models) => {
    task.belongsToMany(models.User, {
      as: 'users',
      through: 'UserTasks',
      foreignKey: 'taskId',
      otherKey: 'userId',
    });
  }
  return task;
}
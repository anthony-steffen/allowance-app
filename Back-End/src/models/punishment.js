
module.exports = (sequelize, DataTypes) => {
  const punishment = sequelize.define('Punishment', {
    describe: DataTypes.STRING,
    value: DataTypes.FLOAT,
    add: DataTypes.BOOLEAN,
    dueDate: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'Punishments',
  });
  return punishment;
} 
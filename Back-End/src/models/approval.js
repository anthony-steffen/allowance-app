
module.exports = (sequelize, DataTypes) => {
  const approval = sequelize.define('Approval', {
    date: DataTypes.STRING,
    tasks: DataTypes.JSON,
    penalties: DataTypes.JSON,
    netValue: DataTypes.FLOAT
  }, {
    timestamps: false,
    tableName: 'Approvals',
  });
 
  return approval;
}

module.exports = (sequelize, DataTypes) => {
  const approval = sequelize.define('Approval', {
    date: DataTypes.DATE,
    tasks: DataTypes.JSON,
    penalties: DataTypes.JSON,
    netValue: DataTypes.FLOAT
  }, {
    timestamps: true,
    tableName: 'Approvals',
  });
 
  return approval;
}
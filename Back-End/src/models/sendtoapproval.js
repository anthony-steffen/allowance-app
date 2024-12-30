
module.exports = (sequelize, DataTypes) => {
  const sendToApproval = sequelize.define('SendToApproval', {
    tasks: DataTypes.JSON
  }, {
    sequelize,
    tableName: 'SendToApprovals',
  });
  return sendToApproval;
}
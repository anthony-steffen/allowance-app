
module.exports = (sequelize, DataTypes) => {
  const sendToApproval = sequelize.define('SendToApproval', {
    date: DataTypes.STRING,
    tasks: DataTypes.JSON
  }, {
    timestamps: false,
    tableName: 'SendToApprovals',
  });
  return sendToApproval;
}
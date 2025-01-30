
module.exports = (sequelize, DataTypes) => {
  const sendToApproval = sequelize.define('SendToApproval', {
    date: {
			type: DataTypes.STRING, // Supondo que esteja no formato "dd/mm/yyyy"
			allowNull: false,
			unique: true, // Restringe valores duplicados para a mesma data
		},
    tasks: DataTypes.JSON
  }, {
    timestamps: false,
    tableName: 'SendToApprovals',
  });
  return sendToApproval;
}

module.exports = (sequelize, DataTypes) => {
  const approval = sequelize.define('Approval', {
    date: {
			type: DataTypes.STRING, // Supondo que esteja no formato "dd/mm/yyyy"
			allowNull: false,
			unique: true, // Restringe valores duplicados para a mesma data
		},
    tasks: DataTypes.JSON,
    penalties: DataTypes.JSON,
    netValue: DataTypes.FLOAT
  }, {
    timestamps: false,
    tableName: 'Approvals',
  });
 
  return approval;
}
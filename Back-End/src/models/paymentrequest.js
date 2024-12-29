'use strict';

module.exports = (sequelize, DataTypes) => {
  const paymentRequest = sequelize.define('PaymentRequest', {
    date: DataTypes.DATE,
    totalValue: DataTypes.FLOAT,
    status: DataTypes.STRING,
  }, {
    timestamps: true,
    tableName: 'PaymentRequests',
  });

  return paymentRequest;
}
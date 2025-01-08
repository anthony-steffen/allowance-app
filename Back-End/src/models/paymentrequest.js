'use strict';

module.exports = (sequelize, DataTypes) => {
  const paymentRequest = sequelize.define('PaymentRequest', {
    value: DataTypes.FLOAT,
  }, {
    timestamps: false,
    tableName: 'PaymentRequests',
  });

  return paymentRequest;
}
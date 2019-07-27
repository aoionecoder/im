'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Order = app.model.define('order', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    consumer_id: INTEGER,
    goods: STRING(40),
    order_no: STRING(40),
    order_id: INTEGER,
    status: INTEGER,
  });

  return Order;

};

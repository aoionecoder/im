'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Reservation = app.model.define('reservation', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    sponsor_id: INTEGER,
    invitees_id: INTEGER,
    status: INTEGER,
    msg: STRING(255),
  });

  return Reservation;
};

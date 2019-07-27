'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_name: STRING(40),
    pwd: STRING(40),
    phone_num: STRING(14),
    sex: INTEGER,
    offten_play_game: STRING(255),
    test_num: INTEGER,
    charisma_value: INTEGER,
    uuid: STRING(30),
    avatar_url: STRING(255),
    country: STRING(40),
    province: STRING(40),
    city: STRING(40),
    flower_num: INTEGER,
  });

  return User;

};

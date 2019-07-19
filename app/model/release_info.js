'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const { getSortInfo } = app;

  const ReleaseInfo = app.model.define('release_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    author: STRING(30),
    author_id: INTEGER,
    game_name: STRING(30),
    game_region: STRING(30),
    introduction: STRING,
    voice_url: STRING,
    release_time: DATE,
    good_at: STRING(255),
  });

  ReleaseInfo.query = async ({ attributes, filter = {}, pagination = {}, sort = [] }) => {
    const { page, pageSize: limit } = pagination;
    const { id, author,game_name, game_region, sex, beginTime, endTime } = filter;
    // const order = getSortInfo(sort);

    const condition = {
      offset: (page - 1) * limit,
      limit,
      // eslint-disable-next-line no-undef
      attributes,
    };

    if (id) {
      condition.where.id = id;
    }

    if (author) {
      condition.where.author = author;
    }
    if (game_name) {
      condition.where.game_name = game_name;
    }

    if (game_region) {
      condition.where.game_region = game_region;
    }

    if (sex) {
      condition.where.sex = sex;
    }

    if (beginTime) {
      condition.where.release_time > beginTime;
    }

    if (endTime) {
      condition.where.release_time < endTime;
    }

    const { count, rows } = await ReleaseInfo.findAndCountAll(condition);

    return { page, count, rows };
  };
  return ReleaseInfo;
};

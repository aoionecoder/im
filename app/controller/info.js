'use strict';


const Sequelize = require('sequelize');
const Op = Sequelize.Op

const Controller = require('./base_controller');

class InfoController extends Controller {

  async create() {
    const ctx = this.ctx;
    console.log(ctx.request.body);
    const info = await ctx.model.ReleaseInfo.create(ctx.request.body);
    this.success(info);
  }

  async query() {
    const ctx = this.ctx;
    const body = this.ctx.request.body;

    const id = body.id;
    const author = body.author;
    let pageNum = body.pageNum || 1;

    let pageSize = body.pageSize || 20;

    const game_name = body.game_name;

    const game_region = body.game_region;

    const startTime = body.startTime;

    const endTime = body.endTime;

    if (pageNum <= 0 || !pageNum) {
      pageNum = 1;
    }
    if (pageSize <= 0 || !pageSize) {
      pageSize = 20;
    }


    console.log('==========' + id);
    console.log(ctx.request.body);
    const condition = {
      // offset: (2 - 1) * 3,
      // 3
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
      order: [
        [ 'release_time', 'DESC' ],
        [ 'id', 'DESC' ],
      ],
      where: {
      },
    };

    if (id) {
      condition.where.id = id;
    }

    if (author) {
      condition.where.author = author;
    }
    if (game_name) {
      condition.where.game_name = { [Op.like]: '%' + game_name + '%' };

    } if (game_region) {
      condition.where.game_region = { [Op.like]: '%' + game_region + '%' };

    } if (startTime) {
      condition.where.release_time = { [Op.gte]: startTime };
    } if (endTime) {
      condition.where.release_time = { [Op.lte]: endTime };

    }

    const { count, rows } = await ctx.model.ReleaseInfo.findAndCountAll(condition);
    this.success({ pageNum, count, rows });
  }

  // eslint-disable-next-line no-empty-function
  async get_by() {


  }
}


module.exports = InfoController;

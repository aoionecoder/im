'use strict';

// eslint-disable-next-line strict
const Controller = require('./base_controller');

class ReserveController extends Controller {

  async create() {
    const ctx = this.ctx;
    const re = await ctx.model.Reservation.create(ctx.request.body);
    await this.ctx.controller.user.increaseCharm(ctx.request.body.sponsor_id, 1);
    this.success(re);
  }

  async agree() {
    const ctx = this.ctx;
    const id = ctx.request.query.id;
    const r = await ctx.service.reservation.update(id);
    console.log(r);
    this.success(r);
  }

}


module.exports = ReserveController;

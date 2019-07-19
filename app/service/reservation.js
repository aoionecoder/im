'use strict';

const Service = require('egg').Service;

class Reservation extends Service {
  async create() {
    const ctx = this.ctx;
    const reservation = await ctx.model.ReleaseInfo.create(ctx.request.body);
    this.success(reservation);
  }

  async update(id) {
    const ctx = this.ctx;
    const reservation = await this.ctx.model.Reservation.findByPk(id);
    if (reservation) {
      return await reservation.update({ status: 1 });
    }
    return false;
  }
}

module.exports = Reservation;

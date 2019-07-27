'use strict';

const Service = require('egg').Service;

class Order extends Service {

  async update({ order_no }) {
    // const order = await this.ctx.model.User.findByPk(id);
    // if (!user) {
    //   return false;
    // }
    // return user.update(updates);
  }


  async query({ id, order_no, consumer_id }) {
    const condition = {
      where: {},
    };

    if (id) {
      condition.where.id = id;
    }
    if (order_no) {
      condition.where.order_no = order_no;
    }
    if (consumer_id) {
      condition.where.consumer_id = consumer_id;
    }

    return await this.ctx.model.Order.findOne(condition);
  }
}

module.exports = Order;

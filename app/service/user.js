'use strict';

const Service = require('egg').Service;

class User extends Service {
  async clogin(user_name, pwd) {
    const user = await this.app.mysql.get('users', { id: 11 });
    if (user.pwd === pwd) {
      return true;
    }
    return false;
  }
  async update({ id, updates }) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      return false;
    }
    return user.update(updates);
  }

  async increaseCharm(id, num) {
    const user = await this.ctx.model.User.findByPk(id);
    const current = user.charisma_value;
    if (user) {
      const result = current + num;
      user.update(result);
      return result;
    }
    return false;
  }

  async query({ id, phone_num, uuid }) {
    const condition = {
      where: {},
    };

    if (id) {
      condition.where.id = id;
    }
    if (phone_num) {
      condition.where.phone_num = phone_num;
    }
    if (uuid) {
      condition.where.uuid = uuid;
    }

    return await this.ctx.model.User.findOne(condition);
  }
}

module.exports = User;

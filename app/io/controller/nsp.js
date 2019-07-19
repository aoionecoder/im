'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
  async exchange() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    try {
      const { target, payload } = message;
      if (!target) return;
      const msg = ctx.helper.parseMsg('exchange', payload, { client, target });

      const now = Date.now();
      const im = { client, target, msg, now };
      const imstr = JSON.stringify(im)
      await app.redis.rpush('ims', imstr);
      console.log(im)
      nsp.emit(target, msg);
      const len = await app.redis.llen('ims');
      await app.redis.lrange('ims', 0, len);
    } catch (error) {
      app.logger.error(error);
    }
  }
}

module.exports = NspController;

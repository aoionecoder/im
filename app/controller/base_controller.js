'use strict';

const { Controller } = require('egg');

/**
 * BaseController
 * @class
 * @author ruiyong-lee
 */
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(d) {
    this.ctx.body = { r: true, d, m: '操作成功！' };
    this.ctx.status = 200;
  }

  fail(d, message) {
    this.ctx.body = { r: false, d, m: message || '操作失败！' };
    this.ctx.status = 200;
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }

  token(data) {
    const token = this.ctx.helper.loginToken(data, 7200); // token生成
    this.app.redis.get('loginToken').set(data, token, 'ex', 7200); // 保存到redis
    this.ctx.body = { data: { token }, code: 1, msg: '登录成功' }; // 返回前端

  }
}

module.exports = BaseController;

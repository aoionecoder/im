
'use strict';


const Controller = require('./base_controller');

class LoginController extends Controller {
  async clogin() {
    const { name, pwd, type } = this.ctx.request.body;
    const phone_num = name;
    if (type === 'pwd') {

      const user = await this.ctx.service.user.query({ phone_num });
      if (user) {
        if (user.pwd === pwd) {

          const token = await this.geToken(name);

          this.success({ user, token });
          return;
        }
        this.fail(false, '登录失败！');
        return;
      }
    } else if (type === 'captcha') {
      const captcha = this.app.redis.get(name);
      if (captcha) {
        if (captcha === pwd) {
          const user = await this.ctx.service.user.query({ phone_num });

          const token = await this.geToken(name);
          this.success({ user, token });
          return;
        }
        this.fail(false, '登录失败！');
        return;
      }
      this.fail(false, '登录失败！');
      return;
    }
    this.fail(false, '登录失败！');
    return;

  }

  async geToken(name) {
    const token = this.app.jwt.sign({ name }, 'secret', { expiresIn: '1h' }); // token签名 有效期为1小时
    this.app.redis.set('loginToken' + name, token);
    return token;
  }

}

module.exports = LoginController;

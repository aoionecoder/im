const Controller = require('egg').Controller;

class LoginController extends Controller {
  async clogin() {
    const user = this.ctx.request.body;
    if (user && user.name) {
      const userToken = {
        name: user.name,
      };
      const token = this.app.jwt.sign(userToken, 'secret', { expiresIn: '1h' }); // token签名 有效期为1小时
      this.ctx.body = {
        message: '获取token成功',
        code: 1,
        token,
      };
    } else {
      this.ctx.body = {
        message: '参数错误',
        code: -1,
      };
    }
  }


}

module.exports = LoginController;

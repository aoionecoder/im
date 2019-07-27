'use strict';

const crypto = require('crypto');
const Controller = require('egg').Controller;

class CheckController extends Controller {
  async check1() {
    // const token = this.ctx.app.config.wechat_config.token;
    const query = this.ctx.query;
    console.log(query);
    this.ctx.body = query.echostr;

    // const timestamp = query.timestamp;
    // const nonce = query.nonce;
    // const signature = query.signature;
    // const str = [ 'lllks', timestamp, nonce ].sort().join('');
    // const hash = crypto.createHash('sha1');
    // hash.update(str);
    // const sha = hash.digest('hex');
    // if (sha === signature) {
    //   this.ctx.body = query.echostr;
    // }
  }

  async index() {
    // this.ctx.body = 'Xxx';npm
    await this.ctx.render('index');
  }

  async atoken() {
    const data = await this.ctx.curl('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + this.config.appid + '&secret=' + this.config.secret_key, {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000,
    });
    return data.data.access_token;
  }


}

module.exports = CheckController;

'use strict';

const fs = require('fs');
const path = require('path');
module.exports = {
  parseMsg(action, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);

    return {
      meta,
      data: {
        action,
        payload,
      },
    };
  },
  loginToken(data, expires = 7200) {
    const exp = Math.floor(Date.now() / 1000) + expires;

    const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem')); // 私钥，看后面生成方法
    return this.app.jwt.sign({ data, exp }, cert, { algorithm: 'RS256' });
  },

  async acctoken() {
    const data = await this.ctx.curl('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + this.config.appid + '&secret=' + this.config.secret_key, {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000,
    });
    return data.data.access_token;
  },

};

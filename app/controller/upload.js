'use strict';

// eslint-disable-next-line strict
const Controller = require('./base_controller');
const fs = require('fs');

class UploadController extends Controller {
  async saveimg() {
    const ctx = this.ctx;
    // 接收前台POST过来的base64
    const imgData = ctx.request.body.imgData;
    console.log(imgData);
    // 过滤data:URL
    const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = Buffer.from(base64Data, 'base64'); // 解码图片
    // var dataBuffer = Buffer.from(base64Data, 'base64'); // 这是另一种写法
    fs.writeFile('image.png', dataBuffer, function(err) {
      console.log(err);
      if (err !== null) {
        ctx.body = err;
        return;
      }
      ctx.body = 'true';
    });


  }

  async savei() {

    const cof = this.ctx.config;
    const access_key = this.ctx.extend.helper.acctoken();
    const m_id = this.ctx.request.body.m_id;
    const type = this.ctx.request.body.type;

    const buffer = await this.ctx.curl('https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=' + access_key, {
      data: {
        // media_id: 'GLZVGk7dDEN8q2J36qKEalmzBes3_yVDDHBOcGb7-sI',
        media_id: m_id,
      },
      contentType: 'json',
      method: 'POST',
      // 3 秒超时
      timeout: 3000,
    });

    // const buffer = await this.ctx.curl('https://codebuster.top/static/html/sss.png');
    // console.log(buffer)
    const image = buffer.data;
    const dataBuffer = Buffer.from(image);
    // console.log(buffer);
    if (type === 'image') {
      await fs.writeFileSync(cof.resource.save_src + m_id + cof.resource.jpg, dataBuffer);
    } else if (type === 'voice') {
      await fs.writeFileSync(cof.resource.save_src + m_id + cof.resource.mp3, dataBuffer);
    }

    console.log('同步写入完成');

  }

}


module.exports = UploadController;

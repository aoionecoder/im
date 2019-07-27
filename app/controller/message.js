'use strict';

// eslint-disable-next-line strict
const Controller = require('./base_controller');

const QcloudSms = require('qcloudsms_js');


class MessageController extends Controller {

  async sendMessage() {
    const { ctx, app } = this;
    const phone = this.ctx.request.body.phone_num;
    const pv = await app.redis.get(phone.toString());
    console.log(pv);
    if (pv) {
      this.success(false);
      return;
    }
    // 短信应用 SDK AppID
    const appid = 1400229946; // SDK AppID 以1400开头
    // 短信应用 SDK AppKey
    const appkey = 'ba95a24cabfebfe55cf8ef79af30b2c5';
    // 需要发送短信的手机号码
    const phoneNumbers = phone;
    // 短信模板 ID，需要在短信控制台中申请
    const templateId = 373246; // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
    // 签名
    const smsSign = '尼叩尼叩'; // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
    // 实例化 QcloudSms
    const qcloudsms = QcloudSms(appid, appkey);
    // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
    function callback(err, res, resData) {
      if (err) {
        console.log('err: ', err);
      } else {
        console.log('request data: ', res.req);
        console.log('response data: ', resData);
      }
    }

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    const randnum = rand(100000, 999999);
    const ssender = qcloudsms.SmsSingleSender();
    const params = [ randnum, '3' ];
    ssender.sendWithParam(86, phoneNumbers, templateId,
      params, smsSign, '', '', callback); // 签名参数未提供或者为空时，会使用默认签名发送短信
    app.redis.set(phone, randnum, 'EX', 60);
    this.success(true);
  }
}

module.exports = MessageController;

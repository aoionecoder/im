'use strict';


const Controller = require('./base_controller');

const stringRandom = require('string-random');
const crypto = require('crypto');
const MD5 = crypto.createHash('md5');
const xml2js = require('xml2js');

class PayController extends Controller {
  async geOrderAndRePrePayId() {
    const ctx = this.ctx;
    const ip = ctx.req.hostname;
    const { consumer_id, goods, money } = ctx.request.body;
    const order_id = Date.now().toString().substring(0, 6);
    const order_no = order_id + 'order';
    const order = ctx.model.Order.create({ order_id, order_no, consumer_id, goods });
    const key = '';//
    const paramUnifiedOrder = {
      appid: ctx.config.appid,
      body: '商家名称-销售商品类目', // 商品描述
      mch_id: '',
      nonce_str: stringRandom(32), // 随机字符串
      notify_url: '', // 毁掉地址
      openid: consumer_id, // 用户id
      out_trade_no: order_no, // 商户订单号
      spbill_create_ip: ip,
      total_fee: money, // 金额,单位为分
      trade_type: 'JSAPI',
      sign: '',
    };

    const s = 'appid=' + paramUnifiedOrder.appid + '&body=' + paramUnifiedOrder.body + '&mch_id=' + paramUnifiedOrder.mch_id + '&nonce_str=' + paramUnifiedOrder.nonce_str + '&openid='
        + paramUnifiedOrder.openid + '&out_trade_no=' + paramUnifiedOrder.out_trade_no + '&spbill_create_ip=' + paramUnifiedOrder.spbill_create_ip
        + '&total_fee='
        + paramUnifiedOrder.total_fee + '&trade_type=' +
        paramUnifiedOrder.trade_type + key;

    const sign = MD5(s).toUpperCase();

    paramUnifiedOrder.sign = sign;

    const builder = new xml2js.Builder();
    const xml = builder.buildObject(paramUnifiedOrder);

    const data = await ctx.curl('https://api.mch.weixin.qq.com/pay/unifiedorder', {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      data: xml,
      timeout: 3000,
    });
    const rx = data.data;
    const parser = new xml2js.Parser(); // xml -> json

    const rj = parser.parseString(rx);

    ctx.body = rj.prepay_id;
    return;
  }

  async wxre() {
    const ctx = this.ctx;

    const qx = ctx.request.body;
    const parser = new xml2js.Parser(); // xml -> json

    const rj = parser.parseString(qx);
    if (rj.return_code === 'SUCCESS') {
      const order = await this.ctx.service.order.query({ order_no: rj.out_trade_no });
      const user = await this.ctx.service.user.query({ uuid: order.consumer_id });
      user.update({ flower_num: user.flower_num + parseInt(order.goods.charAt(order.goods.length - 1)) });

      ctx.body = '<xml>\n' +
          '\n' +
          '  <return_code><![CDATA[SUCCESS]]></return_code>\n' +
          '  <return_msg><![CDATA[OK]]></return_msg>\n' +
          '</xml>';
    }
  }
}
module.exports = PayController;

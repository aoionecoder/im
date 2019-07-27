'use strict';

// eslint-disable-next-line strict
const Controller = require('./base_controller');

class UserController extends Controller {

  async create() {
    const ctx = this.ctx;
    const user = await ctx.model.User.create(ctx.request.body);
    this.success(user);
  }

  async query() {
    const ctx = this.ctx;
    const body = this.ctx.request.body;

    const id = body.id;
    const phone_num = body.phone_num;
    const uuid = body.uuid;
    const userInfo = await ctx.service.user.query({ id, phone_num, uuid });
    this.success(userInfo);
  }

  async update() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const { id, user_name, sex, offten_play_game } = body;
    const r = await ctx.service.user.update({ id, updates: { user_name, sex, offten_play_game } });
    if (!r) {
      this.success({ result: false, msg: '无此用户！' });
    } else {
      this.success(r);
    }
  }

  async jf() {
    const { uuid, num } = this.ctx.request.body.uuid;
    const user = await this.ctx.service.user.query({ uuid });
    const r = (user.flower_num - num);
    if (r > 0) {
      const u = user.update({ flower_num: r });
      this.success(true);
      return ;
    }
    this.success(false);
  }
  async increaseCharm() {
    const ctx = this.ctx.request.query;
    const id = ctx.id;
    const num = ctx.num;
    const r = await ctx.service.user.increaseCharm(id, num);
    if (r) {
      this.success(r);
    } else {
      this.success(-1);
    }
  }

  // eslint-disable-next-line no-empty-function
  async get_by() {
  }

  async dir() {
    const ctx = this.ctx;
    const code = ctx.query.code;
    console.log(code);
    // eslint-disable-next-line no-undef
    const user = await this.getUserInfo(code, true);
    this.success(user);
  }

  async getUUID() {
    const ctx = this.ctx;
    const code = ctx.query.code;
    console.log(ctx.query);
    const userInfo = await this.getUserInfo(code, false);
    const user = userInfo.dataValues;
    if (user.id > 0) {
      this.success(user);
      // return;
    }
    this.fail('', '请跳转到获取用户权限页面！');
  }

  async getUserInfo(code, candetail) {
    const ctx = this.ctx;
    const s = this.config.secret_key;
    const result = await ctx.curl('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + this.config.appid + '&secret=' + s + '&code=' + code + '&grant_type=authorization_code', {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000,
    });

    console.log(s);
    // console.log(result);
    const { access_token, expires_in, refresh_token, openid, scope } = result.data;
    const uuid = openid;
    console.log('uuid:' + uuid);
    const userInfo = await ctx.service.user.query({ uuid });
    // console.log(userInfo)
    if (userInfo) {
      return userInfo;
    }
    if (candetail) {
      // console.log(result.data);
      const data = await ctx.curl('https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN', {
        // 自动解析 JSON response
        dataType: 'json',
        // 3 秒超时
        timeout: 3000,
      });
      const user = data.data;
      // console.log(data.data);
      return await ctx.model.User.create({ user_name: user.nickname, uuid, sex: user.sex, avatar_url: user.headimgurl, country: user.country, province: user.province, city: user.city });
    }
    return userInfo;
  }
}


module.exports = UserController;

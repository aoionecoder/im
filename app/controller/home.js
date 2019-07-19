'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('index');
  }

  async jm() {
    await this.ctx.render('jignmo');
  }
}

module.exports = HomeController;

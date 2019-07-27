'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;

  router.get('/', controller.home.index);
  router.get('/jmm', controller.home.jm);

  router.get('/dir', controller.user.dir);
  router.get('/jm', controller.user.getUUID);


  router.get('/a', controller.check.index);
  router.get('/wx', controller.check.check1);
  router.post('/login', controller.login.clogin);


  router.post('/user/add', controller.user.create);
  router.post('/user/query', controller.user.query);
  router.post('/user/update', controller.user.update);
  router.get('/user/increase-charm', controller.user.increaseCharm);


  router.post('/release/add', controller.info.create);
  router.post('/release/query', controller.info.query);


  router.post('/message/send', controller.message.sendMessage);

  router.post('/reservation/add', controller.reserve.create);
  router.get('/reservation/agree', controller.reserve.agree);

  // im
  // socket.io
  io.of('/').route('exchange', io.controller.nsp.exchange);
};

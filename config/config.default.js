/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1562664263413_7214';
  config.secret_key = '9b9b0c6bcd57a18784e2308d94ea0891';

  config.appid = 'wxe3d1f3eb2d84a8cb';


  // {app_root}/config/config.default.js
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  // add your middleware config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.cluster = {
    listen: {
      path: '',
      port: 8019,
      // hostname: '127.0.0.1',
    },
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '47.102.222.254',
    port: 3306,
    database: 'im',
    username: 'root',
    password: 'oiu987600JKL.',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  config.io = {
    init: {
      wsEngine: 'ws',
    }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [
          'auth',
        ],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },

    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: '47.102.222.254',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: 'oiu987600JKL.',
    // 数据库名
    database: 'im',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
// {app_root}/config/config.default.js
// eslint-disable-next-line eggache/no-override-exports
exports.jwt = {
  secret: '123456', // 自己设置的值
};

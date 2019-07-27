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
  config.middleware = [ 'jwt' ];
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1562664263413_7214';

  // appid和secret_key
  config.secret_key = '9b9b0c6bcd57a18784e2308d94ea0891';
  config.appid = 'wxe3d1f3eb2d84a8cb';

  config.resource = {
    // 存储文件根路径
    save_src: '',
    // 返回的地址的前缀
    add: '',
    mp3: '.mp3',
    jpg: '.jpg',
    png: '.png',
  };

  config.jwt = {
    secret: '123456',
    enable: true,
    ignore: [ '/login', '/wx', '/public/', '/token', '/img/' ], //  哪些请求不需要认证
  };

  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '1000000000000000kb',
    jsonLimit: '1000000000000000kb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    onerror(err) {
      err.message += ', check bodyParser config';
      throw err;
    },
  };
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
      port: 80,
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


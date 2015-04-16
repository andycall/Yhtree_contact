/**
 * config
 */

var path = require('path');

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    // mongodb 配置
    db: 'mongodb://127.0.0.1/node_club_dev',
    db_name: 'node_club_dev',

    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,

    // 程序运行的端口
    port: 7890

};

module.exports = config;

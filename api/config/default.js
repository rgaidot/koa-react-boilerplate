const { name: appName, version } = require('../package.json');

module.exports = {
    port: 3000,
    appName,
    version,
    prefix: '/v1',
    jwt: {
        secret: 'secret',
        passthrough: false,
    },
    ratelimit: {
        duration: 60000,
        max: 100,
    },
    redis: {
        port: 6379,
        host: 'localhost',
    }
}

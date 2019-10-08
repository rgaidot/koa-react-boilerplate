const { name: appName, version } = require('../package.json');

module.exports = {
    appName,
    version,
    api: {
        url: 'http://localhost:3000',
    },
}

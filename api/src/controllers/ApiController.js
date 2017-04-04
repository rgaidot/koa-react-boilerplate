import config from 'config';

export default class ApiController {
    static async index(ctx) {
        ctx.body = {
            appName: config.appName,
            environment: process.env.APP_environment || 'development',
            version: config.version,
        };

        ctx.status = 200;
    }

    static getPrefix() {
        return config.prefix;
    }
}

import config from 'config'

export default class ApiController {
    static async index(ctx) {
        ctx.body = {
            appName: config.appName,
            revision: process.env.APP_REVISION || 'development',
            url: config.prefix,
            version: config.version
        }

        ctx.status = 200
    }

    static getPrefix() {
        return config.prefix
    }
}

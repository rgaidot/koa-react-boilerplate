import config from 'config';

/**
 * @api {get} /v1
 *
 * @apiVersion v0.3.0
 * @apiName v1
 * @apiGroup v1

 * @apiPermission none
 *
 * @apiSuccessExample {json} Success-Response:
     HTTP/1.1 200 OK
     {
         "appName": "Koa Restfull API",
         "environment": "development",
         "version": "0.1.0"
     }
 */
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

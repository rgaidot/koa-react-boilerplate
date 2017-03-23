import config from 'config'
import KoaRouter from 'koa-router'

const v1 = new KoaRouter({
    prefix: '/api/v1'
})

v1.get('/', async (ctx) => {
    ctx.body = {
        appName: config.appName,
        revision: process.env.APP_REVISION || 'development',
        version: config.version
    }

    ctx.status = 200
})

export default v1

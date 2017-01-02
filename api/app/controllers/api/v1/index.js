import config from 'config';
import KoaRouter from 'koa-router';

const v1 = new KoaRouter();

v1.get('/api/v1', async (ctx) => {
    ctx.body = {
        appName: config.appName,
        revision: process.env.APP_REVISION || 'development',
        version: config.version,
    };

    ctx.status = 200;
});

export default v1;

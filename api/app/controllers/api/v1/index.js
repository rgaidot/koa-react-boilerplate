import config from 'config';
import KoaRouter from 'koa-router';
import models from '../../../models';

const v1 = new KoaRouter();

v1.get('/api/v1', async (ctx) => {
    ctx.body = {
        appName: config.appName,
        revision: process.env.APP_REVISION || 'development',
        version: config.version,
    };

    ctx.status = 200;
});

v1.use(users.middleware());

export default v1;

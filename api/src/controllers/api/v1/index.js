/* eslint-disable no-param-reassign */

import config from 'config';
import KoaRouter from 'koa-router';

const v1 = new KoaRouter();

v1.get('/api/v1', async (ctx) => {
    ctx.body = {
        // TODO: add: 'git rev-parse --short HEAD' on build/config
        appName: config.appName,
        version: config.version,
    };

    ctx.status = 200;
});

export default v1;

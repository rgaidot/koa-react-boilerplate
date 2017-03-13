import Koa from 'koa';

import v1 from './controllers/v1/index';

const api = new Koa();

api.use(v1.middleware());

export default api;

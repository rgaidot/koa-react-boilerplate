import KoaRouter from 'koa-router';

import ApiController from '../controllers/ApiController';

const apiRoutes = new KoaRouter();

apiRoutes.prefix = ApiController.getPrefix();

apiRoutes.get('/', ApiController.index);

export default apiRoutes;

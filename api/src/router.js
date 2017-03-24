import KoaRouter from 'koa-router'

import apiRoutes from './routes/apiRoutes'
import usersRoutes from './routes/usersRoutes'

const router = new KoaRouter({
    prefix: apiRoutes.prefix
});

router.use(usersRoutes.middleware())
router.use(apiRoutes.middleware())

export default router

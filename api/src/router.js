import KoaRouter from 'koa-router'

import apiRoutes from './routes/apiRoutes'

const router = new KoaRouter({
    prefix: apiRoutes.prefix
})

router.use(apiRoutes.middleware())

export default router

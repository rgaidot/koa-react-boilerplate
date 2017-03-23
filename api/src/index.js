import Koa from 'koa'
import koaMount from 'koa-mount'
import helmet from 'koa-helmet'

import cluster from 'cluster'
import os from 'os'

import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import chalk from 'chalk'
import winston from 'winston'

import config from 'config'
import logger from './middlewares/logger'
import notFound from './middlewares/notFound'

import db from '../config/initializers/sequelize'

import v1 from './routes/v1/index'

const app = new Koa()
    .use(cors())
    .use(helmet())
    .use(logger)
    .use(notFound)
    .use(bodyParser())
    .use(v1.middleware())

const main = async () => {
    const dbService = await db
    if (cluster.isMaster && (process.env.NODE_ENV === 'production')) {
        os.cpus().forEach(() => cluster.fork())

        cluster.on('online', worker => winston.info(`Worker ${worker.process.pid} online.`))
        cluster.on('message', message => winston.info(message))
        cluster.on('exit', (worker, signal) => {
            winston.info(`Worker ${worker.process.pid} died (signal: ${signal}). Restarting...`)
            cluster.fork()
        })
    } else {
        await app.listen(config.port, () =>
            winston.info(chalk.black.bgGreen.bold(`${config.appName} - ${config.version}`)))
    }
}

main().catch(error => winston.error(error))

export default app

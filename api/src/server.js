import Koa from 'koa';
import helmet from 'koa-helmet';

import cluster from 'cluster';
import os from 'os';

import bodyParser from 'koa-bodyparser';
import chalk from 'chalk';
import { appName, port, version } from 'config';
import compress from 'koa-compress';
import cors from 'kcors';
import etag from 'koa-etag';
import winston from 'winston';

import logger from './middlewares/logger';
import notFound from './middlewares/notFound';
import rateLimit from './middlewares/rateLimit';

import db from '../config/initializers/sequelize';

import v1 from './router';

const app = new Koa()
    .use(cors())
    .use(compress())
    .use(etag())
    .use(helmet())
    .use(logger)
    .use(rateLimit)
    .use(notFound)
    .use(bodyParser())
    .use(v1.middleware());

const main = async () => {
    if (cluster.isMaster && process.env.NODE_ENV === 'production') {
        os.cpus().forEach(() => cluster.fork());

        cluster.on('online', worker =>
        winston.info(`Worker ${worker.process.pid} online.`));
        cluster.on('message', message => logger.info(message));
        cluster.on('exit', (worker, signal) => {
            winston.info(
                `Worker ${worker.process.pid} died (signal: ${signal}). Restarting...`
            );
            cluster.fork();
        });
    } else {
        await app.listen(port, () =>
            winston.info(chalk.black.bgGreen.bold(`${appName} - ${version}`))
        );
    }
};

main().catch(error => winston.error(error));

export default app;

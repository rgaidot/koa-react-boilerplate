/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

import Koa from 'koa';
import koaMount from 'koa-mount';
import helmet from 'koa-helmet';

import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import chalk from 'chalk';

import config from 'config';
import logger from './middlewares/logger';
import notFound from './middlewares/notFound';

import api from './api';

const app = new Koa()
    .use(cors())
    .use(helmet())
    .use(logger)
    .use(notFound)
    .use(koaMount('/', api))
    .use(bodyParser());

app.listen(config.port, () =>
    console.log(chalk.black.bgGreen.bold(`${config.appName} - ${config.version}`)));

export default app;

/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

import chalk from 'chalk';

async function logger(ctx, next) {
    try {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${chalk.inverse(start)} - ${chalk.black.bgBlue.bold(ctx.status)} ${chalk.bold(ctx.method)} ${ctx.url} - ${chalk.green(ms)} ms`);
    } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
}

export default logger;

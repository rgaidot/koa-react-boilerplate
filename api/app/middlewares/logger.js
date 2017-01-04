import chalk from 'chalk';
import winston from 'winston';

async function logger(ctx, next) {
    try {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        winston.error(`${chalk.inverse(start)} - ${chalk.black.bgBlue.bold(ctx.status)} ${chalk.bold(ctx.method)} ${ctx.url} - ${chalk.green(ms)} ms`);
    } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
}

export default logger;

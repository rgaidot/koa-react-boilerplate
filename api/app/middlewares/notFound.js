async function notFound(ctx, next) {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
        ctx.status = status;
        ctx.body = {
            error: status,
            message: 'Not found',
        };
    }
}

export default notFound;

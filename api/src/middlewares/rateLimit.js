import koaRatelimit from 'koa-ratelimit';
import Redis from 'ioredis';
import config from 'config';

const ratelimit = new koaRatelimit({
    db: new Redis(config.redis.port, config.redis.host),
    max: config.ratelimit.max,
    duration: config.ratelimit.duration,
});

export default ratelimit;

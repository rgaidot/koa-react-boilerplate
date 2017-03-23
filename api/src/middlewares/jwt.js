import config from 'config'
import jwt from 'koa-jwt'

module.exports = jwt({
    secret: config.jwt.secret,
    passthrough: config.jwt.passthrough,
})

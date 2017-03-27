import config from 'config'
import jwt from 'koa-jwt'

export default jwt({
    secret: config.jwt.secret,
    passthrough: config.jwt.passthrough,
})

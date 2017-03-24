import request from 'supertest'
import config from 'config'

import server from '../server'

describe('apiRoutes tests', () => {
    it('/', (done) => {
        request(server.listen())
          .get('/')
          .expect('Content-Type', /json/)
          .expect(404, {
              error: 404,
              message: 'Not found',
          }, done)
    })

    it('/v1', (done) => {
        request(server.listen())
          .get('/v1')
          .expect('Content-Type', /json/)
          .expect(200, {
              appName: config.appName,
              environment: 'development',
              url: config.prefix,
              version: config.version,
          }, done)
    })
})

import request from 'supertest'
import config from 'config'

import app from '../../../src'

describe('/v1', () => {
    it('/', (done) => {
        request(app.listen())
          .get('/')
          .expect('Content-Type', /json/)
          .expect(404, {
              error: 404,
              message: 'Not found',
          }, done)
    })

    it('/v1', (done) => {
        request(app.listen())
          .get('/v1')
          .expect('Content-Type', /json/)
          .expect(200, {
              appName: config.appName,
              revision: 'development',
              version: config.version,
          }, done)
    })
})

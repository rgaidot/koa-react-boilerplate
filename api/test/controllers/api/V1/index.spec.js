import request from 'supertest';
import config from 'config';

import app from '../../../../src/app';

describe('/api', () => {
    it('/v1', (done) => {
        request(app.listen())
          .get('/api/v1')
          .expect('Content-Type', /json/)
          .expect(200, {
              appName: config.appName,
              version: config.version,
          }, done);
    });
});

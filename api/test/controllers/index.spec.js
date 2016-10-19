import request from 'supertest';
import config from 'config';

import app from '../../src/app';

it('/', (done) => {
    request(app.listen())
      .get('/')
      .expect('Content-Type', /json/)
      .expect(404, {
          error: 404,
          message: 'Not found',
      }, done);
});

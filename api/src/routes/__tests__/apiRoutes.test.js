import request from 'supertest';
import config from 'config';

import server from '../../server';

describe('apiRoutes tests', () => {
    it('GET /', async () => {
        await request(server.listen()).get('/').expect(404, {
            error: 404,
            message: 'Not found',
        });
    });

    it('GET /v1', async () => {
        await request(server.listen()).get('/v1').expect(200, {
            appName: config.appName,
            environment: 'development',
            version: config.version,
        });
    });
});

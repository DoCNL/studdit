const assert = require('assert');
const User = require('../model/user');
const request = require('supertest');
const app = require('../server');

describe('USERS:', () => {
    it('POST to /api/users/add saves a user', done => {
        User.count().then(count => {
            request(app)
                .post('/api/users/add')
                .send({ name: 'usertest', password: 'password123' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
    })
});
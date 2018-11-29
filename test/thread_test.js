const assert = require('assert');
const Thread = require('../model/thread');
const request = require('supertest');
const app = require('../server');
const User = require('../model/user');

describe('THREADS:', () => {
    it('POST to /api/thread/add saves a thread', done => {
        User.create({
            name: 'threadtest',
            password: 'password123',
            active: true,
            threads: []
        })  
        .then(() => {
        Thread.count().then(count => {
            request(app)
                .post('/api/thread/add')
                .send({
                    name: 'threadtest',
                    password: 'password123',
                    title:  'nosql',
                    content: 'hoe test ik dit?' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        })
        });
    })
});
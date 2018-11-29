const assert = require('assert');
const User = require('../model/user');
const request = require('supertest');
const app = require('../server');

describe('USERS:', () => {
    it('POST to /api/users/add saves a user', done => {
        User.count().then(count => {
            request(app)
                .post('/api/users/add')
                .send({ name: 'dion', password: 'password123' })
                .set('Accept', 'application/json')
    //            .expect('Content-Type', /json/)
                .expect(200, done)
        })
    })
    it('PUT to /api/users/edit edits a password', done => {
        User.count().then(count => {
            request(app)
                .post('/api/users/edit')
                .send({ name: 'dion', currentPassword: 'password123', newPassword: 'wachtw00rd1' })
                .set('Accept', 'application/json')
                // .expect('Content-Type', /text/html; charset=utf-8/)
                .expect(200, done)
        })
    })
    it('PUT to /api/users/delete saves a user', done => {
        User.count().then(count => {
            request(app)
                .post('/api/users/delete')
                .send({ name: 'dion' })
                .set('Accept', 'application/json')
 //               .expect('Content-Type', /json/)
                .expect(200, done)
        })
    })
});
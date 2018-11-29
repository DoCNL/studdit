const assert = require('assert');
const Thread = require('../model/thread');
const request = require('supertest');
const app = require('../server');

describe('THREADS:', () => {
    
    it('POST to /api/thread/add saves a thread', done => {
        Thread.count().then(count => {
            request(app)
                .post('/api/users/add')
                .send({ name: 'dion', password: 'password123' })
                .post('/api/thread/add')
                .send({ name : 'dion', password : 'password123', title:  'patat', content : 'majonais' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
                
        })
    })
    it('PUT to /api/thread/edit edits a thread', done => {
        Thread.count().then(count => {
            request(app)
                .put('/api/thread/edit')
                .send({ name : 'dion', password : 'password123', title:  'patat', newContent : 'nee toch curry' })
                .set('Accept', 'application/json')
                
                .expect(200, done);    
        })
    })
    it('POST to /api/thread/delete removes a thread', done => {
        Thread.count().then(count => {
            request(app)
                .get('/api/thread/get')
                .send({ title: 'aardappelsla' })
                .post('/api/thread/delete')
                .send({ _id : '5c00359e5d6e52238ced75b6' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
                
        })
    })
    it('POST to /api/thread/reply replies to a thread', done => {
        Thread.count().then(count => {
            request(app)
                .post('/api/users/add')
                .send({ name: 'arno', password: 'wachtw00rd1' })
                .post('/api/thread/reply')
                .send({ name : 'arno', password : 'wachtw00rd1', title:  'patat', content : 'is het niet petat' } )
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
                
        })
    })

    it('PUT to /api/comment/edit/:id replies to a thread', done => {
        Thread.count().then(count => {
            request(app)
                .put('/api/comment/edit/:id')
                .send({ name : 'arno', password : 'wachtw00rd1', content : 'pertat*' } )
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
                
        })
    }) 

    it('PUT to /api/comment/remove/:id replies to a thread', done => {
        Thread.count().then(count => {
            request(app)
                .put('/api/comment/remove/:id')
                .send({ name : 'arno', password : 'wachtw00rd1'} )
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
                
        })
    })
    
});

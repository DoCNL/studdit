const assert = require('assert');
const Thread = require('../model/thread');
const request = require('supertest');
const app = require('../server');
const User = require('../model/user');

describe('THREADS:', () => {
    
    it('POST to /api/thread/add saves a thread', done => {
        const user = new User({name: 'dion', password: 'password123'});
        user.save().then(() => {
            request(app)
                .post('/api/thread/')
                .send({ name : 'dion' , password : 'password123' , title:  'patat', content : 'majonais' })
                .set('Accept', 'application/json')
 //               .expect('Content-Type', /json/)
                .expect(200, done);
        })        
    })

    it('PUT to /api/thread/ edits a thread', done => {
        const user = new User({name: 'dion', password: 'password123'});
        user.save().then(() => {
            request(app)
                .post('/api/thread/')
                .send({ name : 'dion' , title:  'patat', content : 'majonais' })})
        .then(() => {
                Thread.findOne({ title: 'patat'})
            request(app)
                .put('/api/thread/')
                .send({ title: 'patat', newContent : 'nee toch curry' })
                .end(() => {
                    Thread.findOne({ title: 'patat' })
                    .then((thread) => {
                    assert(thread.content === 'nee toch curry');
                    done();
                })
            })
        })
    })  
            
      
  

    it('POST to /api/thread/delete removes a thread', done => {
        const user = new User({name: 'dion', password: 'password123'});
        user.save() .then(() => {
            request(app)
                .post('/api/thread/')
                .send({ name : 'dion' , title:  'patat', content : 'majonais' })})
                .then(() => {
                    Thread.findOne({title: 'patat'})
                        .then((thread)=>{
                            request(app)
                                .delete('/api/thread/')
                                .send({ title: 'patat' })
                                .set('Accept', 'application/json')
                                .expect(200, done);
                        })
                })
    })

    it('POST to /api/thread/reply replies to a thread', done => {
        const user = new User({name: 'dion', password: 'password123'});
        const user2 = new User({name: 'arno', password: 'wachtw00rd1'});
        user.save()
        user2.save() .then(() => {
        const thread = new Thread({name : 'dion', password : 'password123', title:  'patat', content : 'majonais'});
        thread.save()})
        .then(() => {
            request(app)
                .post('/api/thread/reply')
                .send({ name : 'arno', password : 'wachtw00rd1', title:  'patat', content : 'is het niet petat' } )
                .set('Accept', 'application/json')
 //               .expect('Content-Type', /json/)
                .expect(200, done);
         
        })
    })

    it('PUT to /api/comment/edit/:id replies to a thread', done => {
        const user = new User({name: 'dion', password: 'password123'});
        const user2 = new User({name: 'arno', password: 'wachtw00rd1'});
        user.save() .then(() =>{
        user2.save()}) .then(() => {
        const thread = new Thread({name : 'dion', password : 'password123', title:  'patat', content : 'majonais'});
        thread.save()})
        
        .then(() => {
            request(app)
                .put('/api/comment/edit/:id')
                .send({ name : 'arno', password : 'wachtw00rd1', content : 'pertat*' } )
                .set('Accept', 'application/json')
 //               .expect('Content-Type', /json/)
                .expect(200, done);
                
        })
    }) 

    it('PUT to /api/comment/remove/:id removes a comment', done => {
        const user = new User({name: 'dion', password: 'password123'});
        const user2 = new User({name: 'arno', password: 'wachtw00rd1'});
        user.save()
        user2.save() .then(() => {
        const thread = new Thread({name : 'dion', password : 'password123', title:  'patat', content : 'majonais'});
        thread.save()})
        .then(() => {
            request(app)
                .post('/api/comment/remove/:id')
                .send({ name : 'arno', password : 'wachtw00rd1'} )
                .set('Accept', 'application/json')
 //               .expect('Content-Type', /json/)
                .expect(200, done);
                
        })
    })
    
});


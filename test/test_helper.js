const mongoose = require('mongoose');
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const routes = require('../routes/routes');
const config = require('../config/mongodb_config');

mongoose.Promise = global.Promise;

    mongoose.connect('mongodb://admin:admin1@ds143593.mlab.com:43593/studdit_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {
            console.log('Testdatabase connection succesfully made')
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });



beforeEach((done) => {
    const { users, comments, threads } = mongoose.connection.collections;

    users.drop(() => {
        //comments.drop(() => {
            //threads.drop(() => {
                done();
            });
        });
//    });
// });

 beforeEach((done) => {
    const { users, comments, threads } = mongoose.connection.collections;

    users.drop(() => {
//         //comments.drop(() => {
             threads.drop(() => {
               done();
            });
        });
//    });
});
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/studdit_test');
    mongoose.connection
        .once('open', () => {
            console.log('Database connection succesfully made')
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

// beforeEach((done) => {
//     const { users, comments, threads } = mongoose.connection.collections;

//     //users.drop(() => {
//         comments.drop(() => {
//             threads.drop(() => {
//                 done();
//             });
//         });
//     });
//});
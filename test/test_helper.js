const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://admin:admin1@ds143593.mlab.com:43593/studdit_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {
            console.log('Testdatabase connection succesfully made')
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
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
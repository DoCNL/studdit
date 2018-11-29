const assert = require('assert');
const User = require('../model/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const pete = new User({name: 'Pete', password: 'potato'});

        pete.save()
         .then (() => {
             assert(!pete.isNew);
             done();
         });
    });
});
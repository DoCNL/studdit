const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://sabok:potato1@ds139841.mlab.com:39841/studdit_db');
var connection = mongoose.connection
    .once('open', () => console.log('Connected to MLabs'))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;
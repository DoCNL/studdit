const mongoose = require('mongoose');
const config = require('./mongodb_config');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://sabok:potato1@ds139841.mlab.com:39841/studdit_db', { useNewUrlParser: true });
    var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dburl))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;
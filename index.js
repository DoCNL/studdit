const express = require('express');
const app = express();
const User = require('./src/user');
const insertData = require('./src/dummy_data');
const mongoose = require('mongoose');

const { users } = mongoose.connection.collections;

app.listen(3000, function() {
    console.log('listening on 3000');
});

app.get('/', function(req, res) {
    res.send("Yep it's working");
});

app.get('/users', function(req, res) {
    res.contentType('application/json');
    User.find({})
        .then((users) => {
            for (var user in users) {
                console.log(user);
            }

            res.status(200).json(users);
        })
        .catch((error) => res.status(401).json(error));
});
  
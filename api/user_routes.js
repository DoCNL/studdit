const express = require('express');
const app = express();
const User = require('../src/user');

app.listen(3000, function() {
    console.log('listening on localhost:3000');
});

app.get('/', function(req, res) {
    res.send("Yep it's working");
});

app.get('/users', function(req, res) {
    res.contentType('application/json');
    User.find({})
        .then((users) => {
            console.log(users);
            res.status(200).json(users);
        })
        .catch((error) => res.status(401).json(error));
});
  
const express = require('express');
var routes = express.Router();
const User = require('../src/user');
var mongodb = require('../config/mongodb_connector');

routes.get('/users', function(req, res) {
    res.contentType('application/json');
    User.find({})
        .then((users) => {
            //console.log(users);
            res.status(200).json(users);
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/user/add', (req, res, next) => {
    var user = new User({
      name: req.body.name,
      password: req.body.password
    });

    mongodb.collection("user").save(user, (err, result) => {
      if(err) {
        console.log(err);
        res.send(err);
      }

      res.send('User added successfully');
    });
});

routes.put('/user/edit', function(req, res) {
    User.findOne({name: req.body.name, password: req.body.password})
        .then((user) => {
            mongodb.collection("users").update(user, {name: req.body.newName, password: req.body.newPassword}, (err, result) => {
                if(err) {
                    console.log('User/password combination not found');
                    res.send('User/password combination not found');
                }
                res.send('User updated successfully');
        });
    });
});

module.exports = routes;

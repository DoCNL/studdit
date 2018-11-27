const express = require('express');
var routes = express.Router();
const Thread = require('../src/thread');
var mongodb = require('../config/mongodb_connector');

routes.get('/threads', function(req, res) {
    res.contentType('application/json');
    Thread.find({})
        .then((threads) => {
            //console.log(users);
            res.status(200).json(threads);
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/thread/add', (req, res, next) => {
    var thread = new Thread({
      title: req.body.title,
      content: req.body.content
    });

    mongodb.collection("thread").save(thread, (err, result) => {
      if(err) {
        console.log(err);
        res.send(err);
      }

      res.send('Thread added successfully');
    });
});

module.exports = routes;

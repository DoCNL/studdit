const express = require('express');

const Thread = require('../src/thread');
var mongodb = require('../config/mongodb_connector');

 function list(req, res) {
    res.contentType('application/json');
    Thread.find({})
        .then((threads) => {
            //console.log(users);
            res.status(200).json(threads);
        })
        .catch((error) => res.status(401).json(error));
}

function create(req, res, next){
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
}

module.exports = list = list;
                create = create;


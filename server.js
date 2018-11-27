const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const User = require('./src/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


MongoClient.connect('mongodb://sabok:potato1@ds139841.mlab.com:39841/studdit_db', (err, db) => {
  var dbase = db.db("studdit_db");
  if (err) return console.log(err)
  app.listen(3000, () => {
    console.log('app working on 3000')
  })

app.post('/user/add', (req, res, next) => {
    var user = new User({
      name: req.body.name,
      password: req.body.password
    });

    dbase.collection("user").save(user, (err, result) => {
      if(err) {
        console.log(err);
      }

      res.send('User added successfully');
    });
  });
})
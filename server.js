var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
var userroutes = require('./controllers/user_controller');
var mongodb = require('./config/mongodb_connector');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/', userroutes);

app.listen(3000, () => {
    console.log('App is ready for requests on localhost:3000')
  })

module.exports = app;
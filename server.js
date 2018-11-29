var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const routes = require('./routes/routes');
var mongodb = require('./config/mongodb_connector');
const neo4j = require('neo4j-driver').v1;
const neo = require('../studdit/neo4j_setup');
const config = require('./config/mongodb_config');

app.use(bodyParser.json());
routes(app);

const driver = neo4j.driver('bolt://hobby-ohmdodfghkjagbkemhkmcfbl.dbs.graphenedb.com:24786', neo4j.auth.basic('admin', 'b.xiLYIxT1grWi.YxWAjdJoufQvgZ3D'));
console.log('neo4j is live');
const session = driver.session();

// process.on('exit', function() {
//     neo.driver.close();
// });

app.listen(config.env.webPort, () => {
    console.log('App is ready for requests on localhost:3000 or heroku')
  })

module.exports = app;
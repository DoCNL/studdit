var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const routes = require('./routes/routes');
var mongodb = require('./config/mongodb_connector');
const neo4j = require('neo4j-driver').v1;
const neo = require('./neo4j_setup');


app.use(bodyParser.json());
routes(app);

const driver = neo4j.driver('bolt://hobby-ohmdodfghkjagbkemhkmcfbl.dbs.graphenedb.com:24786', neo4j.auth.basic('admin', 'b.s2yvRXIljPmM.s875PlpsZpSYvSAp'));
console.log('neo4j is live');
const session = driver.session();


// process.on('exit', function() {
//     neo.driver.close();
// });


app.listen(3000, () => {
    console.log('App is ready for requests on localhost:3000')
  })

module.exports = app;
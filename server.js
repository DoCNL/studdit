var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const routes = require('./routes/routes');
var mongodb = require('./config/mongodb_connector');
const neo4j = require('neo4j-driver').v1;
const neo = require('./neo4j_setup');


var urlencode = bodyParser.urlencoded({ extended: true});
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
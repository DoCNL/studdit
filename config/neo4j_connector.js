const neo4j = require('neo4j-driver').v1;
const neo = require('./neo4j_setup');

const driver = neo4j.driver('bolt://hobby-ohmdodfghkjagbkemhkmcfbl.dbs.graphenedb.com:24786', neo4j.auth.basic('admin', 'b.s2yvRXIljPmM.s875PlpsZpSYvSAp'));

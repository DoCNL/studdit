const User = require('../src/user');
//const neo = require('../config/neo4j_connector');

const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://hobby-ohmdodfghkjagbkemhkmcfbl.dbs.graphenedb.com:24786', neo4j.auth.basic('admin', 'b.xiLYIxT1grWi.YxWAjdJoufQvgZ3D'));


module.exports = {

    create(req, res, next){
        const userProps = req.body;
        const name = req.body.name;
        const session = driver.session();

        User.create(userProps)  
        const resultAdd = session.run(
            'CREATE (a:User {name: $name}) RETURN a',
             {name: name}
             );

        resultAdd.then(result => {
            session.close();
            driver.close();
        });
        

        console.log('user saved');
    },

    addFriend(req, res, next){
        const name1 = req.body.nameA;
        const name2 = req.body.nameB;
        const session = driver.session();

        const resultAddFriend = session.run(
            'MATCH (a:User {name: $name1}) ' +
            'MATCH (b:User {name: $name2}) ' +
            'MERGE (a)-[:FRIEND]->(b)',
            {name1: name1, name2: name2}
        );

        resultAddFriend.then(result => {
            session.close();
            driver.close();
        });

        console.log('Friends added!')




    },

    deleteFriend(req, res, next){
        const name1 = req.body.nameA;
        const name2 = req.body.nameB;
        const session = driver.session();

        const resultDeleteFriend = session.run(
            'MATCH(a:User)-[r:FRIEND]-(b:User)' +
            'WHERE a.name = $name1 AND b.name = $name2 ' +
            'DELETE r ' +
            'RETURN a, b',
            {name1: name1, name2: name2}

        );

        resultDeleteFriend.then(result => {
            session.close();
            driver.close();
            res.send(result)
        })
        .catch(err => {
            res.status(400).send({Error: 'Error while deleting friendship.'})
        })

        console.log('Friends deleted!')




    },

    edit(req, res, next){
        const name = req.body.name;
        const currentPassword = req.body.password;
        const newPassword = req.body.newPassword;

        User.findOne( { username: username } ) //find user
        .then(user =>{
            if(user === null){
                res.status(422).send({ Error :'User does not exist.'})
            }
            if(user.password !== currentPassword){
                res.status(401).send({ Error :'Current password does not match.'})
            }
            else{
                user.set('password', newPassword)
                user.save()
            }
        })
        .catch(next);
    },

    delete(req, res, next){
        const name = req.body.name;
        const password = req.body.password;

        User.findOne( { name: name } )
        .then(user =>{
            if(user === null){
                res.status(422).send({ Error :'User does not exist.'})
            }
            if(user.password !== password){
                res.status(401).send({ Error :'Current password does not match.'})
            }
            else{
                User.findOneAndDelete( { name: name } )
                .then(user => res.status(200).send({Message: "User removed successfully."}))
            }
        })
        .catch(next);
    },
    
};
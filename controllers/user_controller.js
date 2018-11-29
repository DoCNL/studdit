const User = require('../model/user');

module.exports = {

    create(req, res, next){
        const userProps = req.body;

        User.create(userProps)  
        console.log('user saved');
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
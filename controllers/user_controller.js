const User = require('../model/user');

module.exports = {

    create(req, res, next){
        const userProps = req.body;

        User.create(userProps)  
        console.log('user saved');
        (user => res.status(200).send({Message: "User created succesfully"}))
    },

    edit(req, res, next){
        const name = req.body.name;
        const currentPassword = req.body.password;
        const newPassword = req.body.newPassword;

        User.findOne( { name: name } ) //find user
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
                .then(user => res.status(200).send({Message: "password changed succesfully"}))
            }
        })
        .catch(next);
    },

    deactivate(req, res, next){
        const name = req.body.name;


        User.findOne( { name: name } )
        .then(user =>{
            if(user === null){
                res.status(422).send({ Error :'User does not exist.'})
            }
            if(user.active == false){
                res.status(401).send({ Error :'Current password does not match.'})
            }
            else{
                user.set({"active": false})
                user.save()
                .then(user => res.status(200).send({Message: "User removed succesfully"}))
            }
        })
        .catch(next);
    },
    
};
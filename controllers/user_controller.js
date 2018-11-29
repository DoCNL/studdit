const User = require('../model/user');

module.exports = {

    create(req, res, next){
        User.create({
            name: req.body.name,
            password: req.body.password,
            active: true,
            threads: []
        })  
        .then(() =>
            res.status(200).send({Message: "User created succesfully."}),
            console.log('user saved'))
        .catch((err) => {
                //console.log(err.name + ' ' + err.code)
                if (err.name == 'MongoError' && err.code == 11000) {
                    res.status(401).send({ Error: 'Username is taken.'})
                }
        })
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
    },
    //needs fixing
    deactivate(req, res, next){
        User.findOne( { name: req.body.name } )
        .then(user => {
            if(user === null){
                res.status(422).send({ Error :'User does not exist.'})
            }
            if(user.password !== req.body.password){
                res.status(401).send({ Error :'Current password does not match.'})
            }
            if(user.active === false){
                res.status(401).send({ Error :'User has already been deleted.'})
            }
            else{
                User.findByIdAndUpdate(user._id, { active: 'false' })
                .then(() => res.status(200).send({Message: "User removed succesfully"}))
                console.log(user.active)
            }
        });
    },
};
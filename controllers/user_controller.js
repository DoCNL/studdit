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
                console.log(err.name + ' ' + err.code)
                if (err.name == 'MongoError' && err.code == 11000) {
                    res.status(401).send({ Error: 'Username is taken.'})
                }
        })
},

//     create(req, res, next){
//         User.findOne({ name: req.body.name })
//         .then((fetchedUser) => {
//         if (fetchedUser == undefined){
//             User.create({
//                 name: req.body.name,
//                 password: req.body.password,
//                 active: true
//             })  
//             .then(
//                 res.status(200).send({Message: "User created succesfully."}),
//                 console.log('user saved'))
//             .catch((error) => res.status(401).json(error));
//         } else {
//             res.status(401).send({ Error :'Username is taken.'})
//         }
//     });
// },

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
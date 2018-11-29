const User = require('../model/user');
const Comment = require('../model/comment');
const Thread = require('../model/thread');

module.exports = {

    upVote(req, res, next){
        const name = req.body.name;
        const password = req.body.password;

        User.findOne( { "name": name, "password": password } ) //find user 
        console.log('thread saved');
    }
}
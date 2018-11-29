const User = require('../model/user');
const Comment = require('../model/comment');
const Thread = require('../model/thread');

module.exports = {

    upVoteThread(req, res, next){
        const threadTitle = req.body.title;

        Thread.findOne({ title: threadTitle })
        .then(thread => { 
        if (thread === null){
            res.status(422).send({ Error :'Thread does not exist.'})
        } else {
            const newVote = thread.upVotes + 1;
            console.log(newVote)
            Thread.findByIdAndUpdate(thread._id, { upVotes: newVote })
            .then(user => res.status(200).send({Message: "Thread upvoted succesfully"}))
        }
    });
    }
}
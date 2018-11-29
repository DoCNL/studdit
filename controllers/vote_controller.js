const User = require('../model/user');
const Comment = require('../model/comment');
const Thread = require('../model/thread');

module.exports = {

    upVoteThread(req, res, next){
        const threadTitle = req.body.threadTitle;

        Threads.findOne({ "title": threadTitle })
        if (thread === null){
            res.status(422).send({ Error :'Thread does not exist.'})
        } else {
            const newVote = thread.upVote++;
            Thread.findOneAndUpdate(thread, { "upVote": newVote })
            .then(user => res.status(200).send({Message: "Thread upvoted succesfully"}))
        }
    }
}
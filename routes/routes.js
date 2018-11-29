const UserController = require('../controllers/user_controller');
const ThreadController = require('../controllers/thread_controller');
const CommentController = require('../controllers/comment_controller');
const VoteController = require('../controllers/vote_controller');

module.exports = (app) => {

    //create a new user
    app.post('/api/users/add', UserController.create);
    //change password of an existing user
    app.put('/api/users/edit', UserController.edit);
    //delete a user
    app.put('/api/users/delete', UserController.deactivate);

    //create a new thread
    app.post('/api/thread/add',ThreadController.create);
    //edit an existing thread
    app.post('/api/thread/edit',ThreadController.edit);

    //Upvote a thread or comment, depends on the given object
    app.post('/api/thread/upvote',VoteController.upVoteThread);

};
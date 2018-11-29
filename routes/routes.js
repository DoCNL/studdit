const UserController = require('../controllers/user_controller');
const ThreadController = require('../controllers/thread_controller');
const CommentController = require('../controllers/comment_controller');
const VoteController = require('../controllers/vote_controller');

module.exports = (app) => {

    //create a new user with 'name, password'
    app.post('/api/user/', UserController.create);
    //change password of an existing user with 'name, password, newPassword'
    app.put('/api/user/', UserController.edit);
    //delete a user with 'name, password'
    app.delete('/api/user/', UserController.deactivate);

    //create a new thread with 'username, title, content'
    app.post('/api/thread/',ThreadController.create);
    //edit an existing thread with 'id, content'
    app.put('/api/thread/',ThreadController.edit);
    //delete an existing thread and all its comments
    app.delete('/api/thread/', ThreadController.delete);
    //create a new comment as reply to a thread with 'name, id, content'
    app.post('/api/thread/reply', CommentController.replyToThread);

    //Upvote a thread or comment, depends on the given object
    app.post('/api/thread/upvote',VoteController.upVoteThread);

};
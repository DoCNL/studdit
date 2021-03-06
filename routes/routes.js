const UserController = require('../controllers/user_controller');
const ThreadController = require('../controllers/thread_controller');
const CommentController = require('../controllers/comment_controller');
const VoteController = require('../controllers/vote_controller');

module.exports = (app) => {


    // Befriend users
    app.post('/api/users/addfriend', UserController.addFriend);
    // Delete friendship
    app.delete('/api/users/deletefriend', UserController.deleteFriend);

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
    //fetch all threads without sorting them
    app.get('/api/threads', ThreadController.getAllThreadsUnsorted);
    //fetch a thread+comments with 'id'
    app.get('/api/thread/:id', ThreadController.getThreadById);
    //Upvote a thread with 'title'
    app.post('/api/thread/upvote',VoteController.upVoteThread);

    //create a new comment as reply to a thread with 'name, id, content'
    app.post('/api/thread/reply', CommentController.replyToThread);

    //Upvote a thread or comment, depends on the given object
    app.post('/api/thread/upvote',VoteController.upVoteThread);

    //delete a comment
    app.post('/api/comment/remove/:id', CommentController.remove);
    //edit a comment
    app.post('/api/comment/edit/:id', CommentController.edit);

};
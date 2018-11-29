const UserController = require('../controllers/user_controller');
const ThreadController = require('../controllers/thread_controller');

module.exports = (app) => {

    //create user
    app.post('/api/users/add', UserController.create);
    //change password
    app.put('/api/users/edit', UserController.edit);
    //delete user
    app.delete('/api/users/delete', UserController.delete);
    // Befriend users
    app.post('/api/users/addfriend', UserController.addFriend);
    // Delete friendship
    app.delete('/api/users/deletefriend', UserController.deleteFriend)

    //create thread
    app.post('/api/thread/add',ThreadController.create);
    //edit
    app.post('/api/thread/edit',ThreadController.edit);

};
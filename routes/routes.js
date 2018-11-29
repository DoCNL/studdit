const UserController = require('../controllers/user_controller');
const ThreadController = require('../controllers/thread_controller');

module.exports = (app) => {

    //create a new user
    app.post('/api/users/add', UserController.create);
    //change password of an existing user
    app.put('/api/users/edit', UserController.edit);
    //delete a user
    app.delete('/api/users/delete', UserController.delete);

    //create a new thread
    app.post('/api/thread/add',ThreadController.create);
    //edit an existing thread
    app.post('/api/thread/edit',ThreadController.edit);

};
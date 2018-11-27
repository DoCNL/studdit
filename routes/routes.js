const UserController = require('../controllers/user_controller');
const ThreadController = require('../controllers/thread_controller');

module.exports = (app) => {

    //create user
    app.post('/api/users/add', UserController.create);
    //change password
    app.put('/api/users/edit', UserController.edit);
    //delete user
    app.delete('/api/users/delete', UserController.delete);

    //create thread
    app.post('/api/thread/add',ThreadController.create);
    //edit
    app.post('/api/thread/edit',ThreadController.edit);

};
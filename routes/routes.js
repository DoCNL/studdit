const UsersController = require('../controllers/user_controller');
const ThreadController = require('../controllers/user_controller');

const app = require('express').Router();

module.exports = (app) => {



app.get('/threads', ThreadController.list);
app.post('/thread/add', ThreadController.create);
//app.put('/thread/:id', ThreadController.delete)



}

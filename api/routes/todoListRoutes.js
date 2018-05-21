'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/todoListController');
    var users = require('../controllers/userController');

    // todoList Routes
    app.route('/tasks')
        .post(todoList.create_a_task);
    
    app.route('/tasks/:user')
        .get(todoList.list_all_tasks);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task)

    app.route('/user/:username/:password')
        .get(users.getUser)
        .post(users.createNewUser);
};
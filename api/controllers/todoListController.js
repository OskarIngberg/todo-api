'use strict';

var mongoose = require('mongoose');
var Task = mongoose.model('Tasks');
var Cryptr = require('cryptr');
var config = require('../config/config');
var cryptrUser = new Cryptr(config.usersalt);

exports.list_all_tasks = function(req, res) {
    console.log(req.params.user);
    var user = cryptrUser.encrypt(req.params.user);
    Task.find({
        user: user
    }, function(error, task) {
        if (error) {
            res.send(error);
        } else {
            res.json(task);
        }
    });
}

exports.create_a_task = function(req, res) {
    console.log('create body: ', req.body.user);
    req.body.user = cryptrUser.encrypt(req.body.user);
    var new_task = new Task(req.body);
    new_task.save(function(error, task) {
        if (error) {
            res.send(error);
        } else {
            res.json(task);
        }
    });
}

exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(error, task) {
        if (error) {
            res.send(error);
        } else {
            res.json(task);
        }
    });
}

exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function(error, task) {
        if (error) {
            res.send(error);
        } else {
            res.json(task);
        }
    });
}

exports.delete_a_task = function(req, res) {
    Task.remove({
        _id: req.params.taskId
    }, function(error, task) {
        if (error) {
            res.send(error);
        } else {
            res.json({ message: 'Task deleted' });
        }
    });
}
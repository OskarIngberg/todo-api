'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('Users');
var Cryptr = require('cryptr');
var config = require('../config/config');
var cryptrUser = new Cryptr(config.usersalt);
var cryptrPass = new Cryptr(config.passwordsalt);

exports.getUser = function(req, res) {
    var hashUsername = cryptrUser.encrypt(req.params.username);
    var hashPassword = cryptrPass.encrypt(req.params.password);

    User.find({
        username: hashUsername,
        password: hashPassword
    }, 
    function(error, user) {
        if (error) {
            res.send(error);
        } else {
            if (user.length > 0) {
                res.json(true);
            } else {
                res.json(false);
            }
        }
    });
}

exports.createNewUser = function(req, res) {
    var hashUsername = cryptrUser.encrypt(req.body.username);
    var hashPassword = cryptrPass.encrypt(req.body.password);

    var body = {
        username: hashUsername,
        password: hashPassword
    }

    var newUser = new User(body);
    newUser.save(function(error, user) {
        if (error) {
            res.send(error);
        } else {
            res.json(user);
        }
    });
}
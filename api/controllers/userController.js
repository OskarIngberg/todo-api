'use strict';

var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var User = mongoose.model('Users');

exports.getUser = function(req, res) {
    var hashUsername = passwordHash.generate(req.params.username);
    var hashPassword = passwordHash.generate(req.params.password);

    console.log(hashUsername);
    console.log(hashPassword);

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
    var hashUsername = passwordHash.generate(req.body.username);
    var hashPassword = passwordHash.generate(req.body.password);

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
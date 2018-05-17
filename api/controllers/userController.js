'use strict';

var mongoose = require('mongoose');
var Users = mongoose.model('Users');

exports.getUser = function(req, res) {
    Users.find({
        username: req.params.username,
        password: req.params.password
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
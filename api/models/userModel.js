'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: "Enter a username"
    },
    password: {
        type: String,
        required: "Enter a password"
    }
});

module.exports = mongoose.model('Users', UserSchema);
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TaskSchema = new Schema({
    user: {
        type: String,
        required: 'Most have a user'
    },
    title: {
        type: String,
        required: 'Enter a title for the task'
    },
    Created_date: {
        type: Number,
        required: 'Needs a created date!'
    },
    urgency: {
        type: String,
        required: 'Enter urgency to todo'
    },
    tasks: [
        {
            task: {
                type: String,
                required: 'Must have a task'
            },
            done: {
               type: Boolean,
               default: false
            }
        }
    ]
});

module.exports = mongoose.model('Tasks', TaskSchema);
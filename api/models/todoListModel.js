'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TaskSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title for the task'
    },
    Created_date: {
        type: Date,
        default: Date.now
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
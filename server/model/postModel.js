const mongoose = require('mongoose');
const User = require('./userModel');

const postSchema = mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    gif: {
        type: String,
        required: true,
        default: null,
    },
    date: {
        type: Date,
        required: true,
    },
    reactions: {
        type: [
            {
                mood: {
                    type: String,
                },
                user: {
                    type: String,
                },
            },
        ],
        required: true,
    },
});

module.exports = mongoose.model('Post', postSchema);

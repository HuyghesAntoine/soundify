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
        default: null,
    },
    track: {
        type: String,
        default: null,
    },
    date: {
        type: Date,
        required: true,
    },
    reactions: {
        type: [
            {
                reaction: {
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

const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    post: {
        type: String,
        required: true
    },
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
    date: {
        type: Date,
        required: true,
    },
    upvote: {
        type: [
            String
        ],
        required: true,
    },    
    downvote: {
        type: [
            String
        ],
        required: true,
    },
});

module.exports = mongoose.model('Comment', commentSchema);

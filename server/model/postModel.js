const mongoose = require('mongoose'); 

const postSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        reqquired: true
    },
    reactions: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);
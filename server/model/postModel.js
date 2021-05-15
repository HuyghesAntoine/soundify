const mongoose = require('mongoose'); 
const User = require('./userModel');

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
        type: [
            {
                mood: {
                    type: String
                },
                user: {
                    type: String
                }
            }
        ],
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    oauth: {
        type: String
    },
    followers: {
        type: [String]
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);
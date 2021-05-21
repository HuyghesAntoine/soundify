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
    bio : {
        type: String,
        required: true
    },
    oauth: {
        type: String,
        required: true
    },
    follow: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "online"
    }
});

module.exports = mongoose.model('User', userSchema);
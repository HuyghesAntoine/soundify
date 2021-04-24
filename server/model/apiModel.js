const apiModel = require('../model/apiModel');
const mongoose = require('mongoose');
const User = require('./dbModel');
require('dotenv/config');

mongoose.connect(process.env.DB_url,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('db is connected !!!')
});


exports.search = async function (mail) {
    const find = await User.find(JSON.parse('{"email": "' + mail + '"}'));
    return find;
};

exports.insertUser = async function (oauth, mail) {
    console.log('insert user ');
    const post = new User({
        username: "Théo",
        email: mail
    });
    try{
        const newUser = await post.save();
        return newUser;
    }catch(err){
        console.log(err);
        return JSON.parse('{"err": "'+ err + '"}');
    }
}

exports.updateUser = function (oauth, mail) {
    console.log('update user');
    return JSON.parse('{"update": "TODO"}');
}
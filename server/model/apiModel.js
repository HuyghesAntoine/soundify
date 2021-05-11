const apiModel = require('../model/apiModel');
const mongoose = require('mongoose');
const User = require('./userModel');
const Post = require('./postModel');
const { debounce } = require('lodash');
require('dotenv/config');

mongoose.connect(process.env.DB_url,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('db is connected !!!')
});


exports.searchUser = async function (mail) {
    const find = await User.find(JSON.parse('{"email": "' + mail + '"}'));
    return find;
};

exports.insertUser = async function (oauth, token) {
    console.log('insert user ');
    const user = new User({
        username: oauth.display_name,
        email: oauth.email,
        bio: " ",
        oauth: token
    });
    try{
        const newUser = await user.save();
        return newUser;
    }catch(err){
        console.log(err);
        return JSON.parse('{"err": "'+ err + '"}');
    }
}



exports.updateUser = async function (oauth, token) {
    console.log('update user');
    const update = await User.updateOne(
        { email: oauth.email},
        { $set: { oauth: token} }
    );
    return update;
}

exports.insertPost = async function (username, cont){
    const post = new Post({
        author: username,
        content: cont,
        date: Date.now()
    });
    try{
        const newPost = await post.save();
        return newPost;
    }catch(err){
        console.log(err);
        return JSON.parse('{"err": "'+ err + '"}');
    }
}

exports.deletePost = async function (id){
    const post = new Post({
        _id: id
    });
    try{
        const res = post.delete();
        return res;
    }catch(err){
        console.log(err);
        return JSON.parse('{"err": "'+ err + '"}');
    }
}

exports.searchPostWithId = async function (id){
    const find = await Post.find(JSON.parse('{"_id": "' + id + '"}'));
    return find;
}

exports.searchAllUsers = async function (mail) {
    const find = await User.find();
    return find;
};

exports.addFollower = async function (myid, id) {
    const update = await User.updateOne(
        { _id: myid},
        { $push: {followers: id}}
    );
    return update;
}

exports.getFollower = async function (myid, id){
    const find = await User.find(JSON.parse('{"_id": "' + myid + '","followers": "' + id + '"}'));
    console.log(find);
    return find;
}
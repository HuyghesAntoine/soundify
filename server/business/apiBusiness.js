const apiModel = require('../model/apiModel');
const spotifyRepository = require('../httpRepository/SpotifyRepository');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const _ = require('lodash');
const { addFollower } = require('../controller/apiController');

exports.test = function (req, res) {
    return apiModel.test();
};

exports.createOrUpdateUser = async function (oauth) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(
        'GET',
        'https://api.spotify.com/v1/me?access_token=' + oauth,
        false
    ); // false for synchronous request
    xmlHttp.send(null);
    const res = JSON.parse(xmlHttp.responseText);
    console.log(res);
    /*if(JSON.parse(xmlHttp.responseText).error.status == 401)
        return JSON.parse('{"error": "oauth incorrect"}');
    else{*/
    if (_.isEqual(await apiModel.getUser(res.email), JSON.parse('[]')))
        //email probablement pas dans oauth
        return await apiModel.insertUser(res, oauth);
    else return await apiModel.updateUser(res, oauth);
    //}
};

exports.getUser = async function (mail) {
    var user = await apiModel.getUser(mail);
    if (_.isEqual(user, JSON.parse('[]'))) return JSON.parse('[]');
    user = user[0];
    console.log(user);
    user.oauth = 'HIDE';
    return user;
};

exports.putPost = async function (content, query) {
    const token = query.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]'))) return user;
    const res = await apiModel.insertPost(user[0]._id, content); //changer le théo en oauth.username
    return res;
};

exports.getPost = async function (id) {
    const res = await apiModel.searchPostWithId(id);
    return res;
};

exports.deletePost = async function (id) {
    const resSearch = await apiModel.searchPostWithId(id);
    if (_.isEqual(resSearch, JSON.parse('[]'))) {
        console.log('vide');
        return JSON.parse('[]');
    } else {
        console.log('delete post with id : ' + id);
        await apiModel.deletePost(id);
        return resSearch;
    }
};

exports.getAllUsers = async function () {
    var users = await apiModel.searchAllUsers();
    return users;
};

exports.addFollower = async function (id, query) {
    const token = query.access_token;
    console.log(token);
    console.log(id);
    const user = await apiModel.getUserWithId(id);
    const res = await apiModel.getFollower(token, id);
    if (
        _.isEqual(res, JSON.parse('[]')) &&
        !_.isEqual(user, JSON.parse('[]'))
    ) {
        const update = await apiModel.addFollower(token, id);
        return update;
    }
    return res;
};

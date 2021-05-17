const apiModel = require('../model/apiModel');
const spotifyRepository = require('../httpRepository/SpotifyRepository');
const _ = require('lodash');

exports.createOrUpdateUser = async function (token) {
    const res = spotifyRepository.getUser(token);
    console.log(res);
    /*if(JSON.parse(xmlHttp.responseText).error.status == 401)
        return JSON.parse('{"error": "oauth incorrect"}');
    else{*/
    if (_.isEqual(await apiModel.getUser(res.email), JSON.parse('[]')))
        //email probablement pas dans oauth
        return await apiModel.insertUser(res, token);
    else return await apiModel.updateUser(res, token);
    //}
};

exports.getUser = async function (mail) {
    var user = await apiModel.getUser(mail);
    if( _.isEqual(user, JSON.parse('[]')) )
        return JSON.parse(
        '{' +
            '"code": 404,' +
            '"erreur": "not found",' +
            '"message": "email ' + mail + ' not found"' +
        '}');
    user = user[0];
    return user;
};

exports.getMe = async function (token) {
    var user = await apiModel.getUserWithToken(token);
    if( _.isEqual(user, JSON.parse('[]')) )
        return JSON.parse(
        '{' +
            '"code": 401,' +
            '"erreur": "unauthorized",' +
            '"message": "oauth introuvable"' +
        '}');
    user = user[0];
    //user.oauth = 'HIDE';
    return user;
};

exports.getAllUsers = async function () {
    var users = await apiModel.searchAllUsers();
    return users;
};

exports.addFollower = async function (id, query) {
    const token = query.authorization;
    var me = await apiModel.getUserWithToken(token);
    if( _.isEqual(me, JSON.parse('[]')) )
        return JSON.parse(
        '{' +
            '"code": 401,' +
            '"erreur": "unauthorized",' +
            '"message": "oauth introuvable"' +
        '}');

    const user = await apiModel.getUserWithId(id);
    if( _.isEqual(user, JSON.parse('[]')) )
        return JSON.parse(
        '{' +
            '"code": 400,' +
            '"erreur": "error",' +
            '"message": "l\'id fourni est introuvable"' +
        '}');

    const res = await apiModel.getFollower(token, id);
    if( !_.isEqual(res, JSON.parse('[]')) )
        return JSON.parse(
        '{' +
            '"code": 400,' +
            '"erreur": "error",' +
            '"message": "vous followez déja cette personne"' +
        '}');

    const update = await apiModel.addFollower(token, id);
    return update;  
};

exports.removeFollower = async function (id, query) {
    const token = query.authorization;
    var me = await apiModel.getUserWithToken(token);
    if( _.isEqual(me, JSON.parse('[]')) )
        return JSON.parse(
        '{' +
            '"code": 401,' +
            '"erreur": "unauthorized",' +
            '"message": "oauth introuvable"' +
        '}');

    const user = await apiModel.getUserWithId(id);
    if( _.isEqual(user, JSON.parse('[]')) )
        return JSON.parse(
        '{' +
            '"code": 400,' +
            '"erreur": "error",' +
            '"message": "l\'id fourni est introuvable"' +
        '}');
    const update = await apiModel.removeFollower(token, id);
    return update;
};

exports.putBio = async function (content, query) {
    const token = query.authorization;
    const user = await apiModel.getUserWithToken(token);
    if( _.isEqual(user, JSON.parse('[]')) )
        return JSON.parse(
        '{' +
            '"code": 401,' +
            '"erreur": "unauthorized",' +
            '"message": "oauth introuvable"' +
        '}');
    const res = await apiModel.updateUsersBio(user[0]._id, content); //changer le théo en oauth.username
    return res;
};

exports.searchUser = async function (query, limit) {
    return apiModel.searchUser(query, limit);
};

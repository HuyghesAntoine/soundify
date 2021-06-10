const apiModel = require('../model/apiModel');
const spotifyRepository = require('../httpRepository/SpotifyRepository');
const _ = require('lodash');
const error = require('./errorBusiness');

exports.createOrUpdateUser = async function (token) {
    const res = spotifyRepository.getUser(token);
    console.log(res);
    /*if(JSON.parse(xmlHttp.responseText).error.status == 401)
        return JSON.parse('{"error": "oauth incorrect"}');
    else{*/
    if (_.isEqual(await apiModel.getUser(res.email), JSON.parse('[]'))) {
        // default follow
        apiModel.addFollower(token, '609ae7c8b2d6f148d3be8e4b');
        apiModel.addFollower(token, '609e95e78dc03771467f6184');
        apiModel.addFollower(token, '609adc74ce1cb91cbc4f89a8');

        //email probablement pas dans oauth
        return await apiModel.insertUser(res, token);
    } else return await apiModel.updateUser(res, token);
    //}
};

exports.getUser = async function (mail) {
    var user = await apiModel.getUser(mail);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(404, 'not found', `email ${mail} not found`);
    user = user[0];
    return user;
};

exports.getMe = async function (token) {
    var user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(401, 'unauthorized', 'oauth introuvable');
    return user[0];
};

exports.getAllUsers = async function () {
    var users = await apiModel.searchAllUsers();
    return users;
};

exports.addFollower = async function (id, query) {
    const token = query.authorization;
    var me = await apiModel.getUserWithToken(token);
    if (_.isEqual(me, JSON.parse('[]')))
        return error.errorReturn(401, 'unauthorized', 'oauth introuvable');

    const user = await apiModel.getUserWithId(id);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(400, 'error', "l'id fourni est introuvable");

    const res = await apiModel.getFollower(token, id);
    if (!_.isEqual(res, JSON.parse('[]')))
        return error.errorReturn(
            400,
            'error',
            'vous followez déja cette personne'
        );

    const update = await apiModel.addFollower(token, id);
    return update;
};

exports.removeFollower = async function (id, query) {
    const token = query.authorization;
    var me = await apiModel.getUserWithToken(token);
    if (_.isEqual(me, JSON.parse('[]')))
        return error.errorReturn(401, 'unauthorized', 'oauth introuvable');

    const user = await apiModel.getUserWithId(id);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(400, 'error', "l'id fourni est introuvable");
    const update = await apiModel.removeFollower(token, id);
    return update;
};

exports.putBio = async function (content, query) {
    const token = query.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(401, 'unauthorized', 'oauth introuvable');
    const res = await apiModel.updateUsersBio(user[0]._id, content); //changer le théo en oauth.username
    return res;
};

exports.searchUser = async function (query, limit) {
    return apiModel.searchUser(query, limit);
};

exports.getFollow = async function (query, id) {
    const token = query.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(401, 'unauthorized', 'oauth introuvable');
    const res = await apiModel.getFollow(id);
    if(_.isEqual(res, JSON.parse('[]')))
        return []
    for (let i = 0; i < res[0].follow.length; i++)
        res[0].follow[i] = {
            _id: res[0].follow[i],
            username: (await apiModel.getUserWithId(res[0].follow[i]))[0]
                .username,
        };
    return res[0].follow;
};

exports.getFollower = async function (query, id) {
    const token = query.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(401, 'unauthorized', 'oauth introuvable');
    const res = await apiModel.getFollowed(id);
    return res;
};

exports.getProfil = async function (query, id){
    const token = query.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(401, 'unauthorized', 'oauth introuvable');
    var res = await apiModel.getUserWithId(id);
    res = res[0].toObject();
    const nb_post = await apiModel.getNbPost(id);
    const nb_comm = await apiModel.getNbCommsByUser(id);
    const nb_followers = await apiModel.getNbfollowers(id);
    res.nbPost = nb_post;
    res.nbFollow = res.follow.length;
    res.nbComms = nb_comm;
    res.nbFollowers = nb_followers;
    console.log(res);
    return res;
}

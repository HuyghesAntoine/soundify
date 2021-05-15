const apiModel = require('../model/apiModel');
const spotifyRepository = require('../httpRepository/SpotifyRepository');
const _ = require('lodash');


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

exports.getTimeline = async function (headers) {
    const res = await apiModel.getTimeline(headers.authorization);
    return res;
};

exports.putReact = async function (headers, id, mood){
    const token = headers.authorization;
    const user = await apiModel.getUserWithToken(token);
    const react = await apiModel.selectReact(user[0]._id, id, mood);

    if( !_.isEqual(user, JSON.parse('[]')) && _.isEqual(react, JSON.parse('[]')) ){
        const res = await apiModel.updateReact(user[0]._id, id, mood);
        return res;
    }else
        return JSON.parse('{ "user":' + JSON.stringify(user)  + ', "reacts":'+ JSON.stringify(react) + '}');
}

exports.removeReact = async function (headers, id, mood){
    const token = headers.authorization;
    const user = await apiModel.getUserWithToken(token);

    if( !_.isEqual(user, JSON.parse('[]')) ){
        const res = await apiModel.removeReact(user[0]._id, id, mood);
        return res;
    }else
        return user;
}
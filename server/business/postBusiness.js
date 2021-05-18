const apiModel = require('../model/apiModel');
const spotifyRepository = require('../httpRepository/SpotifyRepository');
const _ = require('lodash');

exports.putPost = async function (data, query) {
    const token = query.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return JSON.parse(
            '{' +
                '"code": 401,' +
                '"erreur": "unauthorized",' +
                '"message": "oauth introuvable"' +
                '}'
        );
    const res = await apiModel.insertPost(user[0]._id, data.content, data.gif);
    return res;
};

exports.getPost = async function (id) {
    const res = await apiModel.searchPostWithId(id);
    return res;
};

exports.deletePost = async function (id) {
    var resSearch;
    try {
        resSearch = await apiModel.searchPostWithId(id);
    } catch (e) {
        resSearch = JSON.parse('[]');
    }
    if (_.isEqual(resSearch, JSON.parse('[]')))
        return JSON.parse(
            '{' +
                '"code": 404,' +
                '"erreur": "not found",' +
                '"message": "post not found"' +
                '}'
        );

    console.log('delete post with id : ' + id);
    await apiModel.deletePost(id);
    return resSearch;
};

exports.getTimeline = async function (headers) {
    const user = await apiModel.getUserWithToken(headers.authorization);
    if (_.isEqual(user, JSON.parse('[]')))
        return JSON.parse(
            '{' +
                '"code": 401,' +
                '"erreur": "unauthorized",' +
                '"message": "oauth introuvable"' +
                '}'
        );
    const res = await apiModel.getTimeline(headers.authorization);
    return res;
};

exports.putReact = async function (headers, id, mood) {
    const token = headers.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return JSON.parse(
            '{' +
                '"code": 401,' +
                '"erreur": "unauthorized",' +
                '"message": "oauth introuvable"' +
                '}'
        );
    var react;
    try {
        react = await apiModel.selectReact(user[0]._id, id, mood);
    } catch (e) {
        return JSON.parse(
            '{' +
                '"code": 403,' +
                '"erreur": "impossible update react",' +
                '"message": "format du post_id incorrect"' +
                '}'
        );
    }
    if (!_.isEqual(react, JSON.parse('[]')))
        return JSON.parse(
            '{' +
                '"code": 400,' +
                '"erreur": "impossible React",' +
                '"message": "post introuvable ou react déja fait"' +
                '}'
        );
    const res = await apiModel.updateReact(user[0]._id, id, mood);
    return res;
};

exports.removeReact = async function (headers, id, mood) {
    const token = headers.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return JSON.parse(
            '{' +
                '"code": 401,' +
                '"erreur": "unauthorized",' +
                '"message": "oauth introuvable"' +
                '}'
        );
    try {
        const res = await apiModel.removeReact(user[0]._id, id, mood);
        return res;
    } catch (e) {
        return JSON.parse(
            '{' +
                '"code": 403,' +
                '"erreur": "not found",' +
                '"message": "format du post_id incorrect"' +
                '}'
        );
    }
};

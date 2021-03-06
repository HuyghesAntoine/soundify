const apiModel = require('../model/apiModel');
const spotifyRepository = require('../httpRepository/SpotifyRepository');
const _ = require('lodash');
const error = require('./errorBusiness');

const activeReactions = [
    'smile',
    'angry',
    'dizzy',
    'frown',
    'upsidedown',
    'heart',
    'wink',
    'sunglasses',
    'expresionless',
    'laughing',
];

exports.putPost = async function (data, query) {
    const token = query.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(
            401,
            "unauthorized",
            "oauth introuvable"
        );
    const res = await apiModel.insertPost(
        user[0]._id,
        data.content,
        data.gif,
        data.track
    );
    return res;
};

exports.getPost = async function (id) {
    let res = await apiModel.searchPostWithId(id);
    res = res[0].toObject();
    let user0 = await apiModel.getUserWithId(res.author);
    res.username = user0[0].username;
    coms = await apiModel.selectComments(id);
    res.comments = coms;
    for(let i = 0; i<res.comments.length; i++){
        res.comments[i] = res.comments[i].toObject();
        var user = await apiModel.getUserWithId(res.comments[i].author);
        res.comments[i].username = user[0].username;
    };
    let reactions = [];
    activeReactions.forEach((reaction) => {
        const count = res.reactions.filter(
            (react) => react.reaction == reaction
        ).length;
        userValue =
            res.reactions.filter(
                (react) => react.reaction == reaction && react.user == user0._id
            ).length === 1
                ? true
                : false;
        reactions.push({
            reaction: reaction,
            count: count,
            user: userValue,
        });
    });
    res.reactions = reactions;
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
        return error.errorReturn(
            404,
            "not found",
            "post not found"
        );

    console.log('delete post with id : ' + id);
    await apiModel.deletePost(id);
    return resSearch;
};

exports.getTimeline = async function (headers) {
    const user = await apiModel.getUserWithToken(headers.authorization);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(
            401,
            "unauthorized",
            "oauth introuvable"
        );
    const res = await apiModel.getTimeline(headers.authorization);
    for (let i = 0; i < res.length; i++) {
        res[i] = res[i].toObject()
        let reactions = [];
        activeReactions.forEach((reaction) => {
            const count = res[i].reactions.filter(
                (react) => react.reaction == reaction
            ).length;
            userValue =
                res[i].reactions.filter(
                    (react) => react.reaction == reaction && react.user == user[0]._id
                ).length === 1
                    ? true
                    : false;
            reactions.push({
                reaction: reaction,
                count: count,
                user: userValue,
            });
        });
        res[i].reactions = reactions;
        res[i].nb_comm = await apiModel.getNbCommsByPost(res[i]._id);
        console.log(res[i]._id)
    }
    console.log(res);
    return res;
};

exports.putReact = async function (headers, id, reaction) {
    const token = headers.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(
            401,
            "unauthorized",
            "oauth introuvable"
        );
    var react;
    try {
        react = await apiModel.selectReact(user[0]._id, id, reaction);
    } catch (e) {
        return error.errorReturn(
            403,
            "impossible update react",
            "format du post_id incorrect"
        );
    }
    if (!_.isEqual(react, JSON.parse('[]')))
        return error.errorReturn(
            400,
            "impossible React",
            "post introuvable ou react d??ja fait"
        );
    const res = await apiModel.updateReact(user[0]._id, id, reaction);
    return res;
};

exports.removeReact = async function (headers, id, reaction) {
    const token = headers.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(
            401,
            "unauthorized",
            "oauth introuvable"
        );
    try {
        const res = await apiModel.removeReact(user[0]._id, id, reaction);
        return res;
    } catch (e) {
        return error.errorReturn(
            403,
            "not found",
            "format du post_id incorrect"
        );
    }
};

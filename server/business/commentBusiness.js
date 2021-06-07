const apiModel = require('../model/apiModel');
const _ = require('lodash');
const error = require('./errorBusiness');

exports.putComment = async function (data, query) {
    const post = await apiModel.selectPost(data.post);
    console.log(post);
    if(_.isEqual(post, JSON.parse('[]')))
        return error.errorReturn(
            404,
            "not found",
            "post to comment not found"
        );
    const token = query.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(
            401,
            "unauthorized",
            "oauth introuvable"
        );
    const res = await apiModel.insertComment(
        user[0]._id,
        data.content,
        data.gif,
        data.post
    );
    return res;
};

exports.getComments = async function(post, query) {
    const token = query.authorization;
    const user = await apiModel.getUserWithToken(token);
    if (_.isEqual(user, JSON.parse('[]')))
        return error.errorReturn(
            401,
            "unauthorized",
            "oauth introuvable"
        );
    const res = await apiModel.selectComments(post);
    return res;
}
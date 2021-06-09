const commentBusiness = require('../business/commentBusiness');
const _ = require('lodash');

exports.putComment = async function(req, res) {
    const comment = await commentBusiness.putComment(req.body, req.headers);
    var error;
    if (comment.code) error = comment.error.code;
    else error = 200;
    res.status(error).send(comment);
    return res;
}

exports.getComments = async function(req, res) {
    const comment = await commentBusiness.getComments(req.params.post, req.headers);
    var error;
    if (comment.code) error = comment.error.code;
    else error = 200;
    res.status(error).send(comment);
    return res;
}

exports.putReaction = async function(req, res) {
    const react = await commentBusiness.putReact(req.params.id, req.params.reaction, req.headers);
    var error;
    if (react.code) error = react.error.code;
    else error = 200;
    res.status(error).send(react);
    return res;
}

exports.removeReaction = async function(req, res) {
    const react = await commentBusiness.removeReact(req.params.id, req.params.reaction, req.headers);
    var error;
    if (react.code) error = react.error.code;
    else error = 200;
    res.status(error).send(react);
    return res;
}
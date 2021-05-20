const postBusiness = require('../business/postBusiness');
const _ = require('lodash');

exports.putPost = async function (req, res) {
    const put = await postBusiness.putPost(req.body, req.headers);
    var error;
    if (put.code) error = put.error.code;
    else error = 200;
    res.status(error).send(put);
    return res;
};

exports.deletePost = async function (req, res) {
    const post = await postBusiness.deletePost(req.params.id);
    var error;
    if (post.code) error = post.error.code;
    else error = 200;
    res.status(error).send(post);
    return res;
};

exports.getPost = async function (req, res) {
    const post = await postBusiness.getPost(req.params.id);
    var error;
    if (post.code) error = post.error.code;
    else error = 200;
    res.status(error).send(post);
    return res;
};

exports.getTimeline = async function (req, res) {
    const get = await postBusiness.getTimeline(req.headers);
    var error;
    if (get.code) error = get.error.code;
    else error = 200;
    res.status(error).send(get);
    return res;
};

exports.putReact = async function (req, res) {
    const post = await postBusiness.putReact(
        req.headers,
        req.params.id,
        req.params.mood
    );
    var error;
    if (post.code) error = post.error.code;
    else error = 200;
    res.status(error).send(post);
    return res;
};

exports.deleteReact = async function (req, res) {
    const post = await postBusiness.removeReact(
        req.headers,
        req.params.id,
        req.params.mood
    );
    var error;
    if (post.code) error = post.error.code;
    else error = 200;
    res.status(error).send(post);
    return res;
};

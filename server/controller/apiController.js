const apiBusiness = require('../business/apiBusiness');
const _ = require('lodash');

exports.putUser = async function (req, res) {
    console.log(req.headers.authorization);
    res.status(201).send(
        await apiBusiness.createOrUpdateUser(
            req.headers.authorization.replace('Bearer ', '')
        )
    );
    return res;
};

exports.getUser = async function (req, res) {
    const post = await apiBusiness.getUser(req.params.mail);
    if (_.isEqual(post, JSON.parse('[]'))) res.status(404).send(post);
    else res.status(200).send(post);
    return res;
};

exports.putPost = async function (req, res) {
    res.status(201).send(
        await apiBusiness.putPost(req.body.content, req.headers)
    );
    return res;
};

exports.deletePost = async function (req, res) {
    const post = await apiBusiness.deletePost(req.params.id);
    if (_.isEqual(post, JSON.parse('[]'))) res.status(404).send(post);
    else res.status(200).send(post);
    return res;
};

exports.getAllUsers = async function (req, res) {
    res.status(201).send(await apiBusiness.getAllUsers());
    return res;
};

exports.getPost = async function (req, res) {
    const post = await apiBusiness.getPost(req.params.id);
    if (_.isEqual(post, JSON.parse('[]'))) res.status(404).send(post);
    else res.status(200).send(post);
    return res;
};

exports.addFollower = async function (req, res) {
    const update = await apiBusiness.addFollower(req.params.id, req.headers);
    if (_.isEqual(update, JSON.parse('[]'))) res.status(404).send(update);
    else res.status(200).send(update);
    return res;
};

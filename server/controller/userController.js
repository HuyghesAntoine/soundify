const userBusiness = require('../business/userBusiness');
const _ = require('lodash');

exports.putUser = async function (req, res) {
    console.log(req.headers.authorization);
    res.status(201).send(
        await userBusiness.createOrUpdateUser(
            req.headers.authorization.replace('Bearer ', '')
        )
    );
    return res;
};

exports.getUser = async function (req, res) {
    const post = await userBusiness.getUser(req.params.mail);
    var error;
    if(post.error) error = post.error.code;
    else error = 200;
    res.status(error).send(post);
    return res;
};

exports.getMe = async function (req, res) {
    const post = await userBusiness.getMe(req.headers.authorization);
    var error;
    if (post.code) error = post.error.code;
    else error = 200;
    res.status(error).send(post);
    return res;
};

exports.getAllUsers = async function (req, res) {
    res.status(201).send(await userBusiness.getAllUsers());
    return res;
};

exports.addFollower = async function (req, res) {
    const update = await userBusiness.addFollower(req.params.id, req.headers);
    var error;
    if (update.code) error = update.error.code;
    else error = 200;
    res.status(error).send(update);
    return res;
};

exports.removeFollower = async function (req, res) {
    const update = await userBusiness.removeFollower(
        req.params.id,
        req.headers
    );
    var error;
    if (update.code) error = update.error.code;
    else error = 200;
    res.status(error).send(update);
    return res;
};

exports.putBio = async function (req, res) {
    const update = await userBusiness.putBio(req.body.content, req.headers);
    var error;
    if (update.code) error = update.error.code;
    else error = 200;
    res.status(error).send(update);
    return res;
};

exports.searchUser = async function (req, res) {
    if (req.query.limit == null)
        res.status(201).send(
            await userBusiness.searchUser(req.query.query, 10)
        );
    else
        res.status(201).send(
            await userBusiness.searchUser(req.query.query, req.query.limit)
        );
    return res;
};

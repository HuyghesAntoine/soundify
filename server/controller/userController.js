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
    if (_.isEqual(post, JSON.parse('[]'))) res.status(404).send(post);
    else res.status(200).send(post);
    return res;
};

exports.getMe = async function (req, res) {
    const post = await userBusiness.getMe(req.headers.authorization);
    if (_.isEqual(post, JSON.parse('[]'))) res.status(404).send(post);
    else res.status(200).send(post);
    return res;
};

exports.getAllUsers = async function (req, res) {
    res.status(201).send(await userBusiness.getAllUsers());
    return res;
};

exports.addFollower = async function (req, res) {
    const update = await userBusiness.addFollower(req.params.id, req.headers);
    if (_.isEqual(update, JSON.parse('[]'))) res.status(404).send(update);
    else res.status(200).send(update);
    return res;
};

exports.putBio = async function (req, res) {
    const update = await userBusiness.putBio(req.body.content, req.headers);
    if (_.isEqual(update, JSON.parse('[]'))) res.status(404).send(update);
    else res.status(200).send(update);
    return res;
};

exports.searchUser = async function (req, res){
    if(req.query.limit == null)
        res.status(201).send( await userBusiness.searchUser( req.query.query, 10 ) );
    else
        res.status(201).send( await userBusiness.searchUser( req.query.query, req.query.limit ) );
    return res;
};
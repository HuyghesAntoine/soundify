const apiBusiness = require('../business/apiBusiness');

exports.putUser = async function (req, res){
    res.status(201).send(await apiBusiness.createOrUpdateUser(req.query)); 
    return res;
}

exports.getUser = async function (req, res){
    res.status(200).send(await apiBusiness.getUser(req.params.mail));
    return res;
}

exports.putPost = async function (req, res){
    res.status(201).send(await apiBusiness.putPost(req.params.content));
    return res;
}

exports.deletePost = async function (req, res){
    res.status(201).send(await apiBusiness.deletePost(req.params.id));
    return res;
}

exports.getAllUsers = async function (req, res){
    res.status(201).send(await apiBusiness.getAllUsers());
    return res;
}
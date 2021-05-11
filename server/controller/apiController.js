const apiBusiness = require('../business/apiBusiness');
const _ = require('lodash');

exports.putUser = async function (req, res){
    res.status(201).send(await apiBusiness.createOrUpdateUser(req.query)); 
    return res;
}

exports.getUser = async function (req, res){
    const post = await apiBusiness.getUser(req.params.mail);
    if( _.isEqual(post, JSON.parse('[]')) )
        res.status(404).send(post);
    else
        res.status(200).send(post);
    return res;
}

exports.putPost = async function (req, res){
    res.status(201).send(await apiBusiness.putPost(req.params.content));
    return res;
}

exports.deletePost = async function (req, res){
    const post = await apiBusiness.deletePost(req.params.id);
    if( _.isEqual(post, JSON.parse('[]')) )
        res.status(404).send(post);
    else
        res.status(200).send(post);
    return res;
}

exports.getAllUsers = async function (req, res){
    res.status(201).send(await apiBusiness.getAllUsers());
    return res;
}
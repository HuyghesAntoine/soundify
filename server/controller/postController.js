const postBusiness = require('../business/postBusiness');
const _ = require('lodash');


exports.putPost = async function (req, res) {
    res.status(201).send(
        await postBusiness.putPost(req.body.content, req.headers)
    );
    return res;
};

exports.deletePost = async function (req, res) {
    const post = await postBusiness.deletePost(req.params.id);
    if (_.isEqual(post, JSON.parse('[]'))) res.status(404).send(post);
    else res.status(200).send(post);
    return res;
};

exports.getPost = async function (req, res) {
    const post = await postBusiness.getPost(req.params.id);
    if (_.isEqual(post, JSON.parse('[]'))) res.status(404).send(post);
    else res.status(200).send(post);
    return res;
};

exports.getTimeline = async function (req, res){
    res.status(200).send( await postBusiness.getTimeline(req.params.id) );
    return res;
}
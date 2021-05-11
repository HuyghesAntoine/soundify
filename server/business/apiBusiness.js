const apiModel = require('../model/apiModel');
const spotifyRepository = require('../httpRepository/spotifyRepository');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const _ = require('lodash');

exports.test = function (req, res) {
    return apiModel.test();
};

exports.createOrUpdateUser = async function (oauth) {
    var mail = 'theodouble20@gmail.com';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://api.spotify.com/v1/browse/new-releases?access_token=' + oauth.access_token, false ); // false for synchronous request
    xmlHttp.send( null );
    /*if(JSON.parse(xmlHttp.responseText).error.status == 401)
        return JSON.parse('{"error": "oauth incorrect"}');
    else{*/
        if( _.isEqual(await apiModel.searchUser(mail), JSON.parse("[]")) ) //email probablement pas dans oauth
            return await apiModel.insertUser(oauth, mail);
        else
            return await apiModel.updateUser(oauth, mail);
    //}
}

exports.getUser = async function (mail){
    var user = await apiModel.searchUser(mail);
    if( _.isEqual(user, JSON.parse('[]')) )
        return JSON.parse('[]')
    user = user[0];
    console.log(user);
    user.oauth = 'HIDE';
    return user;
}

exports.putPost = async function(content) {
    const res = await apiModel.insertPost('théo', content); //changer le théo en oauth.username
    return res;
}

exports.getPost = async function(id) {
    const res = await apiModel.searchPostWithId(id);
    return res;
}

exports.deletePost = async function(id){
    const resSearch = await apiModel.searchPostWithId(id);
    if( _.isEqual(resSearch, JSON.parse('[]')) ){
        console.log("vide");
        return JSON.parse('[]');
    }else{
        console.log('delete post with id : ' + id);
        await apiModel.deletePost(id);
        return resSearch;
    }
}
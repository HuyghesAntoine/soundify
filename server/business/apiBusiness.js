const apiModel = require('../model/apiModel');
const spotifyRepository = require('../httpRepository/spotifyRepository');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const _ = require('lodash');
const { addFollower } = require('../controller/apiController');

exports.test = function (req, res) {
    return apiModel.test();
};

exports.createOrUpdateUser = async function (oauth) {
    var mail = 'theodouble21@gmail.com';
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

exports.getAllUsers = async function (){
    var users = await apiModel.searchAllUsers();
    return users;
}

exports.addFollower = async function(id){
    const res = await apiModel.getFollower('609a50ecba695a14ac60f6c2', id);
    if( _.isEqual(res, JSON.parse('[]')) ){    
        const update = await apiModel.addFollower('609a50ecba695a14ac60f6c2', id);
        return update;
    }
    return res;
}

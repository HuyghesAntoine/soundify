const apiModel = require('../model/apiModel');
const spotifyRepository = require('../httpRepository/spotifyRepository');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const _ = require('lodash');

exports.test = function (req, res) {
    return apiModel.test();
};

exports.createOrUpdateUser = async function (oauth) {
    var mail = 'theodouble0@gmail.com';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://api.spotify.com/v1/browse/new-releases?access_token=' + oauth.access_token, false ); // false for synchronous request
    xmlHttp.send( null );
    /*if(JSON.parse(xmlHttp.responseText).error.status == 401)
        return JSON.parse('{"error": "oauth incorrect"}');
    else{*/
        if( _.isEqual(await apiModel.search(mail), JSON.parse("[]")) ) //email probablement pas dans oauth
            return await apiModel.insertUser(oauth, mail);
        else
            return await apiModel.updateUser(oauth, mail);
    //}
}
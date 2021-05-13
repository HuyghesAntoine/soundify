const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

exports.getUser = function (token) {    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(
        'GET',
        'https://api.spotify.com/v1/me?access_token=' + token,
        false
    ); // false for synchronous request
    xmlHttp.send(null);
    const res = JSON.parse(xmlHttp.responseText);
    return res;
};
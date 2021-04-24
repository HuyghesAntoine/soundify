const apiBusiness = require('../business/apiBusiness');

exports.putUser = async function (req, res){
    res.send(await apiBusiness.createOrUpdateUser(req.query)); 
    return res;
}
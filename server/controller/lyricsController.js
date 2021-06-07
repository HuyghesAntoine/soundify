const userBusiness = require('../business/userBusiness');
const ftl = require("findthelyrics");

exports.getLyric = async function (req, res) {
    ftl.find(req.params.query ,function(err, resp) {
        if (!err) {
            res.status(200).send(resp.replaceAll('\n','<br>'))
        } else {
            console.log(err)
        }
    });
};

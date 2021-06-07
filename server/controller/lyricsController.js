const userBusiness = require('../business/userBusiness');
const ftl = require("findthelyrics");

exports.getLyric = async function (req, res) {
    ftl.find(req.params.query ,function(err, resp) {
        if (!err) {
            console.log(resp);
            res.status(200).send(resp.replace(/\n/g,'<br>'))
        } else {
            console.log(err)
        }
    });
};

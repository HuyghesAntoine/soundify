const apiBusiness = require('../business/apiBusiness');

exports.test = function (req, res) {
    var tmp = apiBusiness.test();
    console.log(tmp)
    return res.json(tmp);
};

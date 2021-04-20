const apiModel = require('../model/apiModel');

exports.test = function (req, res) {
    return apiModel.test();
};
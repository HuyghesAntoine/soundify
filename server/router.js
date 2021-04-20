var express = require('express');
var router = express.Router();

const apiController = require('./controller/apiController');


/* API */
router.get('/api/test', apiController.test);

module.exports = router;

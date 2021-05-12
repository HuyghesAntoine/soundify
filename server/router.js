var express = require('express');
var router = express.Router();

const apiController = require('./controller/apiController');


/* API */
router.put('/api/hello', apiController.putUser); //méthode appelé lors de la connexion
router.get('/api/user/:mail', apiController.getUser); //get information of user id
router.get('/api/users', apiController.getAllUsers);

router.put('/api/addFollower/:id', apiController.addFollower);
/*
router.get('/api/timeline', apiController.getTimeline);
*/
router.put('/api/post', apiController.putPost); 
router.delete('/api/post/:id', apiController.deletePost);

router.get('/api/post/get/:id', apiController.getPost);



module.exports = router;

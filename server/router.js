var express = require('express');
var router = express.Router();

const userController = require('./controller/userController');
const postController = require('./controller/postController');

// API - USER
router.put('/api/hello', userController.putUser); //méthode appelé lors de la connexion
router.get('/api/user/search', userController.searchUser);
router.get('/api/user/:mail', userController.getUser); //get information of user id
router.get('/api/me', userController.getMe);
router.get('/api/users', userController.getAllUsers);
router.put('/api/user/bio', userController.putBio);
router.put('/api/follow/:id', userController.addFollower);
router.put('/api/unfollow/:id', userController.removeFollower);

// API - POST
router.put('/api/post', postController.putPost);
router.delete('/api/post/:id', postController.deletePost);
router.get('/api/post/get/:id', postController.getPost);
//router.get('/api/timeline', apiController.getTimeline);

module.exports = router;

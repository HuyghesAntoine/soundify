var express = require('express');
var router = express.Router();

const userController = require('./controller/userController');
const postController = require('./controller/postController');
const lyricsController = require('./controller/lyricsController');

// API - USER
router.put('/api/hello', userController.putUser); //méthode appelé lors de la connexion
router.get('/api/user/search', userController.searchUser);
router.get('/api/user/:mail', userController.getUser); //get information of user id
router.get('/api/me', userController.getMe);
router.get('/api/users', userController.getAllUsers);
router.put('/api/user/bio', userController.putBio);
router.put('/api/follow/:id', userController.addFollower);
router.put('/api/unfollow/:id', userController.removeFollower);
router.get('/api/user/:id/follow', userController.getFollow);
router.get('/api/user/:id/follower', userController.getFollower)

// API - POST
router.post('/api/post', postController.putPost); //changer en post
router.delete('/api/post/:id', postController.deletePost);
router.get('/api/post/get/:id', postController.getPost);
router.get('/api/timeline', postController.getTimeline); //get timeline from :id
router.put('/api/post/:id/react/:mood', postController.putReact); //create /update reaction on post(:id)
router.delete('/api/post/:id/react/:mood', postController.deleteReact); //create /update reaction on post(:id)

// API - LYRICS
router.get('/api/lyrics/:query', lyricsController.getLyric)

module.exports = router;

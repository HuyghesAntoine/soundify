var express = require('express');
var router = express.Router();

const userController = require('./controller/userController');
const postController = require('./controller/postController');
const commentController = require('./controller/commentController');
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
router.get('/api/user/:id/follower', userController.getFollower);
router.get('/api/user/profil/:id', userController.getProfil);

// API - POST
router.post('/api/post', postController.putPost); //changer en post
router.delete('/api/post/:id', postController.deletePost);
router.get('/api/post/:id', postController.getPost);
router.get('/api/timeline', postController.getTimeline); //get timeline from :id
router.put('/api/post/:id/react/:reaction', postController.putReact); //create /update reaction on post(:id)
router.delete('/api/post/:id/react/:reaction', postController.deleteReact); //create /update reaction on post(:id)

// API - COMMENT
router.post('/api/comment', commentController.putComment);
router.get('/api/comment/:post', commentController.getComments);
router.put('/api/comment/:id/react/:reaction', commentController.putReaction);
router.delete('/api/comment/:id/react/:reaction', commentController.removeReaction);

// API - LYRICS
router.get('/api/lyrics/:query', lyricsController.getLyric)

module.exports = router;

const apiModel = require('../model/apiModel');
const mongoose = require('mongoose');
const User = require('./userModel');
const Post = require('./postModel');
const { debounce } = require('lodash');
require('dotenv/config');

mongoose.connect(
    process.env.DB_url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('db is connected !!!');
    }
);

exports.getUserWithId = async function (id) {
    try {
        const find = await User.find({ _id: id });
        return find;
    } catch (err) {}
    return JSON.parse('[]');
};

exports.getUser = async function (mail) {
    const find = await User.find(
        { email: mail },
        {
            oauth: 0,
            email: 0,
        }
    );
    return find;
};

exports.getUserWithToken = async function (token) {
    const find = await User.find({ oauth: token });
    return find;
};

exports.insertUser = async function (oauth, token) {
    console.log('insert user ');
    const user = new User({
        username: oauth.display_name,
        email: oauth.email,
        bio: ' ',
        oauth: token,
    });
    try {
        const newUser = await user.save();
        return newUser;
    } catch (err) {
        console.log(err);
        return JSON.parse('{"err": "' + err + '"}');
    }
};

exports.updateUser = async function (oauth, token) {
    const update = await User.updateOne(
        { email: oauth.email },
        { $set: { oauth: token } }
    );
    return update;
};

exports.insertPost = async function (username, cont, gif, track) {
    const post = new Post({
        author: username,
        content: cont,
        gif: gif,
        track: track,
        date: Date.now(),
    });
    try {
        const newPost = await post.save();
        return newPost;
    } catch (err) {
        console.log(err);
        return JSON.parse('{"err": "' + err + '"}');
    }
};

exports.deletePost = async function (id) {
    const post = new Post({
        _id: id,
    });
    try {
        const res = post.delete();
        return res;
    } catch (err) {
        console.log(err);
        return JSON.parse('{"err": "' + err + '"}');
    }
};

exports.searchPostWithId = async function (id) {
    const find = await Post.find(JSON.parse('{"_id": "' + id + '"}'));
    return find;
};

exports.searchAllUsers = async function (mail) {
    const find = await User.find();
    return find;
};

exports.addFollower = async function (token, id) {
    const update = await User.updateOne(
        { oauth: token },
        { $push: { follow: id } }
    );
    return update;
};

exports.removeFollower = async function (token, id) {
    const update = await User.updateOne(
        { oauth: token },
        { $pull: { follow: id } }
    );
    return update;
};

exports.getFollower = async function (token, id) {
    const find = await User.find({ oauth: token, follow: id });
    return find;
};

exports.updateUsersBio = async function (id, content) {
    const update = await User.updateOne(
        { _id: id },
        { $set: { bio: content } }
    );
    return update;
};

exports.searchUser = async function (query, limit) {
    var find = await User.find(
        {
            username: { $regex: query, $options: 'i' },
        },
        {
            oauth: 0,
            email: 0,
        }
    ).limit(parseInt(limit));
    return find;
};

exports.getTimeline = async function (id) {
    var res = await User.find(
        {
            oauth: id,
        },
        {
            _id: 1,
            follow: 1,
        }
    );
    var followers = res[0].follow;
    followers.push(res[0]._id);
    console.log(followers);
    var res = await Post.find({
        author: followers,
    }).sort({
        date: -1,
    });
    for (i in res) {
        res[i].author = (
            await apiModel.getUserWithId(res[i].author)
        )[0].username;
    }

    return res;
};

exports.updateReact = async function (id, id_post, mood) {
    const update = await Post.updateOne(
        { _id: id_post },
        {
            $push: {
                reactions: {
                    mood: mood,
                    user: id,
                },
            },
        }
    );
    return update;
};

exports.selectReact = async function (id, id_post, mood) {
    const select = await Post.find({
        _id: id_post,
        reactions: {
            $elemMatch: {
                mood: mood,
                user: id,
            },
        },
    });
    return select;
};

exports.removeReact = async function (id, id_post, mood) {
    const remove = await Post.update(
        { _id: id_post },
        {
            $pull: {
                reactions: {
                    mood: mood,
                    user: id,
                },
            },
        }
    );
    return remove;
};

exports.getFollow = async function (id) {
    var get = await User.find(
        {
            _id: id
        },
        {
            follow: 1,
            _id: 0
        }
    );
    return get;
}

exports.getFollowed = async function (id) {
    var get = await User.find(
        {
            follow: id
        },
        {
            username: 1,
            _id: 0
        }
    );
    return get;
}
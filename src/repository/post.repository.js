const ObjectId = require('mongoose').Types.ObjectId;
const Post = require('../models/post.model');

// callback: function(err, data) {}
exports.create = (data, callback) => {
    const post = new Post({
        // categoryId: new ObjectId(data.categoryId),
        title: data.title,
        url: data.url
    });

    post.save((err, postData) => {
        if (err) {
            console.log(err || 'Unable to save post.');
            callback(err);
            return;
        }
        //TODO search category and add this post as child

        console.log('Post saved successfully.')
        callback(null, postData);
    });
};
const mongoose = require('mongoose');
const Post = require('../models/post.model');
const Category = require('../models/category.model');

exports.create = (data, callback) => {
    const today = new Date().toUTCString();
    const post = new Post({
        _id: mongoose.Types.ObjectId(),
        categoryId: data.categoryId,
        title: data.title,
        url: data.url,
        createdAt: today,
        modifiedAt: today
    });

    post.save((err, postData) => {
        if (err) {
            console.log(err || 'Unable to save post.');
            callback(err);
            return;
        }

        if (data.categoryId) {
            Category.findById({ _id: data.categoryId }, (err, doc) => {
                if (err) {
                    console.log('Error getting Category: ' + data.categoryId);
                    callback(err);
                    return;
                }
                doc.posts.push(post._id);
                doc.save((err, document) => { if (err) { callback(err); return; } });
                console.log('Post saved successfully.');
                callback(null, postData);
            });
        } else {
            console.log('Post Category empty.')
            callback({ message: 'Post Category empty.' });
        }
    });
};
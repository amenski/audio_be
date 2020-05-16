const fs = require('fs');
const mongoose = require('mongoose');
const Post = require('../models/post.model');
const Constants = require('../config/constants');
const Category = require('../models/category.model');

exports.create = (data, callback) => {
    const today = new Date().toUTCString();
    const post = new Post({
        _id: mongoose.Types.ObjectId(),
        categoryId: data.categoryId,
        title: data.title,
        url: data.url,
        donationUrl: data.donationUrl,
        createdAt: today,
        modifiedAt: today
    });

    post.save((err, postData) => {
        if (err) {
            console.log(err || 'Unable to save post.');
            return callback(err);
        }

        if (data.categoryId) {
            Category.findById({ _id: data.categoryId }, (err, doc) => {
                if (err) {
                    console.log('Error getting Category: ' + data.categoryId);
                    return callback(err);
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

//get post by id
exports.get = (id, callback) => {
    Post.findById({ _id: id }, function (err, document) {
        if (err) {
            console.log(err || 'Unable to fetch data.');
            return callback(err);
        }
        callback(null, document);
    });
};

exports.upload = (data, callback) => {
    Post.findById({_id: data.id}, function(err, doc) {
        if(err) {
            console.log(err || 'Post not found.');
            return callback(err);
        }
        //update or send back an error
        doc.url = buildFileName({title: doc.title, originalName: data.file.originalname});
        doc.save((err, prod) => {
            if(err) {
                return callback(err);
            }
            //process file before exit
            fs.writeFile(Constants.UPLOAD_FOLDER + prod.url, data.file.buffer, (err) => {
                if(err) {
                    return callback(err);
                }
                //success
                callback(null, {message: 'Post updated.'});
            });
        });
    });
};

function buildFileName(body) {
    return body.title + ' ' + body.originalName + '.mp3';
}
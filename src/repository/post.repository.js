const fs = require('fs');
const mongoose = require('mongoose');
const Post = require('../models/post.model');
const Constants = require('../config/constants');
const Category = require('../models/category.model');
const Version = require('../models/version.sync.model');
const VersionRepository = require('../repository/version.sync.repository');

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
                if(err) return callbackIfWithError(err, callback, 'Error getting Category: ' + data.categoryId);
                
                //if category has subCategory, dont save
                if(doc.subCategories.length > 0) {
                    const message = 'Can\'t save post and subCategories together';
                    console.log(message);
                    return callback(message);
                }
                doc.posts.push(post._id);
                doc.save((err, document) => { if (err) { callback(err); return; } });

                 //version update
                 VersionRepository.getLastVersion((err, versionNumber) => {
                     if(err) return callbackIfWithError(err, callback, 'Unable to save data.');
                    let version = new Version({
                        _id: mongoose.Types.ObjectId(),
                        version: versionNumber + 1,
                        type: Constants.ENTITY_TYPE.post
                    });
                     version.save((err, verDoc) => { if (err) return callbackIfWithError(err, callback, 'Error saving version info.'); });
                });

                console.log('Post saved successfully.');
                callback(null, postData);
            });
        } else {
            console.log('Post Category empty.');
            callback({ message: 'Post Category empty.' });
        }
    });
};

//get post by id
exports.get = (id, callback) => {
    Post.findById({ _id: id }, function (err, document) {
        if(err) return callbackIfWithError(err, callback, 'Unable to fetch data.');
        callback(null, document);
    });
};

exports.upload = (data, callback) => {
    Post.findById({_id: data.id}, function(err, doc) {
        if(err) return callbackIfWithError(err, callback, 'Post not found.');
        
        //update or send back an error
        doc.url = buildFileName({title: doc.title, originalName: data.file.originalname});
        doc.save((err, prod) => {
            if(err) {
                return callback(err);
            }
            //process file before exit
            fs.writeFile(Constants.UPLOAD_FOLDER + prod.url, data.file.buffer, (err) => {
                if(err) return callbackIfWithError(err, callback,'');

                //success
                callback(null, {message: 'Post updated.'});
            });
        });
    });
};

//get posts after specified date
exports.getAllAfterDate = (date, callback) => {
    let afterDate = new Date(date);
    Post.find({ "createdAt": { $gt: afterDate } })
        .exec(function (err, category) {
            if(err) return callbackIfWithError(err, callback, 'Unable to get data After date' + date);
            callback(null, category);
        });
};

function buildFileName(body) {
    return body.title + ' ' + body.originalName + '.mp3';
}

function callbackIfWithError(err, callback, msg) {
    console.log(msg || err);
    return callback(err);
}
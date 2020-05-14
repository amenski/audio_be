const Category = require('../models/category.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.create = (data, callback) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        title: data.title,
        url: data.url,
        description: data.description,
        // parentCategoryId: ,
        thumbUrl: data.thumbUrl,
    });

    category.save((err, postData) => {
        if (err) {
            console.log(err || 'Unable to save category.');
            callback(err);
            return;
        }
        //search category and add this as child
        if (data.parentCategoryId) {
            Category.findById({ _id: data.parentCategoryId }, function (err, catObj) {
                if (err) callback(err);
                catObj.subCategories.push(category._id);
                catObj.save();
            });
        }

        console.log('Category saved successfully.')
        callback(null, postData);
    });
};

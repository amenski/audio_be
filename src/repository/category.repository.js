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

    category.save((err, product) => {
        if (err) {
            console.log(err || 'Unable to save category.');
            callback(err);
            return;
        }
        //search parent category and add this as child
        if (data.parentCategoryId) {
            Category.findById({ _id: data.parentCategoryId }, function (err, catObj) {
                if (err) {
                    console.log('Unable to save.');
                    callback(err);
                    return;
                }
                catObj.subCategories.push(product._id);
                catObj.save();

                console.log('Category saved successfully.')
                callback(null, product);
            });
        } else {
            console.log('Category saved successfully.')
            callback(null, product);
        }
    });
};

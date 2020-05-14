const Category = require('../models/category.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.create = (data, callback) => {
    const today = new Date().toUTCString();
    const category = new Category({
        _id: mongoose.Types.ObjectId(),
        title: data.title,
        url: data.url,
        description: data.description,
        parentCategoryId: data.parentCategoryId,
        thumbUrl: data.thumbUrl,
        createdAt: today,
        modifiedAt: today
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
                catObj.save((err, doc) => { if (err) { callback(err); return; } });
                console.log('Category saved successfully.')
                callback(null, product);
            });
        } else {
            console.log('Category saved successfully.')
            callback(null, product);
        }
    });
};

//get category by id
exports.get = (id, callback) => {
    Category.findById({ _id: id })
        .populate('subCategories')
        .exec(function (err, category) {
            if (err) {
                console.log('Unable to fetch data.');
                callback(err);
                return;
            }
            callback(null, category);
        });
};

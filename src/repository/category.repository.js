const Category = require('../models/category.model');
const { mongoose } = require('../config');

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
            return callback(err);
        }
        //search parent category and add this as child
        if (data.parentCategoryId) {
            Category.findById({ _id: data.parentCategoryId }, function (err, catObj) {
                if (err) {
                    console.log('Unable to save.');
                    return callback(err);
                }
                //if category has posts, dont save
                if(catObj.posts.length > 0) {
                    const message = 'Can\'t save post and subCategories together';
                    console.log(message);
                    return callback(message);
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
        .deepPopulate([
            'subCategories',
            'subCategories.subCategories',
            'subCategories.subCategories.subCategories',
            'subCategories.subCategories.subCategories.subCategories',
            'posts',
            'subCategories.posts',
            'subCategories.subCategories.posts',
            'subCategories.subCategories.subCategories.posts',
            'subCategories.subCategories.subCategories.subCategories.posts',
        ])
        .exec(function (err, category) {
            if (err) {
                console.log('Unable to fetch data.');
                return callback(err);
            }
            callback(null, category);
        });
};

//get all parent category
exports.getAllPrents = (callback) => {
    Category.find({ "parentCategoryId": null })
        .deepPopulate([
            'subCategories',
            'subCategories.subCategories',
            'subCategories.subCategories.subCategories',
            'subCategories.subCategories.subCategories.subCategories',
            'posts',
            'subCategories.posts',
            'subCategories.subCategories.posts',
            'subCategories.subCategories.subCategories.posts',
            'subCategories.subCategories.subCategories.subCategories.posts',
        ])
        .exec(function (err, category) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, category);
        });
};

//get category after specified date
// deepPopulate plugin is used to not put very long `populate`, which it uses intenally
exports.getAllAfterDate = (date, callback) => {
    let afterDate = new Date(date);
    Category.find({ "createdAt": { $gt: afterDate } })
        .deepPopulate([
            'subCategories',
            'subCategories.subCategories',
            'subCategories.subCategories.subCategories',
            'subCategories.subCategories.subCategories.subCategories',
            'posts',
            'subCategories.posts',
            'subCategories.subCategories.posts',
            'subCategories.subCategories.subCategories.posts',
            'subCategories.subCategories.subCategories.subCategories.posts',
        ])
        .exec(function (err, category) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, category);
        });
};
const { mongoose } = require('../config');
const Constants = require('../config/constants');
const Category = require('../models/category.model');
const Version = require('../models/version.sync.model');
const VersionRepository = require('../repository/version.sync.repository');

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
        if(err) return callbackIfWithError(err, callback, 'Unable to save category.');
        
        //search parent category and add this as child
        if (data.parentCategoryId) {
            Category.findById({ _id: data.parentCategoryId }, function (err, catObj) {
                if(err) return callbackIfWithError(err, callback, 'Unable to save.');
                //if category has posts, dont save
                if(catObj.posts.length > 0) {
                    return callbackIfWithError(err, callback, 'Can\'t save post and subCategories, category can have only one of the two.');
                }

                catObj.subCategories.push(product._id);
                catObj.save((err, doc) => { if (err) { callback(err); return; } });
                //version update
                updateVersion(callback, product);
            });
        } else {
            //version update
            updateVersion(callback, product);
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
            if(err) return callbackIfWithError(err, callback, 'Unable to fetch data.');
            callback(null, category);
        });
};

//get all categories
exports.getAll = (callback) => {
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
            if(err) return callbackIfWithError(err, callback, 'Unable to get data.');
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
            if(err) return callbackIfWithError(err, callback, 'Unable to get data After date' + date);
            callback(null, category);
        });
};

function updateVersion(callback, product) {
    //version update
    VersionRepository.getLastVersion((err, versionNumber) => {
        if (err) return callbackIfWithError(err, callback, 'Unable to get version info.');

        let version = new Version({
            _id: mongoose.Types.ObjectId(),
            object_id: product._id,
            version: versionNumber + 1,
            type: Constants.ENTITY_TYPE.category
        });
        version.save((err, verDoc) => {
            if (err) return callbackIfWithError(err, callback, 'Error saving version info.');
            console.log("category.repository()" + 'Category saved successfully.');
            callback(null, product);
        });
    });
}

function callbackIfWithError(err, callback, msg) {
    console.log("callbackIfWithError()" + msg);
    return callback(err);
}
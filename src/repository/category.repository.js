const Category = require('../models/category.model');

exports.create = (data, callback) => {
    const category = new Category({
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
        Category.findById({_id: data.parentCategoryId}, function(err, catObj) {
            if(err) callback(err);
            console.log(catObj._id);
            category.parentCategoryId = catObj._id;
        });

        console.log('Category saved successfully.')
        callback(null, postData);
    });
};

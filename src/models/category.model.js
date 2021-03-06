const { mongoose } = require('../config');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: {type: Schema.Types.ObjectId},
    title: String,
    description: String,
    parentCategoryId: Schema.Types.ObjectId,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    subCategories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    thumbUrl: String,
    createdAt: Date,
    modifiedAt: { type: Date, default: Date.now() }
}, {versionKey: false});

categorySchema.plugin(deepPopulate); //register plugin

module.exports = mongoose.model('Category', categorySchema);
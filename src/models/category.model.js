const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: {type: Schema.Types.ObjectId},
    title: String,
    description: String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    subCategories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    thumbUrl: String,
    createdAt: Date,
    modifiedAt: { type: Date, default: Date.now() }
}, {versionKey: false});

module.exports = mongoose.model('Category', categorySchema);
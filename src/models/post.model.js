const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    title: String,
    url: String,
    thumbUrl: String,
    description: String,
    downloadPath: String,
    isDownloaded: { type: Boolean, default: false },
    isOpened: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId },
    createdAt: Date,
    modifiedAt: { type: Date, default: Date.now() }
}, { versionKey: false });

module.exports = mongoose.model('Post', postSchema);
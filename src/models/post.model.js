const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: String,
    url: String,
    thumbUrl: String,
    description: String,
    downloadPath: String,
    isDownloaded: Boolean,
    isOpened: Boolean,
    createdAt: Date,
    modifiedAt: { type: Date, default: Date.now() }
}, {versionKey: false});

module.exports = mongoose.model('Post', postSchema);
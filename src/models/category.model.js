const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
    title: String,
    description: String,
    children: {type: Array, default: []},
    thumbUrl: String,
    createdAt: Date,
    modifiedAt: { type: Date, default: Date.now() }
}, {versionKey: false});

module.exports = mongoose.model('Category', categorySchema);
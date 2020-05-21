const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const today = new Date().toUTCString();
const versionSyncSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    version: Number,
    type: String,
    createdAt: { type: Date, default: Date.now(), default: today },
    modifiedAt: { type: Date, default: Date.now(), default: today }
}, { versionKey: false });

module.exports = mongoose.model('Version', versionSyncSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const versionSyncSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    version: Number,
    type: String,
    createdAt: { type: Date },
    modifiedAt: { type: Date, default: new Date().toUTCString() }
}, { versionKey: false });

module.exports = mongoose.model('Version', versionSyncSchema);
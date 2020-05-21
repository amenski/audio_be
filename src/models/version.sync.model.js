const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const versionSyncSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    version: Number,
    modifiedAt: { type: Date, default: Date.now() }
}, { versionKey: false });

module.exports = mongoose.model('Version', versionSyncSchema);
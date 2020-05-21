const VersionSync = require('../models/version.sync.model');

//get version info by id
exports.get = (id, callback) => {
    VersionSync.findById({ _id: id }, function (err, document) {
        if(err) return callbackIfWithError(err, callback, 'Unable to fetch data.');
        callback(null, document);
    });
};

//get latest version
exports.getLastVersion = (callback) => {
    VersionSync.find({}, function (err, docsList) {
        if(err) return callbackIfWithError(err, callback, 'Unable to fetch data.');
        const versions = docsList.map(val => val.version); 
        callback(null, Math.max(...versions));
    });
};

function callbackIfWithError(err, callback, msg) {
    console.log(msg);
    return callback(err);
}
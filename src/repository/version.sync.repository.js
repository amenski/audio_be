const VersionSync = require('../models/version.sync.model');

//get version info by id
exports.get = (version, callback) => {
    VersionSync.find({ "version": version }, function (err, document) {
        if(err) return callbackIfWithError(err, callback, 'Unable to fetch data for version: ' + version);
        callback(null, document[0]);
    });
};

//get latest version
exports.getLastVersion = (callback) => {
    VersionSync.find({}, function (err, docsList) {
        if(err) return callbackIfWithError(err, callback, 'Unable to fetch data.');
        let versions = docsList.map(val => val.version);
        //first time starting, version=0
        if(versions.length < 1)  versions = [0]; 
        let version = Math.max(...versions);
        callback(null, {version});
    });
};

function callbackIfWithError(err, callback, msg) {
    console.log("version.sync.repository.callbackIfWithError()" + msg);
    return callback(err);
}
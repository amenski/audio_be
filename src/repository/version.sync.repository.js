const VersionSync = require('../models/version.sync.model');

//get version info by id
exports.get = (version, callback) => {
    VersionSync.find({ "version": version }, function (err, document) {
        if(err) return callbackIfWithError(err, callback, 'getVersion(): Unable to fetch data for version: ' + version);
        callback(null, document[0]);
    });
};

//get latest version
exports.getLastVersion = (callback) => {
    VersionSync.find({}, function (err, docsList) {
        if(err) return callbackIfWithError(err, callback, 'getLastVersion(): Unable to fetch data.');
        let versions = docsList.map(val => val.version);
        //first time starting, version=0
        if(versions.length < 1)  versions = [0]; 
        callback(null, Math.max(...versions));
    });
};

function callbackIfWithError(err, callback, msg) {
    console.log(msg);
    return callback(err);
}
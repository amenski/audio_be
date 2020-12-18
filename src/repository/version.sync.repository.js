const VersionSync = require('../models/version.sync.model');

//get version info by id
exports.get = (version, callback) => {
    VersionSync.find({ "version": version }, function (err, document) {
        if(err) return callbackIfWithError(err, callback, 'Unable to fetch data for version: ' + version);
        callback(null, document[0]);
    });
};

//get latest version
exports.getLastVersion = (currentVersion, callback) => {
    VersionSync.find({}, function (err, docsList) {
        if(err) return callbackIfWithError(err, callback, 'Unable to fetch data.');
        let versions = docsList.map(val => val.version);
        //first run, version=0
        if(versions.length < 1)  versions = [0]; 
        let sorted = [...versions].sort((a, b) => a - b);
        
        let index = sorted.indexOf(currentVersion);
        if(currentVersion == 0 || (index < sorted.length && index != -1)) { //currentVersion=0 for first installers
            currentVersion = sorted[index + 1];
        }
        callback(null, {nextVersion: currentVersion});
    });
};

function callbackIfWithError(err, callback, msg) {
    console.log("version.sync.repository.callbackIfWithError()" + msg);
    return callback(err);
}
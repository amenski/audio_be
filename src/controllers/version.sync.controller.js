const VersionRepository = require('../repository/version.sync.repository');

exports.get = (req, res) => {
    const version = req.params.version;
    if (!version) return res.status(400).json({ message: "Version id can not be empty." });

    VersionRepository.get(version, function (err, data) {
        if (err) {
            res.status(500);
            res.json({ message: 'Unable to fetch data.' });
            return;
        }
        res.status(200).json(data);
    });
};

//GET - Latest version
exports.getLastVersion = (req, res) => {
    VersionRepository.getLastVersion(function (err, data) {
        if (err) {
            res.status(500);
            res.json({ message: 'Unable to fetch data.' });
            return;
        }
        res.status(200).json(data);
    });
};
const VersionRepository = require('../repository/version.sync.repository');

exports.get = (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).send({ message: "Version id can not be empty." });

    VersionRepository.get(id, function (err, data) {
        if (err) {
            res.status(500);
            res.send({ message: 'Unable to fetch data.' });
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
            res.send({ message: 'Unable to fetch data.' });
            return;
        }
        res.status(200).json(data);
    });
};
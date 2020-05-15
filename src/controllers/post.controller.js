const PostRepository = require('../repository/post.repository');
const FileUpload = require('../config').fileUpload;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.url || !req.body.categoryId) {
        res.status(400).send({
            message: "Invalid input, please try again!"
        });
        return;
    }

    const post = {
        title: req.body.title,
        url: req.body.url,
        categoryId: req.body.categoryId
    };

    PostRepository.create(post, function (err, post) {
        if (err) {
            res.status(500);
            res.send({ message: 'Unable to save.' });
            return;
        }
        res.status(201).json({ postId: post._id });
    });
};

exports.get = (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).send({ message: "Post id can not be empty." });

    PostRepository.get(id, function (err, data) {
        if (err) {
            res.status(500);
            res.send({ message: 'Unable to fetch data.' });
            return;
        }
        res.status(201).json(data);
    });
};

// multer lib is express middleware to help upload files, so (req, res, next)
exports.upload = (req, res) => {
    const id = req.params.id;
    const file = req.file;
    console.log(file);
    if (!file) {
        res.status(400);
        res.send({ message: 'Please upload a file' });
        return;
    }
    if (!id) return res.status(400).send({ message: "Post id can not be empty." });

    const data = {
        id: id,
        file: file
    };

    PostRepository.upload(data, function (err, data) {
        if (err) {
            res.status(500);
            res.send({ message: err || 'Unable to upload.' });
            return;
        }
        res.status(201).send(data);
    });
};

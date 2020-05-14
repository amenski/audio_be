const PostRepository = require('../repository/post.repository');


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

    PostRepository.create(post, function(err, post) {
        if(err) {
            res.status(500);
            res.send({message: err || 'Unable to save.'});
            return;
        }
        res.status(201).json({postId: post._id});
    });
};

// exports.findByid = (req, res) => {
//     const id = req.params.id;
//     if (!id) {
//         res.status(400).send({
//             message: "Post id can not be empty."
//         });
//     }

//     Post.findByPk(id)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || 'Internal server error.'
//             });
//         });
// };


const CategoryRepository = require('../repository/category.repository');


exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Invalid input, title can not be empty!"
        });
        return;
    }

    const cat = {
        title: req.body.title,
        description: req.body.description,
        parentCategoryId: req.body.parentCategoryId,
        thumbUrl: req.body.thumbUrl,
    };

    CategoryRepository.create(cat, function (err, cat) {
        if (err) {
            res.status(500);
            res.send({ message: err || 'Unable to save.' });
            return;
        }
        res.status(201).json({ categoryId: cat._id });
    });
};

// /category/:id
exports.get = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: "Id can not be empty."
        });
    }

    CategoryRepository.get(id, function (err, data) {
        if (err) {
            res.status(500);
            res.send({ message: err || 'Unable to fetch data.' });
            return;
        }
        res.status(201).json(data);
    });
};


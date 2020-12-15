const CategoryRepository = require('../repository/category.repository');


exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).json({
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
            res.json({ message: 'Unable to save.' });
            return;
        }
        res.status(201).json({ categoryId: cat._id });
    });
};

// /category/:id
exports.get = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            message: "Id can not be empty."
        });
    }

    CategoryRepository.get(id, function (err, data) {
        if (err) {
            res.status(500);
            res.json({ message: err || 'Unable to fetch data.' });
            return;
        }
        res.status(200).json(data);
    });
};

// GET - /category - Get all categories and their children
exports.getAll = (req, res) => {
    CategoryRepository.getAll(function (err, data) {
        if (err) {
            res.status(500);
            res.json({ message: err || 'Unable to fetch data.' });
            return;
        }
        res.status(200).json(data);
    });
};

// GET - /category/:date - Get all categories after a date
exports.getAllAfterDate = (req, res) => {
    let date = req.params.date;
    console.log(date);
    if(!date) {
        res.status(400).json({message: "Date can not be empty."});
    }

    CategoryRepository.getAllAfterDate(date, function (err, data) {
        if (err) {
            res.status(500);
            res.json({ message: err || 'Unable to fetch data.' });
            return;
        }
        res.status(200).json(data);
    });
};
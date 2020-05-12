module.exports = app => {
    const express = require('express');
    const router = express.Router();

    const postController = require('../controllers/post.controller');

    router.get('/:id', postController.findByid);
    router.post('/', postController.create);

    app.use('/api/post', router);
}
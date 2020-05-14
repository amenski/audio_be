const app = require('express');
const router = app.Router();
const postController = require('../controllers/post.controller');

router.post('/create', postController.create);
router.get('/:id', postController.get);

module.exports = router;
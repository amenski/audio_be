const app = require('express');
const router = app.Router();
const upload = require('../config').fileUpload;
const postController = require('../controllers/post.controller');

router.get('/:id', postController.get);
router.post('/create', postController.create);
router.post('/:id', upload.single('audio'),postController.upload);

module.exports = router;
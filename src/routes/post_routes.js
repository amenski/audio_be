const app = require('express');
const router = app.Router();
const upload = require('../config').fileUpload;
const postController = require('../controllers/post.controller');

router.get('/:id', postController.get);
router.get('/all/:date', postController.getAllAfterDate);
router.post('/:id', upload.single('audio'),postController.upload);
router.post('/create', postController.create);

module.exports = router;
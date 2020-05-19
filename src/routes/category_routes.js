const app = require('express');
const router = app.Router();
const catController = require('../controllers/category.controller');

router.get('/:id', catController.get);
router.get('/all/parents', catController.getAllParents);
router.get('/all/:date', catController.getAllAfterDate);
router.post('/create', catController.create);

module.exports = router;
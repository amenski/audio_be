const app = require('express');
const router = app.Router();
const catController = require('../controllers/category.controller');

router.post('/create', catController.create);
router.get('/all/', catController.getAll);
router.get('/:id', catController.get);
router.get('/all/:date', catController.getAllAfterDate);

module.exports = router;
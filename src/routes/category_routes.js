const app = require('express');
const router = app.Router();
const catController = require('../controllers/category.controller');

router.post('/create', catController.create);
router.get('/:id', catController.get);

module.exports = router;
const app = require('express');
const router = app.Router();
const catController = require('../controllers/category.controller');

router.post('/create', catController.create);

module.exports = router;
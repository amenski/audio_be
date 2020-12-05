const app = require('express');
const router = app.Router();
const versionController = require('../controllers/version.sync.controller');

router.get('/last-version', versionController.getLastVersion);
router.get('/:id', versionController.get);

module.exports = router;
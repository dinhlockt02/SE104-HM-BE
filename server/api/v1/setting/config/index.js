const router = require('express').Router();
const ConfigController = require('./config.controller');

router.get('/', ConfigController.getSettingConfig);
router.put('/:MaThamSo', ConfigController.updateConfig);

module.exports = router;

const router = require('express').Router();
const reportController = require('./report.controller');

router.get('/:Thang/:Nam', reportController.getReport);

module.exports = router;

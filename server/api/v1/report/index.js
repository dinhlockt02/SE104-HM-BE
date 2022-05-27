const router = require('express').Router();
const reportController = require('./report.controller');

router.get('/:Thang/:Nam', reportController.getReport);
router.get('/excel/:Thang/:Nam', reportController.getReportExcel);

module.exports = router;

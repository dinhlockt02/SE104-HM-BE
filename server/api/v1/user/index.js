const router = require('express').Router();
const management = require('./management');
const authentication = require('./authentication');

router.use('/management', management);
router.use('/authentication', authentication);

module.exports = router;

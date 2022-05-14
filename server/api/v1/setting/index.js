const router = require('express').Router();
const config = require('./config');
const surcharge = require('./surcharge');

router.use('/config', config);
router.use('/surcharge', surcharge);

module.exports = router;

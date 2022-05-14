const router = require('express').Router();

const room = require('./room');
const roomType = require('./room_type');
const customerType = require('./customer_type');
const setting = require('./setting');

router.use('/room', room);
router.use('/room-type', roomType);
router.use('/customer-type', customerType);
router.use('/setting', setting);

module.exports = router;

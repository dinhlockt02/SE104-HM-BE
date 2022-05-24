const router = require('express').Router();

const room = require('./room');
const roomType = require('./room_type');
const customerType = require('./customer_type');
const setting = require('./setting');
const rent = require('./rent');
const roomState = require('./room_state');
const invoice = require('./invoice');
const report = require('./report');

router.use('/room', room);
router.use('/room-type', roomType);
router.use('/room-state', roomState);
router.use('/customer-type', customerType);
router.use('/setting', setting);
router.use('/rent', rent);
router.use('/invoice', invoice);
router.use('/report', report);

module.exports = router;

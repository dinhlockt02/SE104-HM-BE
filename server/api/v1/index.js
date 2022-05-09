const router = require('express').Router();

const room = require('./room');
const roomType = require('./room_type');

router.use('/room', room);
router.use('/room-type', roomType);

module.exports = router;

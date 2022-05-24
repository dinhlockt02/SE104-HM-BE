const router = require('express').Router();
const rentController = require('./rent.controller');

router.get('/', rentController.getRenRoomVoucher);
router.post('/', rentController.createRentRoomVoucher);

module.exports = router;

const router = require('express').Router();
const rentController = require('./rent.controller');

router.get('/', rentController.getRenRoomVoucher);
router.post('/', rentController.createRentRoomVoucher);
router.get('/:MaPhieuThuePhong', rentController.getRentRoomVoucherByKey);
router.delete('/:MaPhieuThuePhong', rentController.deleteRentRoomVoucher);

module.exports = router;

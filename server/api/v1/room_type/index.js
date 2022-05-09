const router = require('express').Router();
const roomTypeController = require('./room_type.controller');

router.get('/', roomTypeController.getAllRoomTypes);
router.post('/', roomTypeController.addRoomType);
router.delete('/:MaLoaiPhong', roomTypeController.deleteRoomType);
router.put('/:MaLoaiPhong', roomTypeController.updateRoomTypeByKey);

module.exports = router;

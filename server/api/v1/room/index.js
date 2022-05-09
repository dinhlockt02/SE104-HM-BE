const router = require('express').Router();
const roomController = require('./room.controller');

router.get('/', roomController.getAllRooms);
router.post('/', roomController.addRoom);
router.get('/:MaPhong', roomController.getRoomByKey);
router.delete('/:MaPhong', roomController.deleteRoom);
router.put('/:MaPhong', roomController.updateRoomByKey);

module.exports = router;

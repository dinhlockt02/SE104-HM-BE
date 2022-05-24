const router = require('express').Router();
const roomStateController = require('./room_state.controller');

router.get('/', roomStateController.getRoomState);
router.post('/', roomStateController.addRoomState);
router.put('/:MaTinhTrang', roomStateController.putRoomState);
router.delete('/:MaTinhTrang', roomStateController.deleteRoomState);

module.exports = router;

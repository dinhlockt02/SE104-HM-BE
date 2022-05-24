const roomStateService = require('./room_state.service');

const getRoomState = async (req, res, next) => {
  try {
    const DAO = await roomStateService.getRoomState();
    res.status(200).json(DAO);
  } catch (err) {
    next(err);
  }
};

const addRoomState = async (req, res, next) => {
  try {
    const { TenTinhTrang } = req.body;
    await roomStateService.addRoomState({ TenTinhTrang });
    res.status(201).json({ message: 'Add room state successful' });
  } catch (error) {
    next(error);
  }
};

const putRoomState = async (req, res, next) => {
  try {
    const { TenTinhTrang } = req.body;
    const { MaTinhTrang } = req.params;
    await roomStateService.putRoomState({ TenTinhTrang, MaTinhTrang });
    res.status(201).json({ message: 'Update room state successful' });
  } catch (error) {
    next(error);
  }
};

const deleteRoomState = async (req, res, next) => {
  try {
    const { MaTinhTrang } = req.params;
    await roomStateService.deleteRoomState({ MaTinhTrang });
    res.status(200).json({ message: 'Delete room state successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoomState,
  addRoomState,
  putRoomState,
  deleteRoomState,
};

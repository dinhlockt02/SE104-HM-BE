const roomService = require('./room.service');

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

const addRoom = async (req, res, next) => {
  try {
    const { TenPhong, MaLoaiPhong, MaTinhTrang, GhiChu } = req.body;
    await roomService.addRoom({ TenPhong, MaLoaiPhong, MaTinhTrang, GhiChu });
    res.status(201).json({ message: 'Add room successful' });
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const { MaPhong } = req.params;
    await roomService.deleteRoom({ MaPhong });
    res.status(200).json({ message: 'Delete room successful' });
  } catch (err) {
    next(err);
  }
};

const getRoomByKey = async (req, res, next) => {
  try {
    const { MaPhong } = req.params;
    const room = await roomService.getRoomByKey({ MaPhong });
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const updateRoomByKey = async (req, res, next) => {
  try {
    const { MaPhong } = req.params;
    const { TenPhong, MaLoaiPhong, MaTinhTrang, GhiChu } = req.body;
    await roomService.updateRoomByKey({
      MaPhong,
      TenPhong,
      MaLoaiPhong,
      MaTinhTrang,
      GhiChu,
    });
    res.status(200).json({ message: 'Update room successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRooms,
  addRoom,
  deleteRoom,
  getRoomByKey,
  updateRoomByKey,
};

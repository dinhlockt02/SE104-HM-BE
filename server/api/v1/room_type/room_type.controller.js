const roomTypeService = require('./room_type.service');

const getAllRoomTypes = async (req, res, next) => {
  try {
    const rooms = await roomTypeService.getAllRoomTypes();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

const addRoomType = async (req, res, next) => {
  try {
    const { TenLoaiPhong, DonGia } = req.body;
    await roomTypeService.addRoomType({ TenLoaiPhong, DonGia });
    res.status(201).json({ message: 'Add room type successful' });
  } catch (err) {
    next(err);
  }
};

const deleteRoomType = async (req, res, next) => {
  try {
    const { MaLoaiPhong } = req.params;
    await roomTypeService.deleteRoomType({ MaLoaiPhong });
    res.status(200).json({ message: 'Delete room type successful' });
  } catch (err) {
    next(err);
  }
};

const updateRoomTypeByKey = async (req, res, next) => {
  try {
    const { MaLoaiPhong } = req.params;
    const { TenLoaiPhong, DonGia } = req.body;
    await roomTypeService.updateRoomTypeByKey({
      MaLoaiPhong,
      TenLoaiPhong,
      DonGia,
    });
    res.status(200).json({ message: 'Update room type successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRoomTypes,
  addRoomType,
  deleteRoomType,
  updateRoomTypeByKey,
};

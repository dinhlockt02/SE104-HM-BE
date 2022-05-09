const crypto = require('crypto');
const { RoomType } = require('../models');

const getAllRoomTypes = async () => {
  const roomTypes = await RoomType.findAll();
  return roomTypes;
};

const addRoomType = async ({ TenLoaiPhong, DonGia }) => {
  await RoomType.create({
    MaLoaiPhong: crypto.randomBytes(4).toString('hex'),
    TenLoaiPhong,
    DonGia,
  });
};

const deleteRoomType = async ({ MaLoaiPhong }) => {
  RoomType.destroy({
    where: {
      MaLoaiPhong,
    },
  });
};

const updateRoomTypeByKey = async ({ MaLoaiPhong, TenLoaiPhong, DonGia }) => {
  await RoomType.update(
    { TenLoaiPhong, DonGia },
    {
      where: {
        MaLoaiPhong,
      },
    }
  );
};

module.exports = {
  getAllRoomTypes,
  addRoomType,
  deleteRoomType,
  updateRoomTypeByKey,
};

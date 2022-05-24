const crypto = require('crypto');
const { RoomType } = require('../models');

const getAllRoomTypes = async () => {
  const roomTypes = await RoomType.findAll({
    where: {
      DaXoa: false,
    },
  });
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
  RoomType.update(
    { DaXoa: true },
    {
      where: {
        MaLoaiPhong,
      },
    }
  );
};

const updateRoomTypeByKey = async ({ MaLoaiPhong, TenLoaiPhong, DonGia }) => {
  await RoomType.update(
    { TenLoaiPhong, DonGia },
    {
      where: {
        MaLoaiPhong,
        DaXoa: false,
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

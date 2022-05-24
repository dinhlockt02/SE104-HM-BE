const crypto = require('crypto');
const { RoomType, RoomState, Room } = require('../models');

const getAllRooms = async () => {
  const rooms = await Room.findAll({
    include: [{ model: RoomType }, { model: RoomState }],
    raw: true,
    nest: true,
    where: {
      DaXoa: false,
    },
  });
  return rooms.map((room) => {
    const roomData = { ...room, ...room.RoomType, ...room.RoomState };
    delete roomData.RoomState;
    delete roomData.RoomType;
    return roomData;
  });
};

const addRoom = async ({ TenPhong, MaLoaiPhong, MaTinhTrang, GhiChu }) => {
  await Room.create({
    MaPhong: crypto.randomBytes(4).toString('hex'),
    TenPhong,
    MaLoaiPhong,
    MaTinhTrang,
    GhiChu,
  });
};

const deleteRoom = async ({ MaPhong }) => {
  Room.update(
    { DaXoa: true },
    {
      where: {
        MaPhong,
      },
    }
  );
};

const getRoomByKey = async ({ MaPhong }) => {
  const room = await Room.findByPk(MaPhong, {
    include: [{ model: RoomType }, { model: RoomState }],
    raw: true,
    nest: true,
    where: {
      DaXoa: false,
    },
  });
  const roomData = { ...room, ...room.RoomType, ...room.RoomState };
  delete roomData.RoomState;
  delete roomData.RoomType;
  return roomData;
};

const updateRoomByKey = async ({
  MaPhong,
  TenPhong,
  MaLoaiPhong,
  MaTinhTrang,
  GhiChu,
}) => {
  await Room.update(
    { TenPhong, MaLoaiPhong, MaTinhTrang, GhiChu },
    {
      where: {
        MaPhong,
        DaXoa: false,
      },
    }
  );
};

module.exports = {
  getAllRooms,
  addRoom,
  deleteRoom,
  getRoomByKey,
  updateRoomByKey,
};

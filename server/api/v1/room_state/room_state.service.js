const { RoomState } = require('../models');
const createRandomString = require('../utils/createRandomString');

const getRoomState = async () =>
  RoomState.findAll({
    where: {
      DaXoa: false,
    },
  });
const addRoomState = async ({ TenTinhTrang }) => {
  await RoomState.create({
    MaTinhTrang: createRandomString(8),
    TenTinhTrang,
  });
};

const putRoomState = async ({ TenTinhTrang, MaTinhTrang }) => {
  await RoomState.update(
    { TenTinhTrang },
    {
      where: {
        MaTinhTrang,
        DaXoa: false,
      },
    }
  );
};

const deleteRoomState = async ({ MaTinhTrang }) => {
  await RoomState.update(
    { DaXoa: true },
    {
      where: {
        MaTinhTrang,
      },
    }
  );
};

module.exports = {
  getRoomState,
  addRoomState,
  putRoomState,
  deleteRoomState,
};

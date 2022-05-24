const { RoomState } = require('../models');
const createRandomString = require('../utils/createRandomString');

const getRoomState = async () => RoomState.findAll();
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
      },
    }
  );
};

const deleteRoomState = async ({ MaTinhTrang }) => {
  await RoomState.destroy({
    where: {
      MaTinhTrang,
    },
  });
};

module.exports = {
  getRoomState,
  addRoomState,
  putRoomState,
  deleteRoomState,
};

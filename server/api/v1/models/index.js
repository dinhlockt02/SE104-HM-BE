const RoomType = require('./room_type');
const Room = require('./room');
const RoomState = require('./room_state');

RoomType.hasMany(Room, { foreignKey: 'MaLoaiPhong' });
RoomState.hasMany(Room, { foreignKey: 'MaTinhTrang' });
Room.belongsTo(RoomType, { foreignKey: 'MaLoaiPhong' });
Room.belongsTo(RoomState, { foreignKey: 'MaTinhTrang' });

module.exports = {
  Room,
  RoomState,
  RoomType,
};

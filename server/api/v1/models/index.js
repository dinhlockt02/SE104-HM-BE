const RoomType = require('./room_type');
const Room = require('./room');
const RoomState = require('./room_state');
const CustomerType = require('./customer_type');
const SettingConfig = require('./setting_config');
const Surcharge = require('./surcharge');

RoomType.hasMany(Room, { foreignKey: 'MaLoaiPhong' });
RoomState.hasMany(Room, { foreignKey: 'MaTinhTrang' });
Room.belongsTo(RoomType, { foreignKey: 'MaLoaiPhong' });
Room.belongsTo(RoomState, { foreignKey: 'MaTinhTrang' });

module.exports = {
  Room,
  RoomState,
  RoomType,
  CustomerType,
  SettingConfig,
  Surcharge,
};

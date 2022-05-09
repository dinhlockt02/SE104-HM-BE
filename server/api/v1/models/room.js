const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');
const RoomState = require('./room_state');
const RoomType = require('./room_state');

const Room = sequelize.define(
  'Room',
  {
    MaPhong: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    TenPhong: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    MaLoaiPhong: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: RoomType,
        key: 'MaLoaiPhong',
      },
    },
    GhiChu: {
      type: DataTypes.TEXT,
    },
    MaTinhTrang: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: RoomState,
        key: 'MaTinhTrang',
      },
    },
  },
  { tableName: 'PHONG', timestamps: false }
);

module.exports = Room;

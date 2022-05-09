const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');
// const Room = require('./room');

const RoomType = sequelize.define(
  'RoomType',
  {
    MaLoaiPhong: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true,
    },
    TenLoaiPhong: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    DonGia: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
  },
  { tableName: 'LOAIPHONG', timestamps: false }
);

// RoomType.hasMany(Room, { foreignKey: 'MaLoaiPhong' });

module.exports = RoomType;

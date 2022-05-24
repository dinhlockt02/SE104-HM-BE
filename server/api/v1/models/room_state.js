const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');

const RoomState = sequelize.define(
  'RoomState',
  {
    MaTinhTrang: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    TenTinhTrang: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    DaXoa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: 'TINHTRANG', timestamps: false }
);

module.exports = RoomState;

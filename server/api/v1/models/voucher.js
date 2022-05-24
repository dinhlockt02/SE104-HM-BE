const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');
const Room = require('./room');

const Voucher = sequelize.define(
  'Voucher',
  {
    MaPhieuThuePhong: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    NgayBatDauThue: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    MaPhong: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: Room,
        key: 'MaPhong',
      },
    },
    SoKhach: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    DonGiaThueTrenNgay: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
  },
  { tableName: 'PHIEUTHUEPHONG', timestamps: false }
);

module.exports = Voucher;

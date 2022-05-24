const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');

const Invoice = sequelize.define(
  'Invoice',
  {
    MaHoaDon: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    KhachHang_CoQuan: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    DiaChi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    NgayLap: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    TongTien: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
    DaXoa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: 'HOADON', timestamps: false }
);

module.exports = Invoice;

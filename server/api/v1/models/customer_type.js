const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');

const CustomerType = sequelize.define(
  'CustomerType',
  {
    MaLoaiKhach: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true,
    },
    TenLoaiKhach: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    HeSoPhuThu: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    DaXoa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: 'LOAIKHACH', timestamps: false }
);

module.exports = CustomerType;

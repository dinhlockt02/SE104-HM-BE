const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');
const Invoice = require('./invoice');
const Voucher = require('./voucher');

const InvoiceDetail = sequelize.define(
  'InvoiceDetail',
  {
    MaPhieuThuePhong: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      references: {
        model: Voucher,
        key: 'MaPhieuThuePhong',
      },
    },
    MaHoaDon: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: Invoice,
        key: 'MaHoaDon',
      },
    },
    SoNgayThue: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    DonGia: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
    DaXoa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: 'CTHD', timestamps: false }
);

module.exports = InvoiceDetail;

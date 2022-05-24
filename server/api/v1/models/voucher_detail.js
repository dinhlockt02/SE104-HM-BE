const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');
const Voucher = require('./voucher');
const CustomerType = require('./customer_type');

const VoucherDetail = sequelize.define(
  'VoucherDetail',
  {
    MaCTPhieuThuePhong: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    MaPhieuThuePhong: {
      type: DataTypes.STRING(8),
      references: {
        model: Voucher,
        key: 'MaPhieuThuePhong',
      },
    },
    CMND: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    TenKhachHang: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    DiaChi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    MaLoaiKhach: {
      type: DataTypes.STRING(8),
      allowNull: true,
      references: {
        model: CustomerType,
        key: 'MaLoaiKhach',
      },
    },
  },
  { tableName: 'CTPHIEUTHUEPHONG', timestamps: false }
);

module.exports = VoucherDetail;

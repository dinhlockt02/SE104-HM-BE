const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');
const Report = require('./report');
const RoomType = require('./room_type');

const ReportDetail = sequelize.define(
  'ReportDetail',
  {
    MaBaoCao: {
      type: DataTypes.STRING(8),
      references: {
        model: Report,
        key: 'MaBaoCao',
      },
      primaryKey: true,
    },
    MaLoaiPhong: {
      type: DataTypes.STRING(8),
      references: {
        model: RoomType,
        key: 'MaLoaiPhong',
      },
      primaryKey: true,
    },
    DoanhThuTheoThang: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
    TiLe: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    DaXoa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: 'CTBAOCAODOANHTHU', timestamps: false }
);

module.exports = ReportDetail;

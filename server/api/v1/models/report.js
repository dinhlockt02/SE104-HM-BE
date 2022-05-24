const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');

const Report = sequelize.define(
  'Report',
  {
    MaBaoCao: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    Thang: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    Nam: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    TongDoanhThu: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
      defaultValue: 0,
    },
    DaXoa: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { tableName: 'BAOCAODOANHTHU', timestamps: false }
);

module.exports = Report;

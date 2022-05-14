const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');

const SettingConfig = sequelize.define(
  'SettingConfig',
  {
    MaThamSo: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true,
    },

    TenThamSo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    GiaTri: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: 'THAMSO', timestamps: false }
);

module.exports = SettingConfig;

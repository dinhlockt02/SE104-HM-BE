const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');
const UserGroup = require('./user_group');

const User = sequelize.define(
  'User',
  {
    MaNguoiDung: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    HoTen: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    MatKhau: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    MaNhom: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: UserGroup,
        key: 'MaNhom',
      },
    },
    ResetCode: {
      type: DataTypes.STRING(4),
    },
  },
  { tableName: 'NGUOIDUNG', timestamps: false }
);

module.exports = User;

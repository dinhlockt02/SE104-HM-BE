const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');

const UserGroup = sequelize.define(
  'UserGroup',
  {
    MaNhom: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    TenNhom: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    CapBac: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  },
  { tableName: 'NHOMNGUOIDUNG', timestamps: false }
);

module.exports = UserGroup;

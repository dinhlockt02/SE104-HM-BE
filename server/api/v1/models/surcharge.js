const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database_connection');

const Surcharge = sequelize.define(
  'Surcharge',
  {
    SoKhach: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        min: 0,
      },
    },
    TiLePhuThu: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  { tableName: 'TILEPHUTHU', timestamps: false }
);

module.exports = Surcharge;

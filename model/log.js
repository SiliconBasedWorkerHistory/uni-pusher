const sequelize = require("../bin/sequelize");
const { DataTypes, Model, Sequelize } = require("sequelize");

class Log extends Model { }

Log.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    message: DataTypes.STRING,
    event: DataTypes.STRING,
    entity: DataTypes.STRING,
    level: DataTypes.INTEGER // inf:0 war:1 err:2
  },
  {
    sequelize,
    timestamps: true
  }
);

module.exports = Log;

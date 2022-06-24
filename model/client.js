const sequelize = require("../bin/sequelize");
const { DataTypes, Model, Sequelize } = require("sequelize");

class Client extends Model { }

// client 与 product，多对一
Client.init(
  {
    uuid: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    puuid:{
      type: DataTypes.UUIDV4,
      defaultValue: ""
    },
    label: DataTypes.STRING,
    note: DataTypes.STRING
  },
  {
    sequelize,
    timestamps: true
  }
);

module.exports = Client;

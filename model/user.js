const sequelize = require("../bin/sequelize");
const { DataTypes, Model, Sequelize } = require("sequelize");

class User extends Model { }

User.init(
  {
    uuid: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    sequelize,
    timestamps: true
  }
);

module.exports = User;

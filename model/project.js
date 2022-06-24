const sequelize = require("../bin/sequelize");
const { DataTypes, Model, Sequelize } = require("sequelize");

class Project extends Model { }

Project.init(
  {
    uuid: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    label: DataTypes.STRING,
    note: DataTypes.STRING
  },
  {
    sequelize,
    timestamps: true
  }
);

module.exports = Project;

const Sequelize = require("sequelize");
// const Log = require("../model/log");
// const logger = (msg) => {
//   Log.create({ msg, entity: "sequelize", event: "log", level: 0 });
// }

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "sqlite",
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  storage: "./database.sqlite",
});

// sequelize.sync({ force: true });

module.exports = sequelize;

const Sequelize = require("sequelize");
const config = require("./config/config.json");
const env = process.env.NODE_ENV || "development";

const initDB = () => {
  const sequelize = new Sequelize(
    config[env].database,
    config[env].username, // MySQL username
    config[env].password, // MySQL password
    {
      host: "localhost",
      dialect: "mysql",
    }
  );

  return sequelize;
};

const connectDB = () => {
  const sequelize = initDB();
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
};

module.exports = { initDB, connectDB };

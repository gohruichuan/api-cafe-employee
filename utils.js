const Sequelize = require("sequelize");

const initDB = () => {
  const sequelize = new Sequelize(
    "cafemanager", // Database name
    "root", // MySQL username
    "root", // MySQL password
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

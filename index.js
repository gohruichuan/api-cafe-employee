const express = require("express");
const app = express();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "cafemanager", // Database name
  "root", // MySQL username
  "root", // MySQL password
  {
    host: "localhost",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.listen(process.env.PORT || 8080);

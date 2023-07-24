const express = require("express");
const app = express();

const util = require("./utils.js");

const cafesController = require("./services/cafes");
util.connectDB();

app.use("/cafes", cafesController);

app.listen(process.env.PORT || 8080);

const express = require("express");
const app = express();

const util = require("./utils.js");

util.connectDB();
app.listen(process.env.PORT || 8080);

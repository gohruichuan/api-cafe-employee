const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const util = require("./utils.js");

const cafesController = require("./services/cafes");
const employeesController = require("./services/employees");

util.connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/cafes", cafesController);
app.use("/employees", employeesController);

app.listen(process.env.PORT || 8080);

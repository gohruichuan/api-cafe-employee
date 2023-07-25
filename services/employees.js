const Joi = require("joi");
const express = require("express");
const db = require("../models/index");

const router = new express.Router();

const convetToDays = (ms) => {
  return Math.ceil(ms / (24 * 60 * 60 * 1000));
};

router.post("/", (req, res) => {});

router.get("/", async (req, res) => {
  const query = req.query.cafe;
  let employees;
  const schema = Joi.string().optional();

  try {
    const cafeName = await schema.validateAsync(query);
    if (cafeName) {
      // Find all cafes with cafeName
      let cafe = await db.Cafes.findOne({
        raw: true,
        where: { name: cafeName },
      });

      if (cafe) {
        // Find all employess who worked in the cafe
        employees = await db.Employees.findAll({
          raw: true,
          where: { cafeId: cafe.id },
        });
        console.log("employees ", employees);

        // Format days_worked and cafe for employees
        employees.map((employee) => {
          const currentTime = new Date().getTime();
          const employeeTime = new Date(employee.start_date).getTime();

          const timeDiffInDays = convetToDays(currentTime - employeeTime);
          employee.days_worked = timeDiffInDays;
          employee.cafe = cafe.name;
        });
        res.json(employees);
      } else {
        res.status(400);
        res.send("No cafe found: " + cafeName);
        return res;
      }
    }
  } catch (err) {
    res.status(400);
    res.send(err);
    return res;
  }
});

module.exports = router;

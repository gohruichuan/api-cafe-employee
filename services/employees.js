const Joi = require("joi");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const db = require("../models/index");

const router = new express.Router();

const convetToDays = (ms) => {
  return Math.ceil(ms / (24 * 60 * 60 * 1000));
};

const formatEmployeeId = () => {
  let hexString = uuidv4();
  hexString = hexString.replace(/-/g, "");
  return "UI" + hexString.slice(0, 8).toUpperCase();
};

router.post("/", async (req, res) => {
  const payload = req.body;

  const schema = Joi.alternatives([
    Joi.object({
      name: Joi.string().required(),
      cafeId: Joi.string().optional(),
      email_address: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone_number: Joi.string()
        .pattern(/^(9|8)/)
        .length(8)
        .required(),
      gender: Joi.string().required(),
    }).optional(),
    Joi.object({
      name: Joi.string().required(),
      cafeName: Joi.string().optional(),
      email_address: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone_number: Joi.string()
        .pattern(/^(9|8)/)
        .length(8)
        .required(),
      gender: Joi.string().required(),
    }).optional(),
  ]);

  try {
    const validData = await schema.validateAsync(payload);
    const isCafeNameQueryExist = validData.cafeName ? true : false;

    const query = isCafeNameQueryExist
      ? {
          name: validData.cafeName,
        }
      : {
          id: validData.cafeId,
        };

    const cafe = await db.Cafes.findOne({ raw: true, where: query });

    if (cafe) {
      validData.id = formatEmployeeId();
      validData.cafeId = cafe.id;
      validData.createdAt = new Date();
      validData.updatedAt = new Date();

      const addEmployee = await db.Employees.create(validData);

      res.json(addEmployee);
    } else {
      res.status(400);
      res.send("No cafe found: " + validData.cafeName || validData.cafeId);
      return res;
    }
  } catch (err) {
    res.status(400);
    res.send(err);
    return res;
  }
});

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

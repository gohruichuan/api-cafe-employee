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

const findCafeName = (employee, cafes) => {
  const cafeData = cafes.find((cafe) => cafe.id === employee.cafeId);
  return cafeData?.name;
};

const formatDaysWorked = (employees, cafe) => {
  employees.map((employee) => {
    const currentTime = new Date().getTime();
    const employeeTime = new Date(employee.start_date).getTime();

    const timeDiffInDays = convetToDays(currentTime - employeeTime);
    employee.days_worked = timeDiffInDays;
    employee.cafe_name = cafe.name ? cafe.name : findCafeName(employee, cafe);
    return employee;
  });

  return employees;
};

router.delete("/", async (req, res) => {
  const payload = req.body;

  const schema = Joi.object({
    id: Joi.string().required(),
  }).required();

  try {
    const validData = await schema.validateAsync(payload);

    const delEmployee = await db.Employees.destroy({
      where: {
        id: validData.id,
      },
    });

    if (delEmployee !== 0) {
      res.json(validData);
    } else {
      res.status(400);
      res.send("No such employee: " + validData.id);
      return res;
    }
  } catch (err) {
    res.status(400);
    res.send(err);
    return res;
  }
});

router.put("/", async (req, res) => {
  const payload = req.body;

  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().optional(),
    cafeId: Joi.string().optional(),
    email_address: Joi.string().optional(),
    phone_number: Joi.string()
      .pattern(/^(9|8)/)
      .length(8)
      .optional(),
    gender: Joi.string().optional(),
    start_date: Joi.string().optional(),
  }).required();

  try {
    const validData = await schema.validateAsync(payload);
    validData.updatedAt = new Date();

    const updEmployeeData = await db.Employees.update(validData, {
      where: {
        id: validData.id,
      },
    });

    if (updEmployeeData[0] !== 0) {
      res.json(validData);
    } else {
      res.status(400);
      res.send("No such employee: " + validData.id);
      return res;
    }
  } catch (err) {
    res.status(400);
    res.send(err);
    return res;
  }
});

router.post("/", async (req, res) => {
  const payload = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    cafeId: Joi.string().optional(),
    email_address: Joi.string().required(),
    phone_number: Joi.string()
      .pattern(/^(9|8)/)
      .length(8)
      .required(),
    gender: Joi.string().required(),
  }).optional();

  try {
    const validData = await schema.validateAsync(payload);

    if (validData.cafeId) {
      const query = {
        id: validData.cafeId,
      };

      const cafe = await db.Cafes.findOne({ raw: true, where: query });
      validData.cafeId = cafe.id;
    }

    validData.id = formatEmployeeId();
    validData.createdAt = new Date();
    validData.updatedAt = new Date();

    const addEmployee = await db.Employees.create(validData);
    res.json(addEmployee);
  } catch (err) {
    res.status(400);
    res.send(err);
    return res;
  }
});

router.get("/", async (req, res) => {
  const query = req.query.cafeId;
  let employees;
  const schema = Joi.string().optional();

  try {
    const cafeId = await schema.validateAsync(query);
    if (cafeId) {
      // Find all cafes with cafeName
      let cafe = await db.Cafes.findOne({
        raw: true,
        where: { id: cafeId },
      });

      if (cafe) {
        // Find all employess who worked in the cafe
        employees = await db.Employees.findAll({
          raw: true,
          where: { cafeId: cafe.id },
        });
        res.json(formatDaysWorked(employees, cafe));
      } else {
        res.status(400);
        res.send("No cafe found: " + cafeName);
        return res;
      }
    } else {
      cafes = await db.Cafes.findAll({
        raw: true,
      });
      employees = await db.Employees.findAll({
        raw: true,
      });
      res.json(formatDaysWorked(employees, cafes));
    }
  } catch (err) {
    res.status(400);
    res.send(err);
    return res;
  }
});

module.exports = router;

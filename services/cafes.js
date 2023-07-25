const Joi = require("joi");
const express = require("express");
const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");

const router = new express.Router();

router.put("/", async (req, res) => {
  const payload = req.body;

  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    logo: Joi.string().optional(),
    location: Joi.string().optional(),
  }).required();

  try {
    const validData = await schema.validateAsync(payload);
    validData.updatedAt = new Date();
    console.log("validData ", validData);

    await db.Cafes.update(validData, {
      where: {
        id: validData.id,
      },
    });

    res.json(validData);
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
    description: Joi.string().required(),
    logo: Joi.string().optional(),
    location: Joi.string().required(),
  }).required();

  try {
    const validData = await schema.validateAsync(payload);
    validData.id = uuidv4();
    validData.createdAt = new Date();
    validData.updatedAt = new Date();

    const addCafe = await db.Cafes.create(validData);

    res.json(addCafe);
  } catch (err) {
    res.status(400);
    res.send(err);
    return res;
  }
});

router.get("/", async (req, res) => {
  let cafes;
  const query = req.query.location;

  const schema = Joi.string().allow("");

  try {
    const loc = await schema.validateAsync(query);
    const cafeEmployeeCount = {};
    if (loc) {
      // Find all cafes based on location
      cafes = await db.Cafes.findAll({ raw: true, where: { location: loc } });
    } else cafes = await db.Cafes.findAll();
    if (cafes.length > 0) {
      // Format promises to find each cafe's employees count
      const promises = cafes.map(async (cafe) => {
        if (!cafeEmployeeCount[cafe.id]) {
          return await db.Employees.findAndCountAll({
            raw: true,
            where: {
              cafeId: cafe.id,
            },
          }).then((res) => {
            cafe.employeeCount = res.count;
          });
        }
      });
      // Call all promises
      await Promise.all(promises);
      // Sort by the highest number of employees first
      cafes.sort((a, b) => {
        if (a.employeeCount > b.employeeCount) return -1;
        else return 1;
      });
    }
    res.json(cafes);
  } catch (err) {
    res.status(400);
    res.send(err);
    return res;
  }
});

module.exports = router;

const Joi = require("joi");
const express = require("express");
const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");

const router = new express.Router();

router.delete("/", async (req, res) => {
  const payload = req.body;

  const schema = Joi.object({
    id: Joi.string().required(),
  }).required();

  try {
    const validData = await schema.validateAsync(payload);

    const delCafe = await db.Cafes.destroy({
      where: {
        id: validData.id,
      },
    });

    if (delCafe !== 0) {
      res.json(validData);
    } else {
      res.status(400);
      res.send("No such cafe: " + validData.id);
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
    description: Joi.string().optional(),
    logo: Joi.string().optional(),
    location: Joi.string().optional(),
  }).required();

  try {
    const validData = await schema.validateAsync(payload);
    validData.updatedAt = new Date();
    console.log("validData ", validData);

    const updCafe = await db.Cafes.update(validData, {
      where: {
        id: validData.id,
      },
    });

    if (updCafe[0] !== 0) {
      res.json(validData);
    } else {
      res.status(400);
      res.send("No such cafe: " + validData.id);
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
  console.log("payload ", payload);
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
    if (loc) {
      // Find all cafes based on location
      cafes = await db.Cafes.findAll({ raw: true, where: { location: loc } });
    } else cafes = await db.Cafes.findAll({ raw: true });

    if (cafes.length > 0) {
      // Format promises to find each cafe's employees count
      const promises = cafes.map(async (cafe) => {
        return await db.Employees.findAndCountAll({
          raw: true,
          where: {
            cafeId: cafe.id,
          },
        })
          .then((res) => {
            cafe.employees = res.count;
          })
          .catch((err) => {
            console.log("err ", err);
          });
      });

      // Call all promises
      await Promise.all(promises);

      // Sort by the highest number of employees first
      cafes.sort((a, b) => {
        if (a.employees > b.employees) return -1;
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

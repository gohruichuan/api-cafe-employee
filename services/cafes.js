const Joi = require("joi");
const express = require("express");
const db = require("../models/index");

const router = new express.Router();

router.post("/", (req, res) => {
  const body = req.body;
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

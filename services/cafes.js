const express = require("express");
const db = require("../models/index");
const { where } = require("sequelize");

const router = new express.Router();

router.post("/", (req, res) => {});

router.get("/", async (req, res) => {
  const loc = req.query.location;
  let cafes;
  const cafeEmployeeCount = {};
  if (loc) {
    // Find all cafes based on location
    cafes = await db.Cafes.findAll({ where: { location: loc } });
  } else cafes = await db.Cafes.findAll();

  cafes = JSON.parse(JSON.stringify(cafes));

  if (cafes.length > 0) {
    // Format promises to find each cafe's employees count
    const promises = cafes.map(async (cafe) => {
      if (!cafeEmployeeCount[cafe.id]) {
        return await db.Employees.findAndCountAll({
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
});

module.exports = router;

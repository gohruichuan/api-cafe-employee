const express = require("express");
const db = require("../models/index");

const router = new express.Router();

router.post("/", (req, res) => {});

router.get("/", async (req, res) => {
  const cafeName = req.query.cafe;
  let employees;
  if (cafeName) {
    // Find all cafes with cafeName
    let cafes = await db.Cafes.findAll({
      raw: true,
      where: { name: cafeName },
    });
    // cafes = JSON.parse(JSON.stringify(cafes));
    console.log("cafes ", cafes);

    // Find all employess who worked in the cafe
  }

  res.json(employees);
});

module.exports = router;

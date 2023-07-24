const express = require("express");
const db = require("../models/index");
const { where } = require("sequelize");

const router = new express.Router();

router.post("/", (req, res) => {});

router.get("/", async (req, res) => {
  const loc = req.query.location;
  let cafes;
  if (loc) {
    // Find all cafes based on location
    cafes = await db.Cafes.findAll({ where: { location: loc } });
  } else cafes = await db.Cafes.findAll();

  // TODO: format to sort by the highest number of employees first
  res.json(cafes);
});

module.exports = router;

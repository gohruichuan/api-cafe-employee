const express = require("express");
const db = require("../models/index");
const { where } = require("sequelize");

const router = new express.Router();

router.post("/", (req, res) => {});

router.get("/", async (req, res) => {
  const loc = req.query.location;
  // Find all cafes based on location
  const cafes = await db.Cafes.findAll({ where: { location: loc } });
  res.json(cafes);
});

module.exports = router;

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Cafes", [
      {
        id: "e5795210-6b71-4f20-b303-69177263220b",
        name: "ABC Cafe",
        description: "Sell Cakes",
        logo: "abc.png",
        location: "hougang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Cafes", null, {});
  },
};

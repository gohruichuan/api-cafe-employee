"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Cafes", [
      {
        id: "e5795210-6b71-4f20-b303-69177263220b",
        name: "ABC Cafe",
        description: "Sell Cakes",
        location: "hougang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "32188fd0-e03f-486c-b952-f774ca2af7d1",
        name: "Stanley Cafe",
        description: "Sell Breads",
        location: "ang mo kio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5088f8f4-e9a5-46f1-8760-772f0c3709b8",
        name: "Richard Cafe",
        description: "Sell Brunch",
        location: "sengkang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "312b0c3f-0863-4e6e-b8fb-952d3af5af28",
        name: "JK Cafe",
        description: "Sell Pasta",
        location: "hougang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "32fc99bc-bdd7-49d1-b2a9-e039c74104c0",
        name: "Monster Cafe",
        description: "Sell Monster Curry",
        location: "orchard",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3fee314b-7775-4a86-bab8-8f7b8abc98e3",
        name: "Pasir Ris Cafe",
        description: "Sell Biscuits",
        location: "pasir ris",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "305df342-ad5e-4d70-b54f-9049e8d6ddd6",
        name: "SUTD Cafe",
        description: "Sell Stews",
        location: "hougang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ac77ffbf-c321-4ca3-8a88-49cca2b6bbfd",
        name: "Stew Cafe",
        description: "Sell Stews",
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

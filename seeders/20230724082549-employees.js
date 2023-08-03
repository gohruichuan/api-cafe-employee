"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Employees", [
      {
        id: "UIEPGPEOK3",
        cafeId: "e5795210-6b71-4f20-b303-69177263220b",
        name: "Stancel",
        email_address: "stancel@gmail.com",
        phone_number: 90082222,
        gender: "Male",
        start_date: "2022-07-23",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIRHPOKE98",
        cafeId: "e5795210-6b71-4f20-b303-69177263220b",
        name: "Bobelane",
        email_address: "bob@gmail.com",
        phone_number: 84555666,
        gender: "Male",
        start_date: "2022-03-23",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIESBLK4OG",
        cafeId: "32188fd0-e03f-486c-b952-f774ca2af7d1",
        name: "Stacyec",
        email_address: "stacy@gmail.com",
        phone_number: 80620520,
        gender: "Female",
        start_date: "2022-02-05",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIGPEGEP04",
        cafeId: "5088f8f4-e9a5-46f1-8760-772f0c3709b8",
        name: "Gabriel",
        email_address: "gabriel@gmail.com",
        phone_number: 80620520,
        gender: "Female",
        start_date: "2023-06-02",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIEAGEPE90",
        cafeId: "312b0c3f-0863-4e6e-b8fb-952d3af5af28",
        name: "Jasons",
        email_address: "jasons@gmail.com",
        phone_number: 90560700,
        gender: "Male",
        start_date: "2023-01-25",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIEKEKL900",
        cafeId: "312b0c3f-0863-4e6e-b8fb-952d3af5af28",
        name: "Kaseye",
        email_address: "kaseye@gmail.com",
        phone_number: 80440700,
        gender: "Female",
        start_date: "2023-04-03",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIMOASF091",
        cafeId: "32fc99bc-bdd7-49d1-b2a9-e039c74104c0",
        name: "Masons",
        email_address: "masons@gmail.com",
        phone_number: 91586355,
        gender: "Male",
        start_date: "2021-03-03",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UICRHR3945",
        cafeId: "32fc99bc-bdd7-49d1-b2a9-e039c74104c0",
        name: "Cathyees",
        email_address: "cathyees@gmail.com",
        phone_number: 89652313,
        gender: "Female",
        start_date: "2021-12-03",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIPRGA2248",
        cafeId: "3fee314b-7775-4a86-bab8-8f7b8abc98e3",
        name: "Pongey",
        email_address: "pongey@gmail.com",
        phone_number: 94564587,
        gender: "Male",
        start_date: "2023-01-03",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIPRGRGE98",
        cafeId: "3fee314b-7775-4a86-bab8-8f7b8abc98e3",
        name: "Reilly",
        email_address: "reilly@gmail.com",
        phone_number: 84467111,
        gender: "Male",
        start_date: "2022-01-03",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIPRRHEK24",
        cafeId: "3fee314b-7775-4a86-bab8-8f7b8abc98e3",
        name: "Michael",
        email_address: "michael@gmail.com",
        phone_number: 84467111,
        gender: "Male",
        start_date: "2022-01-03",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UISBW4GR03",
        cafeId: "3fee314b-7775-4a86-bab8-8f7b8abc98e3",
        name: "Metatron",
        email_address: "metatron@gmail.com",
        phone_number: 95698888,
        gender: "Male",
        start_date: "2021-01-03",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIASGOOI45",
        cafeId: "305df342-ad5e-4d70-b54f-9049e8d6ddd6",
        name: "Spanel",
        email_address: "spanel@gmail.com",
        phone_number: 84679455,
        gender: "Male",
        start_date: "2023-07-02",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIAGEAEE00",
        cafeId: "305df342-ad5e-4d70-b54f-9049e8d6ddd6",
        name: "Uriels",
        email_address: "uriels@gmail.com",
        phone_number: 95564130,
        gender: "Female",
        start_date: "2022-11-02",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIARHTTT30",
        cafeId: "305df342-ad5e-4d70-b54f-9049e8d6ddd6",
        name: "Theleo",
        email_address: "theleo@gmail.com",
        phone_number: 84622321,
        gender: "Male",
        start_date: "2022-04-02",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIADAEEG45",
        cafeId: "305df342-ad5e-4d70-b54f-9049e8d6ddd6",
        name: "Danielle",
        email_address: "danielle@gmail.com",
        phone_number: 95447798,
        gender: "Female",
        start_date: "2022-08-02",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "UIEGOOEE45",
        cafeId: "ac77ffbf-c321-4ca3-8a88-49cca2b6bbfd",
        name: "Steward",
        email_address: "steward@gmail.com",
        phone_number: 84697777,
        gender: "Male",
        start_date: "2021-08-02",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Employees", null, {});
  },
};

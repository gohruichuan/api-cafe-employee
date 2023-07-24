"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Employees", {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      cafeId: {
        type: DataTypes.STRING(255),
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: /^(9|8)/g,
          len: [8, 8],
        },
      },
      gender: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          is: /^(Male|Female)/g,
        },
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Employees");
  },
};

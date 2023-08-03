"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Cafes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    await queryInterface.dropTable("Cafes");
  },
};

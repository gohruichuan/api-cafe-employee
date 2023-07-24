"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log("models ", models);
    }
  }
  Employees.init(
    {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
        validate: {
          is: /^(9|8)/g,
          len: [8, 8],
        },
      },
      gender: {
        type: DataTypes.STRING(255),
        validate: {
          is: /^(Male|Female)/g,
        },
      },
    },
    {
      sequelize,
      modelName: "Employees",
    }
  );
  return Employees;
};

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

      // Each Employee works in a cafe
      // Cafes.hasMany(models.Employees, { foreignKey: "cafeId" });
      Employees.belongsTo(models.Cafes, { foreignKey: "cafeId" });
    }
  }
  Employees.init(
    {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: "Employees",
    }
  );
  return Employees;
};

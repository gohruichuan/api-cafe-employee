const { DataTypes } = require("sequelize");

const util = require("./utils.js");

const Employee = util.sequelize.define("employees", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_address: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    validate: {
      is: /^(Male|Female)/g,
    },
  },
});

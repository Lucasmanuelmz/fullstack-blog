const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Category = sequelize.define("categories", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;

const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Category = require("./categoryModel");

const Article = sequelize.define("article", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.hasMany(Article);
Article.belongsTo(Category);

module.exports = Article;

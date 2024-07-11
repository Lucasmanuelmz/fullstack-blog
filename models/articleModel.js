const {DataTypes} = require('sequelize');
const sequelize = require('../database/database');

const Article = sequelize.define('article', {
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
    }
});

module.exports = Article;
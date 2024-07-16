const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fileUpload: {
   type: DataTypes.STRING,
   allowNull: true
  },
  path: {
    type: DataTypes.STRING,
    allowNull: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  streetAddress:{
    type: DataTypes.STRING,
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
region: {
  type: DataTypes.STRING,
  allowNull: true,
},
postalCode: {
  type: DataTypes.STRING,
  allowNull: true
},
comments: {
  type: DataTypes.STRING,
  allowNull: true
},
candidates: {
  type: DataTypes.STRING,
    allowNull: true
},
offers: {
  type: DataTypes.STRING,
  allowNull: true
},
pushNotifications: {
  type: DataTypes.STRING,
  allowNull: true,
},
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;



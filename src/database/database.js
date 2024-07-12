const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "blog-fullstack",
  "root",
  "4026.Test@Lucas#Manuel",
  {
    host: "localhost",
    dialect: "mysql",
    timezone: "+02:00",
  },
);

async function connectDatabase() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    return error.message;
  }
}
connectDatabase();

module.exports = sequelize;

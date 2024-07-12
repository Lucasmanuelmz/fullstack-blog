const express = require("express");
const app = express();
const User = require("./models/userModel");
const Article = require("./models/articleModel");
const Category = require("./models/categoryModel");
const routerUser = require("./routers/userController");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routerUser);

app.listen(3000, (error) => {
  if (error) {
    console.log("Erro no servidor");
  } else {
    console.log("Servidor iniciado");
  }
});

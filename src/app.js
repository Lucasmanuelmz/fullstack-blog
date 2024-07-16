const express = require("express");
const app = express();
const User = require("./models/userModel");
const Article = require("./models/articleModel");
const Category = require("./models/categoryModel");
const routerUser = require("./routers/userController");
const bodyParser = require("body-parser");
const routerCategory = require('./routers/categoryController');
const routerArticles = require('./routers/articleController');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/',routerCategory)
app.use('/',routerUser);
app.use(('/', routerArticles));

app.get('/', (req, res) => {
  Article.findAll().then(articles => {
    res.status(200).json({articles});
  }).catch(error => {
    res.status(500).json({error: error.message})
  })
})

app.get('/:slug', (req, res) => {
  Article.findOne({
    where: {slug: slug}
  }).then(article => {
    res.status(200).json({article})
  }).catch(error => {
    res.status(404).json({message: error.message})
  })
})

app.listen(3000, (error) => {
  if (error) {
    console.log("Erro no servidor");
  } else {
    console.log("Servidor iniciado");
  }
});
module.exports = app;

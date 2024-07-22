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
    if(articles) {
      res.status(200).json({articles});
    } else {
      res.status(404).json({message: 'Nenhum arigo foi encotrado'})
    }
  }).catch(error => {
    res.status(500).json({error: error.message})
  })
})

app.get('/:slug', (req, res) => {
  let slug = req.params.slug;
  Article.findOne({
    where: {slug: slug}
  }).then(article => {
    res.status(200).json({article})
  }).catch(error => {
    res.status(404).json({message: error.message})
  })
})

app.get('/categ/:slug', (req, res) => {
  let slug = req.params.slug;
  Category.findOne({
    where: {slug: slug},
    include: [{model: Article}]
  }).then(category => {
    if(category) {
      Category.findAll().then(categories => {
        if(categories) {
          res.status(200).json({articles: category.articles, categories: categories})
        } else {
         res.status(500).json({message: 'Erro no servidor'})
        }
      }).catch(error => {
        res.status(500).json({message: error.message})
      })  
    } else {
      res.status(404).json({message: 'Nao encontrado'})
    }
  }).catch(error => {
    res.status(500).json({message: error.message})
  })
})

app.get('/public/categories', (req, res) => {
  Category.findAll().then(categories => {
    if(categories) {
      res.status(200).json({categories})
    }else {
      res.status(404).json({message: 'Categoria nao encontrada'})
    }
  }).catch(error => {
    res.status(500).json({message: 'Erro no servidor '+error.message})
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

const express = require('express');
const Article = require('../models/articleModel');
const slugify = require('slugify');
const Category = require('../models/categoryModel');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/articles', authMiddleware, (req, res) => {

    Category.findAll().then(categories => {
         Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        if(articles) {
          res.status(200).json({articles, categories});
        } else {
            res.status(404).json({message: 'Nenhum artigo no sevidor'})
        } 
    }).catch(error => {
        res.status(500).json({message: 'Erro no servidor: '+error.message})
    })
    }).catch(error => {
        res.status(500).json({messagem: error.message})
    })
});

router.get('/article/:id', authMiddleware, (req, res) => {
    let id = parseInt(req.params.id);
    Article.findOne({
        where: {
            id: id
        }
    }).then(article => {
        if(article) {
            res.status(200).json({article})
        }else {
            res.status(404).json({message: 'Artigo nao encontrado'})
        }
    }).catch(error => {
        res.status(500).json({message: 'Erro no servidor '+error.message})
    })
})

router.post('/article', authMiddleware, (req, res) => {
    let {title, body, categoryId } = req.body;
    if(title && body && categoryId) {
    Article.findOne({
        where: {
            title: title,
            body: body,
            categoryId: categoryId
        }
    }).then(article => {
        if(article) {
            res.status(302).json({message: 'Este artigo ja existe'})
        } else {
       Article.create({
        title: title,
        body: body,
        slug: slugify(title),
        categoryId: categoryId
    }).then(() => {
        res.status(200).json({message: 'Artigo adicionado com sucesso'})
    }).catch(error => {
        res.status(500).json({message: 'Erro no servidor ao cadastrar o artigo '+error.message})
    }); 
        }
    }).catch(error => {
        res.status(500).json({message: 'Erro no Servidor '+error.message})
    }) 
    } else {
        res.status(401)
    }  
});

router.put('/article/:id', authMiddleware, (req, res) => {
    let id = req.params.id;
    let {title, body} = req.body;
  if(title && body) {
    Article.findOne({
        where: {
            title: title,
            body: body
        }
    }).then(updateArticle => {
        if(updateArticle) {
            res.status(401)
        } else {
          Article.update({
        title: title,
        body: body,
        slug: slugify(title)
    },
{
    where: {id: id}
}).then((articleUpdate) => {
    res.status(200).json({articleUpdate})
}).catch(error => {
    res.status(500).json({message: 'Erro no servidor '+error.message})
})  
}
}).catch(error => {
    res.json({message: error.message})
})
       
  } else {
    res.status(401).json({message: 'Artigo vazio'})
  }
});

router.delete('/article/:id', authMiddleware, (req, res) => {
    let id = req.params.id;
    Article.destroy({
        where: {id: id}
    }).then(() => {
        res.status(200).json({message: 'O artigo foi apagado com sucesso'})
    }).catch((error) => {
        res.status(500).json({message: error.message})
    })
})

module.exports = router;
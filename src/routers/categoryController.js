const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const authMiddleware = require('../middlewares/authMiddleware');
const Category = require('../models/categoryModel');

router.post('/category', authMiddleware, (req, res) => {
    let category = req.body.category;
     if(category != undefined && category.trim() != '') {
    Category.findOne({
    where: {category: category}
    }).then(categoryExists => {
       if(categoryExists == undefined) {
        Category.create({
            category: category,
            slug: slugify(category),
        }).then(() => {
            res.status(200).json({message: 'Categoria adicionando com sucesso'})
        }).catch(error => {
          res.status(500).json({error: error.message})
        })
       }else {
        res.status(400).json({error: 'Esta categoria ja existe'})
       }   
    }).catch(error => {
        res.status(302).json({error: error.message})
    })
   } else {
        res.status(404)
    }
})

router.get('/categories', authMiddleware, (req, res) => {
    Category.findAll().then(categories => {
        if(categories){
            res.status(200).json({categories})
        } else {
            res.status(404).json({error: 'Nenhuma categoria foi encotrada'})
        }
    }).catch(error => {
        res.status(500).json({error: error.message})
    })
})

router.get('/category/:id', authMiddleware, (req, res) => {
    let id = req.params.id;
    Category.findOne(
        {
            where: {id: id}
        }
    ).then(category => {
        if(category){
            res.status(200).json({category})
        } else {
            res.status(404).json({error: 'Nenhuma categoria foi encotrada'})
        }
    }).catch(error => {
        res.status(500).json({error: error.message})
    })
})

router.put('/category/:id', authMiddleware, (req, res) => {
    let id = req.params.id;
    let {category} = req.body;
    if(!category) {
        res.status(400).json({message: 'Nao pode cadastrar categoria vazia'})
    } else {
          Category.update({
    category: category,
    slug: slugify(category)
     },
     {
       where: {id: id} 
     }).then(categoryUpdate => {
      res.status(200).json({categoryUpdate})
    }).catch(error => {
        res.status(500).json({message: error.message})
    })
    }   
})

router.delete('/category/:id', (req, res) => {
    let id = req.params.id;
    Category.destroy({
        where: {id: id}
    }).then(categoryDelete => {
        if(categoryDelete > 0) {
            res.status(200).json({message: 'Categoria apagada com sucesso'})
        } else {
            res.status(404).json({message: 'Categoria não encontrada'})
        }
    }).catch(error => {
        res.status(500).json({message: 'Erro no servidor '+error.message})
    })
})

module.exports = router;
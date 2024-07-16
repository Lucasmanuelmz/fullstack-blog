const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/users", authMiddleware, (req, res) => {
  User.findAll()
    .then((users) => {
      if (!users) {
        res.status(404);
      } else {
        res.status(200).json({ users });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

let jwtSecret = '%$#%&%$#%&*^(^%&)(_)*';

router.post("/user", (req, res) => {
  let { username, firstname, lastname, email, phoneNumber, password } = req.body;

  User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (user) {
        res.status(302).json({ error: "O usuario ja existe" });
      } else {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        User.create({
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNumber: phoneNumber,
          password: hash,
        })
          .then(() => {
            res
              .status(200)
              .json({ message: "Registrou se com sucesso na plataforma!" });
          })
          .catch((error) => {
            res.status(400).json({ error: error.message });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/signin", (req, res) => {
  let { email, password } = req.body;
  User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
      jwt.sign({id: user.id, name: user.name, email: user.email, phoneNumber: user.phoneNumber}, 
        jwtSecret, {expiresIn: '72h'}, (error, token) => {
          if(error) {
            res.status(400).json({error: 'Erro ao autenticar se'})
          } else {
            res.status(200).json({ token: token});
          }
        }) 
      } else {
        res.status(401).json({ error: "Senha errada" });
      }
    })
    .catch((err) => {
      res.status(404).json({ error: err.message });
    });
});

router.get('/user', authMiddleware, (req, res) => {
  let {id} = req.body;
  User.findOne().then(user => {
    res.status(200).json({user})
  }).catch(error => {
    res.status(500).json({error: error.message})
  })
})

router.put('/user/:id',authMiddleware, (req, res) => {
  let id = req.params.id;
  let {username,
    about,
    fileUpload,
    path,
    firstname,
    lastname,
    email,
    country,
    streetAddress,
    phoneNumber,
    city,
    region,
    postalCode,
    comments,
    candidates,
    offers,
    pushNotifications} = req.body;

  if(username &&
    about &&
    fileUpload &&
    path &&
    firstname &&
    lastname &&
    email &&
    country &&
    streetAddress &&
    phoneNumber &&
    city &&
    region &&
    postalCode &&
    comments &&
    candidates &&
    offers &&
    pushNotifications) {
    User.findOne({
      where: {id: id}
    }).then(user => {
      if(user) {
         User.update({
          username,
          about,
          fileUpload,
          path,
          firstname,
          lastname,
          email,
          country,
          streetAddress,
          phoneNumber,
          city,
          region,
          postalCode,
          comments,
          candidates,
          offers,
          pushNotifications,
    }, {
      where: {id: id}
    }).then((user) => {
      res.status(200).json({user})
    }).catch(error => {
      res.status(500).json({message: 'Erro no servidor '+error.message})
    })
      } else {
        res.status(404).json({error: 'Usuario nao encontrado'})
      }
    }).catch(error => {
      res.status(404).json({error: 'Usuario nao encontrado '+error.message})
    })
   
  } else {
    res.status(401).json({error:'Não autorizado: Todos os campos devem ser preenchidos'})
  }
})

router.delete('/user/:id', authMiddleware, (req, res) => {
  let id = parseInt(req.params.id);
  if(id) {
    User.destroy({
      where: {id: id}
    }).then(() => {
      res.status(200).json({message: 'Conta de usuario apagado com sucesso!'})
    }).catch(error => {
      res.status(500).json({error: 'Nao foi possivel apagar a sua conta, tente mais tarde '+error.message})
    })
  } else {
    res.status(404).json({error: 'id nao encontrado'})
  }
})

module.exports = router;

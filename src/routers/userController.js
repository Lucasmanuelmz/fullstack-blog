const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

router.get("/signup", (req, res) => {
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

let jwtSecret = '%$#%&%$#%&*^(^%&)(_)*'

router.post("/signup", (req, res) => {
  let { firstname, lastname, email, phoneNumber, password } = req.body;

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
      res.status(500).res.json({ error: err.message });
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

module.exports = router;

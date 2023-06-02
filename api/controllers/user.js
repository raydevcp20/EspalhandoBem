const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userDAO = require('../DAO/user-DAO');
const user = new userDAO();

exports.list = async (req, res, next) => {
    try {
      const [result] = await user.list();
      res.status(200).json(result);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
}

exports.getbyId = async (req, res, next) => {
  try {
    let userID = req.params.id;
    const result = await user.listbyId(userID);

    let objFormated = await user.getById(result[0][0]);
      result[0] = objFormated[0][0];

    res.status(200).json(result[0]);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    // console.log(req.body)
    const result = await user.updateUser(req.body);
    // console.log(result[0].affectedRows)
    if(result[0].affectedRows > 0){
      res.status(200).json({ user : req.body, message: "User editado com sucesso"});
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.setFavorite = async (req, res, next) => {
  try {
    
    // console.log(userID)
    const result = await user.setFavorite(req.body);
    console.log(result[0].affectedRows)
    if(result[0].affectedRows > 0){
      res.status(200).json({ user : req.body, message: "User editado com sucesso"});
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return;

  try {
    bcrypt.hash(req.body.password, saltRounds)
    .then(async (hash) => {
      req.body.password = hash;
      const result = await user.createUser(req.body);

      if(result.status != "ERROR"){
          res.status(201).json(result);
      }else{
          res.status(400).json(result);
      }
    });
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return res.status(500);
  }
};

exports.login = async (req, res, next) => {
  let userID = req.body.userID;
  let password = req.body.password;
  try {
    let [userById] = await user.getByUserId(userID);
    
    if(userById[0].length === 0){
      res.status(404).json({ status: "ERROR",  result: 'CPF ou CNPJ não encontrado. Verifique se digitou corretamente.' });
    }else{  
      bcrypt.hash(password, saltRounds)
      .then((hash) => {
        bcrypt.compare(userById[0].password, hash)
        .then((result) => {
          if(result){
            const token = jwt.sign(
              { user: JSON.stringify(userById[0]) },
              'secretfortoken',
              { expiresIn: '2h' }
            );
            res.status(200).json({ status: "SUCCESS",  result: { token: token, user: userById[0] }});
          }else{
            res.status(404).json({ status: "ERROR",  result: 'Senha incorreta. Verifique se digitou corretamente.' });
          }
        });
      });
    }

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return res.status(500);
  }
};
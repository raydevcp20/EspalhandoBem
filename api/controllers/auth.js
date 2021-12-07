const { throws } = require('assert');
const { validationResult } = require('express-validator');
const md5 = require('md5');
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

exports.listbyId = async (req, res, next) => {
  try {
    const [result] = await user.listbyId();
    res.status(200).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

//   const name = req.body.name;
//   const email = req.body.email;
//   const password = req.body.password;

  try {

    // const userDetails = {
    //   name: name,
    //   email: email,
    //   password: password,
    // };
    req.body.password = md5(req.body.password);
    const result = await user.createUser(req.body);
    
    if(result != "Error: usuario já existente"){
        res.status(201).json({ message: 'User registered!' });
    }else{
        res.status(500).json({ message: 'Usuario já registrado' });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userLogged = await user.login(email);
    
    if (userLogged[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      res.status(error.statusCode).json({ message: 'A user with this email could not be found.' });
      throw error;
    }

    const storedUser = userLogged[0][0];
    let hashpassword = md5(password);

    const isEqual = hashpassword == storedUser.password;
    
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      res.status(error.statusCode).json({ message: 'Wrong password!' });
      throw error;
    }

    const token = jwt.sign(
      {
        userId: storedUser.id,
        email: storedUser.email,
      },
      'secretfortoken',
      { expiresIn: '2h' }
    );
    
    res.status(200).json({ token: token, user: storedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
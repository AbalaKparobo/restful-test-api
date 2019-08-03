const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator/check');

const Admin = require('../models/admin');
const User = require('../models/user');

exports.adminSignup = (req, res, next)=> {
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     const error = new Error('User signup validation failed')
    //     error.statusCode = 422;
    //     error.data = error.array();
    //     throw error;
    // }
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const username = req.body.username.toLowerCase();
    bcrypt.hash(password, 12)
      .then(hashedPassword => {
          Admin.create({
              email: email,
              password: hashedPassword,
              username: username
          }).then(result => {
          res.status(201).json({message: 'New Admin created successfully', userid: result.dataValues.id})
          })
          .catch(err => {
              if(!err.statusCode) { err.statusCode = 500; }
                next(err)
      });
    });
}

exports.adminLogin =(req, res, next) => {
  // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     const error = new Error('User signup validation failed')
    //     error.statusCode = 422;
    //     error.data = error.array();
    //     throw error;
    // }
  const email = req.body.email.toLowerCase();
  const password = req.body.password
  let user;
  Admin.findOne({
    where: {email: email}
  })
    .then(result => {
      if(!result) {
        const error = new Error('Invalid Login Details');
        error.statusCode = 401
        throw error;
      }
      user = result.dataValues;
      return bcrypt.compare(password, user.password); 
    })
    .then(isSame => {
      if(!isSame) {
        const error = new Error('Invalid Login Details');
        error.statusCode = 401
        throw error;
      }
      const token = jwt.sign({userEmail: user.email, userId: user.id}, process.env.jwt_secret, {expiresIn: '1h'});
      res.status(200).json({token: token, username: user.username, email: user.email})
    })
    .catch(err => {
      if(!err.statusCode) {err.statusCode = 500};
      next(err);
    })
}

exports.userSignup = (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const middlename = req.body.middlename;
  const password = req.body.password;
  const email = req.body.email.toLowerCase();;
  const dob = req.body.dob;
  const address = req.body.address;
  const ss = req.body.ss
  bcrypt.hash(password, 12)
  .then(hashedPassword => {
      User.create({
          email: email,
          password: hashedPassword,
          firstname: firstname,
          lastname: lastname,
          middlename: middlename,
          dob: dob,
          address: address,
          ss: ss
      })
      .then(result => {
      res.status(201).json({message: 'New user created successfully', userid: result.dataValues.id})
          console.log(result.dataValues)
      })
      .catch(err => {
        if(!err.statusCode) { err.statusCode = 500; }
          next(err);
  });
});
}

exports.userLogin =(req, res, next) => {
  // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     const error = new Error('User signup validation failed')
    //     error.statusCode = 422;
    //     error.data = error.array();
    //     throw error;
    // }
  const email = req.body.email.toLowerCase();
  const password = req.body.password
  let user;
  User.findOne({
    where: {email: email}
  })
    .then(result => {
      if(!result) {
        const error = new Error('Invalid Login Details');
        error.statusCode = 401
        throw error;
      }
      user = result.dataValues;
      return bcrypt.compare(password, user.password); 
    })
    .then(isSame => {
      if(!isSame) {
        const error = new Error('Invalid Login Details');
        error.statusCode = 401
        throw error;
      }
      // let passedUser = { ... user }
      const token = jwt.sign({
        userEmail: user.email, 
        UserId: user.id,
      }, process.env.jwt_secret,{expiresIn: '1h'});
      res.status(200).json({token: token, userId: user.id, firstname: user.firstname, lastname: user.lastname, middlename: user.middlename, email: user.email})
    })
    .catch(err => {
      if(!err.statusCode) { err.statusCode = 500 };
      next(err);
    })
}
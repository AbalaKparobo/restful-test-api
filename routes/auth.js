const express = require('express');

const router = express.Router();

const userContoller = require('../controllers/user');

router.post('/admin/signup', userContoller.adminSignup)

router.post('/admin/login', userContoller.adminLogin);

router.post('/user/register', userContoller.userSignup);

router.post('/user/login', userContoller.userLogin);

module.exports = router;


// heroku addons:create cleardb:ignite -a bank-software-test
// Creating cleardb:ignite on bank-software-test... free
// Created cleardb-tetrahedral-40843 as CLEARDB_DATABASE_URL
// Use heroku addons:docs cleardb to view documentation


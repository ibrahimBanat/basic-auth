'use strict';

const express = require('express');
let router = express.Router();
const basic = require('./middleware/basic');
const bcrypt = require('bcrypt');
const User = require('./models/users-model');

//sign-in

router.post('/signin', basic, signinhandler);

async function signinhandler(req, res) {
  res.json(req.user);
}

//sign-up
router.post('/signup', signUpHandler);

async function signUpHandler(req, res) {
  try {
    let { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    const record = await user.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
}

// test 500
router.get('/bad', badErrorHandler);

function badErrorHandler(req, res, next) {
  next('somethign went wrong');
}
module.exports = router;

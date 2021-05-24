'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const Users = require('../models/users-model');
/**
 *
 * @param {Object} req Http request object and it's properties
 * @param {Object} res Http request object and it's properties
 * @param {*} next
 */
module.exports = async (req, res, next) => {
  try {
    let encoded = req.headers.authorization.split(' ')[1];
    let decoded = base64.decode(encoded);
    let [username, password] = decoded.split(':');
    console.log('i am in ');
    let user = await Users.findOne({ username });
    console.log(user);
    if (user) {
      let isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        req.user = user;
        next();
      } else {
        next('sorry, wrong signin cresidentials');
      }
    } else {
      res.status(401).json({ error: 'sorry user does not exist' });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

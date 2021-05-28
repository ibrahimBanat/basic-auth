'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const usersSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//this casues a bug in the tests
// usersSchema.pre('save', async function () {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

// create a mongoose model
const Users = mongoose.model('users', usersSchema);

module.exports = Users;

const mongoose = require('mongoose');

//sets schema up to make a model for the incoming data 
const userSchema = new mongoose.Schema({
   email: String,
   password: String,
   isAdmin: Boolean,
   userId: String,
   isLoggedIn: Boolean
  });

  const User = mongoose.model('Users', userSchema);

  module.exports = User;
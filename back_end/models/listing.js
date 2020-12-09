const mongoose = require('mongoose');

//sets schema up to make a model for the incoming data 
const schema = new mongoose.Schema({
   description: String,
   type: String,
   price: String,
   title: String,
   userId: String
  });

  const Listing = mongoose.model('Listings', schema);

  module.exports = Listing;
const mongoose = require('mongoose');

//sets schema up to make a model for the incoming data 
const schema = new mongoose.Schema({
   description: {type: String, required: true},
   type: {type: String, required: true},
   price: {type: String, required: true},
   title: {type: String, required: true},
   userId: {type: String, required: true}
  });

  const Listing = mongoose.model('Listings', schema);

  module.exports = Listing;
const mongoose = require('mongoose');

//sets schema up to make a model for the incoming data 
const schema = new mongoose.Schema({
   message: String,
   userId: String,
   listingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Listings'},
   createdAt: Date, 
   fromOwner: Boolean
  });

  const Inquiry = mongoose.model('Inquiries', schema);

  module.exports = Inquiry;
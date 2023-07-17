const mongoose = require("mongoose");
// const crypto = require("crypto")

// buysellSchema schema 
const product = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    maxlength: 260
  },

  image: {
    type: Buffer,
  },

    companyId: {
    type: String,
    required: true
  },

  detail: {
    type: String,
    required: true,
    maxlength: 260
  },

  category: {
    type: String,
    required: true,
    maxlength: 100
  },

  date:{
    type:String
  },
  
  priceDetails:{
    type:String
  },

  address:{
    type:String
  },
  state:{
    type:String
  },
  country:{
    type:String
  },

  region:{
    type:String
  },
  pincode:{
    type:String
  }
  


});
// ======================
const Product = mongoose.model("Product", product);

// exporting buysellSchema
module.exports = Product;
// ======================

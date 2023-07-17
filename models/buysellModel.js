const mongoose = require("mongoose");
// const crypto = require("crypto")

// buysellSchema schema 
const buysellSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    maxlength: 260

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

  quantity: {
    type: String,
    required: true,
    maxlength: 1000
  },

  contactname: {
    type: String,
    required: true,

    maxlength: 1000
  },

  email: {
    type: String,
    required: true,
    maxlength: 1000
  },

  contactnumber: {
    type: String,
    required: true,
    maxlength: 1000
  },

  address: {
    type: String,
    required: true,
    maxlength: 1000
  },
  region:{
    type:String
  },

  state: {
    type: String,
    required: true,
    maxlength: 1000
  },

  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000
  },

  pincode: {
    type: String,
    required: true,
    length: 6

  },

  date: {
    type: String,

  }



});
// ======================
const BuysellSchema = mongoose.model("Buysell", buysellSchema);

// exporting buysellSchema
module.exports = BuysellSchema;
// ======================

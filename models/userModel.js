const mongoose = require("mongoose");
const crypto = require("crypto")

// user schema 
const userSchema = new mongoose.Schema({
  companyEmail: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    unique: true,
    sparse: true

  },

  password: {
    type: String,
    required: true,
    maxlength: 260
  },

  companyName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },

  contactNumber: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000
  },

  state: {
    type: String,
    required: false,
    maxlength: 1000
  },

  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000
  },

  continent: {
    type: String,
    minlength: 2,
    maxlength: 1000
  },

  pincode: {
    type: String,
    required: true,
    length: 6

  },

  companyInfo: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000
  },

  buisnessType: {
    type: String,
    required: true,
  },

  yearOfEstablise: {
    type: String,
    required: true,
  },
  isVerified: {      // to check if the user has verified the email , default false
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    default: ''
  },
  is_online: {
    type: Boolean,
    default: false
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
},
  { timestamps: true }
);

// ======================
const UserSchema = mongoose.model("User", userSchema);

// exporting userschema
module.exports = UserSchema;
// ======================

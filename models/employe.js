const mongoose = require("mongoose");

const employeSchema = mongoose.Schema({
  username: String,
  userlastname : String,
  email: String,
  password: String,
  token: String,
  isAdmin: Boolean,
  tel: Number,
  numberstreet: Number,
  streetname: String,
  postalcode: Number,
  city: String,
});

const Employe = mongoose.model("employes", employeSchema);

module.exports = Employe;

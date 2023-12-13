const mongoose = require("mongoose");

const adressSchema= mongoose.Schema({
    streetNumber: Number,
    street: String,
    city: String,
    postalCode: Number,
})

const patientsSchema = mongoose.Schema({
  lastName: String,
  firstName: String,
  address: adressSchema,
  phone: String,
  SSnumber: String,
  mutuelle: String,
  valide: String,
  interventions: { type: mongoose.Schema.ObjectId, ref: "interventions" },
  token: String,
});

const Patient = mongoose.model("patients", patientsSchema);

module.exports = Patient,adressSchema;

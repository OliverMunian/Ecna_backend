const mongoose = require("mongoose");

const vehiculesSchema = mongoose.Schema({
  plaque: String,
  type: String,
  etat: String,
  SIREN: String,
  interventions: [{ type: mongoose.Schema.ObjectId, ref: "interventions" }],
});

const Vehicule = mongoose.model("vehicules", vehiculesSchema);

module.exports = Vehicule;

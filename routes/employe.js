var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const Employe = require("../models/employe");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

// Route SignUp (testé)
router.post("/signup", (req, res) => {
  // Verification des champs renvoyés du front avec le module checkBody
  if (!checkBody(req.body, ["username", "password", "email"])) {
    res.json({ result: false, error: "Champs vides ou manquants" });
    return;
  }
  // Cryptage mdp
  let hash = bcrypt.hashSync(req.body.password, 10);
  // Generation token
  let token = uid2(32);
  // Check si user existe déja dans la BDD
  Employe.findOne({ username: req.body.username }).then((userData) => {
    if (userData === null) {
      const newEmploye = new Employe({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: token,
        isAdmin: false,
      });
      newEmploye
        .save()
        .then((data) => res.json({ message: "employé créé", data }));
    } else {
      res.json({
        result: false,
        error: "L'utilisateur existe déjà",
      });
    }
  });
});

// Route signIn (testé)
router.post("/signin", (req, res) => {
  // Verification des champs renvoyés du front avec le module checkBody
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Un ou plusieurs champs sont vides" });
    return;
  }
  Employe.findOne({ username: req.body.username }).then((data) => {
    // Si le nom ainsi que le mot de passe correspondent, on renvoit true et le token
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({
        result: true,
        username: data.username,
        token: data.token,
      });
    } else {
      // Si non, renvoyer false et message d'erreur
      res.json({
        result: false,
        error: "Mauvais identifiant ou mot de passe",
      });
    }
  });
});

router.get("/:token", (req, res) => {
  Employe.findOne(
    { token: req.params.token }
  ).then((data) => {
    if (data) {
        console.log(data)
      res.json({
        result: true,
        email: data.email,
        username: data.username,
        userlastname: data.userlastname,
        tel: data.tel,
        numberstreet: data.numberstreet,
        streetname: data.streetname,
        city: data.city,
        postalcode: data.postalcode
      });
    } else {
      res.json({
        result: false,
        error: "Aucun utilisateur trouvé",
      });
    }
  });
});

router.put("/:token", (req, res) => {
  console.log("res.params: ", req.params.token);
  Employe.findOneAndUpdate(
    { token: req.params.token },
    { ...req.body, token: req.params.token }
  ).then((data) => {
      console.log(data);
      if(!data){
        res.json({result: false, message:"la requête n'a pas pu aboutir"})
      }
      else{
        res.json({result: true, message:"Employe modifié !"})
      }
    //   if (data) {
    //     res.json({ result: true, message: "" })
    //     Employe.save().then((data)=>{
    //         console.log(data)
    //         res.json({result:true, message:"Ajout des champs supplémentaires validé !"})
    //     })
    //   }else{
    //     res.json({result: false, message:"la requête n'a pas pu aboutir"})
    //   }
    })
    .catch((error) => res.json({ error: error }));
});

module.exports = router;

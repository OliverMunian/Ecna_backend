require("dotenv").config();
require("./models/connection");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var nodemailer = require("nodemailer");

function sendMail() {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myemail,
        pass: password,
      },
    });
    const mailsConfig = {
      from: myemail,
      to: email,
      subject: "Test coding mail",
      text: "Bonjour ceci est un test",
    };
    transporter.sendMail(mailsConfig, function (error, infos) {
      if (error) {
        console.log(error);
        return reject({ message: "une erreur est survenue" });
      }
      return resolve({ message: "Envoi avec succès" });
    });
  });
}

var usersRouter = require("./routes/users");
var employesRouter = require("./routes/employe");
var interventionsRouter = require("./routes/interventions");
var patientsRouter = require("./routes/patients");
var vehiculesRouter = require("./routes/vehicules");

var app = express();

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/employe", employesRouter);
app.use("/interventions", interventionsRouter);
app.use("/patients", patientsRouter);
app.use("/vehicules", vehiculesRouter);

module.exports = app;

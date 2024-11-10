const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, "../templates");
// Sam was here2 again
require("dotenv").config();

const PORT = process.env.PORT;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://Yash:abcd@cluster0.mqmqb.mongodb.net/")
  .then(() => {
    console.log("mongo connected !");
  })
  .catch(() => {
    console.log("failed to connect !");
  });

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("Start");
});

app.get("/patient", (req, res) => {
  res.render("login");
});
app.post("/patient/", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  console.log(data);
  await collection.insertMany([data]);
  res.render("home");
});

app.get("/patient/signup", (req, res) => {
  res.render("signup");
});

app.post("/patient/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(data);
  await collection.insertMany([data]);
  res.render("home");
});

app.get("/patient/dashboard", (req, res) => {
  res.render("patientDashboard");
});

app.get("/provider", (req, res) => {
  res.render("login");
});
app.post("/provider/login", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  console.log(data);
  await collection.insertMany([data]);
  res.render("home");
});

app.get("/provider/signup", (req, res) => {
  res.render("providerSignup");
});
app.post("/provider/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(data);
  await collection.insertMany([data]);
  res.render("home");
});

app.get("/provider/dashboard", (req, res) => {
  res.render("providerDashboard");
});

app.listen(PORT, () => {
  console.log("port connected !");
});

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

collection = new mongoose.model("collection1", loginSchema);
module.exports = collection;

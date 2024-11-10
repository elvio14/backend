import express from "express";
import dotenv from "dotenv";
import { Patient, Nutritionist, Meal } from "../models.js";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

mongoose
  .connect("mongodb+srv://Yash:abcd@cluster0.mqmqb.mongodb.net/")
  .then(() => {
    console.log("mongo connected !");
  })
  .catch(() => {
    console.log("failed to connect to mongo !");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// home page
app.get("/", (req, res) => {
  res.render("Start");
});

// patient login
app.post("/patient/login", async (req, res) => {
  const { Email, Password } = req.body;
  const patient = await Patient.findOne({ Email, Password });
  if (patient) {
    res.json({ message: "Login successful", patient });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// patient signup
app.post("/patient/signup", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// patient dashboard
app.get("/patient/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/patient/:id", async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/patient/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// nutritionist login
app.post("/nutritionist/login", async (req, res) => {
  const { Email, Password } = req.body;
  const nutritionist = await Nutritionist.findOne({ Email, Password });
  if (nutritionist) {
    res.json({ message: "Login successful", nutritionist });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// nutritionist signup
app.post("/nutritionist/signup", async (req, res) => {
  try {
    const nutritionist = new Nutritionist(req.body);
    await nutritionist.save();

    res
      .status(201)
      .json({ message: "Nutritionist created successfully", nutritionist });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// nutrtionist dashboard
app.get("/nutritionist/dashboard", async (req, res) => {
  try {
    const nutritionist = await Nutritionist.findById(req.params.id).populate(
      "Patients"
    );
    if (!nutritionist)
      return res.status(404).json({ message: "Nutritionist not found" });
    res.json(nutritionist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/nutritionist/:id", async (req, res) => {
  try {
    const updatedNutritionist = await Nutritionist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedNutritionist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/nutritionist/:id", async (req, res) => {
  try {
    await Nutritionist.findByIdAndDelete(req.params.id);
    res.json({ message: "Nutritionist deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint to add patient to nutritionist’s patient list
app.post("/nutritionist/:id/add-patient", async (req, res) => {
  try {
    const nutritionist = await Nutritionist.findById(req.params.id);
    if (!nutritionist)
      return res.status(404).json({ message: "Nutritionist not found" });

    const patient = new Patient(req.body);
    await patient.save();

    nutritionist.Patients.push(patient);
    await nutritionist.save();

    res.json({ message: "Patient added to nutritionist's list", patient });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/patient/:id/add-Meal", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    const meal = new Meal(req.body);
    await meal.save();
    patient.Log.Meals.push(req.body);
    await patient.save();
    res.json({ message: "Meal added to the Patient's log", meal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/patient/:id/add-Meal", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(3000, () => {
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

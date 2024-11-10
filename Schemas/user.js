import mongoose from "mongoose";

const NutritionistSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Patients: [PatientSchema],
});
    
const PatientSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Weight: { type: Double, required: true },
  Height: { type: Double, required: true },
  Diet: { type: DietSchema, required: true },
  Log: { type: LogSchema, required: true },
});

const DietSchema = new mongoose.Schema({
  CaloriesPerDay: { type: Double, required: true },
  Ratio: { type: RatioSchema, required: true },
});

const LogSchema = new mongoose.Schema({
  Meals: [MealSchema],
});

const RatioSchema = new mongoose.Schema({
  Carbohydrates: { type: Double, required: true },
  Proteins: { type: Double, required: true },
  Fats: { type: Double, required: true },
});

const MealSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Time: { type: String, required: true },
  Calories: { type: String, required: true },
  Nutrients: [NutrientSchema],
});

const NutrientSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Amount: { type: Double, required: true },
});

export default {
  NutritionistSchema,
  PatientSchema,
  DietSchema,
  LogSchema,
  RatioSchema,
  MealSchema,
  NutrientSchema,
};
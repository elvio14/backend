import mongoose from "mongoose";

const RatioSchema = new mongoose.Schema({
  Carbohydrates: { type: Number, required: true },
  Proteins: { type: Number, required: true },
  Fats: { type: Number, required: true },
});

const DietSchema = new mongoose.Schema({
  CaloriesPerDay: { type: Number, required: true },
  Ratio: { type: RatioSchema, required: true },
});

const NutrientSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Amount: { type: Number, required: true },
});

const MealSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Time: { type: String, required: true },
  Calories: { type: String, required: true },
  Nutrients: [NutrientSchema],
});

const LogSchema = new mongoose.Schema({
  Meals: [MealSchema],
});
const PatientSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Weight: { type: Number, required: true },
  Height: { type: Number, required: true },
  Diet: { type: DietSchema, required: true },
  Log: { type: LogSchema, required: true },
});

const NutritionistSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Patients: [PatientSchema],
});

export {
  NutritionistSchema,
  PatientSchema,
  DietSchema,
  LogSchema,
  RatioSchema,
  MealSchema,
  NutrientSchema,
};

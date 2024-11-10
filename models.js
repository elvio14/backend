import mongoose from "mongoose";
import {
  NutritionistSchema,
  PatientSchema,
  DietSchema,
  LogSchema,
  RatioSchema,
  MealSchema,
  NutrientSchema,
} from "./Schemas/user.js";

const Nutritionist = mongoose.model("Nutritionist", NutritionistSchema);
const Patient = mongoose.model("Patient", PatientSchema);
const Diet = mongoose.model("Diet", DietSchema);
const Log = mongoose.model("Log", LogSchema);
const Ratio = mongoose.model("Ratio", RatioSchema);
const Meal = mongoose.model("Meal", MealSchema);
const Nutrient = mongoose.model("Nutrient", NutrientSchema);

export { Nutritionist, Patient, Diet, Log, Ratio, Meal, Nutrient };

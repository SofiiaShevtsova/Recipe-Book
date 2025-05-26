import { Schema, model, models } from "mongoose";

const RecipeSchema = new Schema({
  category: {
    type: String,
    require: [true, "Area must exists!"],
  },
  area: {
    type: String,
    require: [true, "Area must exists!"],
  },
  strInstructions: {
    type: String,
    require: [true, "Instructions must exists!"],
  },
  strMeal: {
    type: String,
    require: [true, "Meal must exists!"],
  },
  image: {
    type: String,
    require: [true, "Image must exists!"],
  },
  strIngredient1: {
    type: String,
    require: [true, "Image must exists!"],
  },
  strMeasure1: {
    type: String,
    require: [true, "Image must exists!"],
  },
});

const Recipe = models.Recipe || model("Recipe", RecipeSchema);

export default Recipe;

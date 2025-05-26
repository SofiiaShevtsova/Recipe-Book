import { FilterOptions } from "@/commons/types";
import RecipeList from "@/components/recipe-list";
import Recipe from "@/models/recipe";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Home = async ({ searchParams }: any) => {
  let allRecipe = [];
  const filtersOptions: FilterOptions = {};

  const area = searchParams.area || "";
  const ingredient = searchParams.ingredient || "";
  const category = searchParams.category || "";

  try {
    const categories = await Recipe.distinct("category");
    const areaList = await Recipe.distinct("area");

    filtersOptions.categories = categories.filter((c) => !!c);
    filtersOptions.areaList = areaList.filter((a) => !!a);

    const filter: {
      area?: { $regex: string; $options: string };
      category?: { $regex: string; $options: string };
      ingredient?: string;
      $or?: {
        [key: string]: { $regex: string; $options: string };
      }[];
    } = {};
    const orConditions: {
      [key: string]: { $regex: string; $options: string };
    }[] = [];

    if (area) {
      filter.area = { $regex: area, $options: "i" };
    }
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }
    if (ingredient) {
      const ingredientRegex = { $regex: ingredient, $options: "i" };

      for (let i = 1; i <= 10; i++) {
        orConditions.push({ [`strIngredient${i}`]: ingredientRegex });
      }
    }

    if (orConditions.length > 0) {
      filter.$or = orConditions;
    }
    allRecipe = await Recipe.find(filter);
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }

  return (
    <RecipeList
      list={allRecipe}
      filters={{ category, area, ingredient }}
      filterOptions={filtersOptions}
    />
  );
};

export default Home;

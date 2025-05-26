import { FilterOptions } from "@/commons/types";
import RecipeList from "@/components/recipe-list";
import Recipe from "@/models/recipe";
import { Container, Heading } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Home = async ({ searchParams }: any) => {
  let allRecipe = [];
  const filtersOptions: FilterOptions = {};

  try {
    const { area, ingredient, category } = await searchParams;

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
    allRecipe = JSON.parse(JSON.stringify(await Recipe.find(filter)));

    return (
      <RecipeList
        list={allRecipe}
        filters={{ category, area, ingredient }}
        filterOptions={filtersOptions}
      />
    );
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }
  return (
    <Container>
      <Heading size="4xl" textAlign="center" mb="5">
        Server doesn&apos;t work
      </Heading>
    </Container>
  );
};

export default Home;

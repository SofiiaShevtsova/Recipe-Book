import { Container, Heading } from "@chakra-ui/react";

import Recipe from "@/models/recipe";
import ShowRecipe from "@/components/recipe";
import { Meal } from "@/commons/types";

const ShowRecipePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  let meal: Meal | null = null;
  if (id) {
    try {
      meal = await Recipe.findById(id);
    } catch (er) {
      console.error("Not found", er);
    }

    return meal ? (
      <ShowRecipe meal={meal} />
    ) : (
      <Container>
        <Heading size="4xl" textAlign="center" mb="5">
          Not found
        </Heading>
      </Container>
    );
  }
  return (
    <Container>
      <Heading size="4xl" textAlign="center" mb="5">
        ID not found
      </Heading>
    </Container>
  );
};

export default ShowRecipePage;

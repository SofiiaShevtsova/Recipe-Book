"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Container, Heading } from "@chakra-ui/react";
import { Meal } from "@/commons/types";
import ShowRecipe from "@/components/recipe";

const ShowRecipePage = () => {
  const { id: recipeId } = useParams();
  const [meal, setMeal] = useState<Meal>();

  useEffect(() => {
    if (typeof recipeId === "string") {
      const getRecipe = async () => {
        const response = await fetch(`/api/recipe/${recipeId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data from API:", structuredClone(data));

          setMeal(data);
        }
      };

      getRecipe();
    }
  }, [recipeId]);

  return meal?.idMeal ? (
    <ShowRecipe meal={meal} />
  ) : (
    <Container>
      <Heading size="4xl" textAlign="center" mb="5">
        Not found
      </Heading>
    </Container>
  );
};

export default ShowRecipePage;

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Container, Heading } from "@chakra-ui/react";
import { Meal } from "@/commons/types";
import ShowRecipe from "@/components/recipe";

const ShowRecipePage = () => {
  const params = useParams();
  const postId = params.id;
  const [meal, setMeal] = useState<Meal>();

  useEffect(() => {
    if (typeof postId === "string") {
      const getRecipe = async () => {
        const response = await fetch(`/api/recipe/${postId}`);
        const data = await response.json();

        setMeal(data);
      };

      getRecipe();
    }
  }, [postId]);

  if (meal) {
    return <ShowRecipe meal={meal} />;
  }

  return (
    <Container>
      <Heading size="4xl" textAlign="center" mb="5">
        Not found
      </Heading>
    </Container>
  );
};

export default ShowRecipePage;

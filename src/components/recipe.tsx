"use client";

import { FC, useMemo } from "react";
import NextLink from "next/link";

import {
  Text,
  Badge,
  Box,
  Card,
  Container,
  HStack,
  Image,
} from "@chakra-ui/react";
import { Meal } from "@/commons/types";
import RightSidebar from "./sidebar";

type ShowRecipeProps = {
  meal: Meal;
};

const ShowRecipe: FC<ShowRecipeProps> = ({ meal }) => {
  const listOfIngredient = useMemo(() => {
    const list: string[] = [];
    let ingredient = "";
    let index = 1;

    do {
      ingredient = meal[`strIngredient${index}`];
      if (list.includes(ingredient)) {
        index = index + 1;
      } else {
        list.push(ingredient);
        index = index + 1;
      }
    } while (!!ingredient);

    return list;
  }, [meal]);

  return (
    <Container p="10">
      <RightSidebar category={meal.strCategory} />
      <Card.Root flexDirection="row" overflow="hidden" maxW="xl" mx="auto">
        <Image
          objectFit="cover"
          maxW="200px"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <Box>
          <Card.Body>
            <Card.Title textAlign="center" mb="2">
              {meal.strMeal}
            </Card.Title>

            <Text textAlign="center" mb="2">
              <NextLink href={`/?a=${meal.strArea}`}>{meal.strArea}</NextLink>
            </Text>
            <Card.Description p="2" height={200} overflow="auto">
              {meal.strInstructions}
            </Card.Description>
            <HStack mt="4" flexWrap="wrap" justifyContent="center">
              {listOfIngredient.length &&
                listOfIngredient.map((i) => (
                  <NextLink key={i} href={`/?i=${i}`}>
                    <Badge>{i}</Badge>
                  </NextLink>
                ))}
            </HStack>
          </Card.Body>
        </Box>
      </Card.Root>
    </Container>
  );
};

export default ShowRecipe;

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
  Stack,
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
    <Container minH='100vh' py='4'>
      <Stack alignItems='flex-start'>
        <RightSidebar category={meal.strCategory} />
        <Card.Root
        alignSelf='center'
          flexDirection="row"
          overflow="hidden"
          maxW="900px"
          colorPalette="teal"
        >
          <Image
            objectFit="cover"
            maxW="400px"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
          <Box>
            <Card.Body p="4">
              <Card.Title color="teal.500" textAlign="center" mb="2">
                {meal.strMeal}
              </Card.Title>

              <Text textAlign="center" mb="2" color="teal.500" textDecoration='underline'>
                <NextLink href={`/?a=${meal.strArea}`}>{meal.strArea}</NextLink>
              </Text>
              <Card.Description
              fontSize='14px'
                color="teal.700"
                height={400}
                overflow="auto"
              >
                {meal.strInstructions}
              </Card.Description>
              <HStack mt="4" flexWrap="wrap" justifyContent="center">
                {listOfIngredient.length &&
                  listOfIngredient.map((i) =>
                    i ? (
                      <NextLink key={i} href={`/?i=${i}`}>
                        <Badge p="2" colorPalette="teal">
                          {i}
                        </Badge>
                      </NextLink>
                    ) : null
                  )}
              </HStack>
            </Card.Body>
          </Box>
        </Card.Root>
      </Stack>
    </Container>
  );
};

export default ShowRecipe;

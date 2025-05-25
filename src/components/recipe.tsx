"use client";

import { FC, useEffect, useMemo, useState } from "react";
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
  id: string;
};

const ShowRecipe: FC<ShowRecipeProps> = ({ id }) => {
  const [meal, setMeal] = useState<Meal>();
  const [noMeal, setNoMeal] = useState(false);

  const listOfIngredient = useMemo(() => {
    if (!meal) {
      return [];
    }
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

  useEffect(() => {
    if (typeof id === "string") {
      const getRecipe = async () => {
        try {
          const response = await fetch(`/api/recipe/${id}`);
          if (response.ok) {
            const data = await response.json();
            if (data[0]) {
              setMeal(data[0]);
            } else {
              throw Error("Not found");
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          setNoMeal(true);
        }
      };

      getRecipe();
    }
  }, [id]);

  if (noMeal) {
    return (
      <Container>
        <Text fontSize="24px" textAlign="center" mt="10">
          Not Found
        </Text>
      </Container>
    );
  }

  return meal ? (
    <Container minH="100vh" py="4">
      <Stack alignItems="flex-start">
        <RightSidebar category={meal.strCategory} />
        <Card.Root
          alignSelf="center"
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

              <Text
                textAlign="center"
                mb="2"
                color="teal.500"
                textDecoration="underline"
              >
                <NextLink href={`/?a=${meal.strArea}`}>{meal.strArea}</NextLink>
              </Text>
              <Card.Description
                fontSize="14px"
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
  ) : (
    <Container>
      <Text fontSize="24px" textAlign="center" mt="10">
        ...Loading
      </Text>
    </Container>
  );
};

export default ShowRecipe;

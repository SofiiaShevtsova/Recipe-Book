"use client";
import { ReactElement, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";

import {
  Card,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Meal } from "@/commons/types";
import Filter from "@/components/filter";
import { useSearchParams } from "next/navigation";

const RecipeList = (): ReactElement => {
  const searchParams = useSearchParams();

  const [recipeList, setRecipeList] = useState<Meal[] | []>([]);
  const [formData, setFormData] = useState<{
    i?: string;
    a?: string;
    c?: string;
  }>({});

  const filterList = useMemo(
    () => Object.values(formData).filter((v) => v),
    [formData]
  );

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(`/api/recipe?${searchParams.toString()}`);
      const data = await response.json();

      setRecipeList(data);
    };

    getRecipe();
  }, [filterList, searchParams]);

  return (
    <Container minH="100vh" py="4">
      <Heading color="teal.700" size="4xl" textAlign="center" mb="5">
        {filterList.length ? filterList.join("-") : "Recipe book"}
      </Heading>
      {recipeList.length ? (
        <>
          <Filter
            setRecipeList={setRecipeList}
            formData={formData}
            setFormData={setFormData}
          />
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap="6"
            justifyContent="center"
          >
            {recipeList.map((recipe) => (
              <GridItem key={recipe.idMeal}>
                <NextLink href={`/recipe/${recipe.idMeal}`}>
                  <Card.Root
                    overflow="hidden"
                    h="100%"
                    color="teal.700"
                    colorPalette="teal"
                  >
                    <Image src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <Card.Body gap="2">
                      <Card.Title>{recipe.strMeal}</Card.Title>
                      {recipe.strInstructions && (
                        <Card.Description
                          color="teal.300"
                          maxH={200}
                          overflow="auto"
                        >
                          {recipe.strInstructions}
                        </Card.Description>
                      )}
                      {(recipe.strCategory || recipe.strArea) && (
                        <Text
                          textStyle="2xl"
                          fontWeight="medium"
                          letterSpacing="tight"
                          mt="2"
                        >
                          {`${recipe.strCategory || "-"} | ${
                            recipe.strArea || "-"
                          } `}
                        </Text>
                      )}
                    </Card.Body>
                  </Card.Root>
                </NextLink>
              </GridItem>
            ))}
          </Grid>
        </>
      ) : (
        <Text fontSize="24px" textAlign="center" mt="10">
          ...Loading
        </Text>
      )}
    </Container>
  );
};

export default RecipeList;

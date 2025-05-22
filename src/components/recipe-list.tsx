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
    <Container p="4" m="auto">
      <Heading size="4xl" textAlign="center" mb="5">
        {filterList.length ? filterList.join("-") : "Recipe book"}
      </Heading>
      <Filter
        setRecipeList={setRecipeList}
        formData={formData}
        setFormData={setFormData}
      />
      {recipeList.length ? (
        <Grid templateColumns="repeat(4, 1fr)" gap="6">
          {recipeList.map((recipe) => (
            <GridItem key={recipe.idMeal}>
              <NextLink href={`/recipe/${recipe.idMeal}`}>
                <Card.Root maxW="sm" overflow="hidden" h="100%">
                  <Image src={recipe.strMealThumb} alt={recipe.strMeal} />
                  <Card.Body gap="2" p="4">
                    <Card.Title>{recipe.strMeal}</Card.Title>
                    {recipe.strInstructions && (
                      <Card.Description maxH={200} overflow="auto">
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
                  <Card.Footer></Card.Footer>
                </Card.Root>
              </NextLink>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Text textAlign="center">Empty list</Text>
      )}
    </Container>
  );
};

export default RecipeList;

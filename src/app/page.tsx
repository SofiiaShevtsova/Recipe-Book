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
import { apiService } from "@/services/api-service";
import { Meal } from "@/commons/types";
import Filter from "@/components/filter";
import { useSearchParams } from "next/navigation";

const Home = (): ReactElement => {
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
    if (!filterList.length) {
      apiService.getAllRecipe().then((data) => {
        setRecipeList(data);
      });
    }
  }, [filterList]);

  useEffect(() => {
    if (searchParams.size) {
      setFormData({
        c: searchParams.get("c") || undefined,
        a: searchParams.get("a") || undefined,
        i: searchParams.get("i") || undefined,
      });
      apiService.getFilteredRecipe(searchParams.toString()).then((data) => {
        setRecipeList(data);
      });
    }
  }, []);

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
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {recipeList.map((recipe) => (
          <GridItem key={recipe.idMeal}>
            <NextLink href={`/recipe/${recipe.idMeal}`}>
              <Card.Root maxW="sm" overflow="hidden" h='100%'>
                <Image src={recipe.strMealThumb} alt={recipe.strMeal} />
                <Card.Body gap="2" p="4">
                  <Card.Title >{recipe.strMeal}</Card.Title>
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
    </Container>
  );
};

export default Home;

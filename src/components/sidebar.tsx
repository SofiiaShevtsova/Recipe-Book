"use client";
import { FC, useEffect, useState } from "react";
import NextLink from "next/link";

import {
  Button,
  Card,
  Drawer,
  Grid,
  GridItem,
  Portal,
  Image,
  Text,
} from "@chakra-ui/react";
import { Meal } from "@/commons/types";

type RightSidebarProps = {
  category: string;
};

const RightSidebar: FC<RightSidebarProps> = ({ category }) => {
  const [openRightSidebar, setOpenRightSidebar] = useState(false);
  const [recipeList, setRecipeList] = useState<Meal[]>();

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(`/api/recipe?c=${category}`);
      const data = await response.json();

      setRecipeList(data);
    };

    getRecipe();
  }, []);

  return (
    <Drawer.Root
      open={openRightSidebar}
      onOpenChange={(e) => setOpenRightSidebar(e.open)}
    >
      <Drawer.Trigger asChild>
        <Button mb="4" variant="outline" p="4">
          Open Similar Recipe
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content p="6" maxWidth={500} height="100vh" overflow="auto">
            <NextLink href={`/?c=${category}`}>
              <Button p="4">To other recipe</Button>
            </NextLink>
            {recipeList?.length && (
              <Grid mt="10" templateColumns="repeat(2, 1fr)" gap="6">
                {recipeList.map((recipe) => (
                  <GridItem key={recipe.idMeal}>
                    <NextLink href={`/recipe/${recipe.idMeal}`}>
                      <Card.Root maxW="sm" overflow="hidden">
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
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default RightSidebar;

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
        <Button mb="4" variant="outline" colorPalette='teal'>
          Open Similar Recipe
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content maxWidth={500} height="100vh" overflow="auto" p='6'>
            {recipeList?.length && (
              <Grid
                mt="12"
                templateColumns={[
                  "repeat(1, 1fr)",
                  undefined,
                  "repeat(2, 1fr)",
                ]}
                gap="6"
              >
                {recipeList.map((recipe) => (
                  <GridItem key={recipe.idMeal}>
                    <NextLink href={`/recipe/${recipe.idMeal}`}>
                      <Card.Root overflow="hidden">
                        <Image src={recipe.strMealThumb} alt={recipe.strMeal} />
                        <Card.Body gap="2">
                          <Card.Title color='teal.700'>{recipe.strMeal}</Card.Title>
                          {recipe.strInstructions && (
                            <Card.Description color='teal.500' maxH={200} overflow="auto">
                              {recipe.strInstructions}
                            </Card.Description>
                          )}
                          {(recipe.strCategory || recipe.strArea) && (
                            <Text
                            color='teal.700'
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
            )}
            <NextLink href={`/?c=${category}`}>
              <Button colorPalette='teal' position="fixed" top="20px" right="40px">
                To other recipe
              </Button>
            </NextLink>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default RightSidebar;

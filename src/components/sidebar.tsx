"use client";
import { FC, useState } from "react";
import NextLink from "next/link";

import {
  Button,
  Card,
  Drawer,
  Grid,
  GridItem,
  Portal,
  Image,
} from "@chakra-ui/react";
import { Meal } from "@/commons/types";

type RightSidebarProps = {
  category: string;
  list: Meal[];
};

const RightSidebar: FC<RightSidebarProps> = ({ category, list }) => {
  const [openRightSidebar, setOpenRightSidebar] = useState(false);

  return (
    <Drawer.Root
      open={openRightSidebar}
      onOpenChange={(e) => setOpenRightSidebar(e.open)}
    >
      <Drawer.Trigger asChild>
        <Button mb="4" variant="outline" colorPalette="teal">
          Open Similar Recipe
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content maxWidth={500} height="100vh" overflow="auto" p="6">
            {list?.length && (
              <Grid
                mt="12"
                templateColumns={[
                  "repeat(1, 1fr)",
                  undefined,
                  "repeat(2, 1fr)",
                ]}
                gap="6"
              >
                {list.map((recipe) => (
                  <GridItem key={recipe._id}>
                    <NextLink href={`/recipe/${recipe._id}`}>
                      <Card.Root overflow="hidden">
                        <Image src={recipe.image} alt={recipe.strMeal} />
                        <Card.Body gap="2">
                          <Card.Title color="teal.700">
                            {recipe.strMeal}
                          </Card.Title>
                          {recipe.strInstructions && (
                            <Card.Description
                              color="teal.500"
                              maxH={200}
                              overflow="auto"
                            >
                              {recipe.strInstructions}
                            </Card.Description>
                          )}
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                      </Card.Root>
                    </NextLink>
                  </GridItem>
                ))}
              </Grid>
            )}
            <NextLink href={`/?category=${category}`}>
              <Button
                colorPalette="teal"
                position="fixed"
                top="20px"
                right="40px"
              >
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

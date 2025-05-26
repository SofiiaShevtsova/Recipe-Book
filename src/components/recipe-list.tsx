import { FC, ReactElement } from "react";
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
import Filter from "./filter";
import { FilterOptions, Filters, Meal } from "@/commons/types";

type RecipeListProps = {
  list: Meal[];
  filters: Filters;
  filterOptions: FilterOptions;
};

const RecipeList: FC<RecipeListProps> = ({
  list,
  filters,
  filterOptions,
}): ReactElement => {
  const activeFilters = Object.values(filters).filter((v) => !!v);

  return (
    <Container minH="100vh" py="4">
      <Heading color="teal.700" size="4xl" textAlign="center" mb="5">
        {activeFilters.length ? activeFilters.join("-") : "Recipe book"}
      </Heading>
      <Filter filters={filters} filterOptions={filterOptions} />
      {list.length ? (
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
          {list.map((recipe) => (
            <GridItem key={recipe._id}>
              <NextLink href={`/recipe/${recipe._id}`}>
                <Card.Root
                  overflow="hidden"
                  h="100%"
                  color="teal.700"
                  colorPalette="teal"
                >
                  <Image src={recipe.image} alt={recipe.strMeal} />
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
                    {(recipe.category || recipe.area) && (
                      <Text
                        textStyle="2xl"
                        fontWeight="medium"
                        letterSpacing="tight"
                        mt="2"
                      >
                        {`${recipe.category || "-"} | ${recipe.area || "-"} `}
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
        <Text fontSize="24px" textAlign="center" mt="10">
          Empty list
        </Text>
      )}
    </Container>
  );
};

export default RecipeList;

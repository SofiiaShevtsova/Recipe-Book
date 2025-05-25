import { Container, Text } from "@chakra-ui/react";
import ShowRecipe from "@/components/recipe";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShowRecipePage = async ({ params }: any) => {
  const { id } = await params;

  return id ? (
    <ShowRecipe id={id} />
  ) : (
    <Container>
      <Text fontSize="24px" textAlign="center" mt="10">
        ...Loading
      </Text>
    </Container>
  );
};

export default ShowRecipePage;

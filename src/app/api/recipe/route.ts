import { apiService } from "@/services/api-service";

export const GET = async (req:Request) => {
  try {
    const searchParams = req.url.split("?")[1];

    if (searchParams) {
      const filteredRecipe = await apiService.getFilteredRecipe(searchParams);
      return new Response(JSON.stringify(filteredRecipe), { status: 200 });
    }

    const allRecipe = await apiService.getAllRecipe();

    return new Response(JSON.stringify(allRecipe), { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response("Fail!", { status: 500 });
  }
};

import { apiService } from "@/services/api-service";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const recipe = await apiService.getRecipe(id);

    return new Response(JSON.stringify(recipe), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response("Fail!", { status: 500 });
  }
};

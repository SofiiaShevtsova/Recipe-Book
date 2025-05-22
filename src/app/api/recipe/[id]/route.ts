import { apiService } from "@/services/api-service";

export const GET = async (
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }:any
) => {
  try {
    const { id } = await params;
    
    if (!id) {
      return new Response("Missing recipe ID", { status: 400 });
    }
    const recipe = await apiService.getRecipe(id);

    return new Response(JSON.stringify(recipe), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response("Fail!", { status: 500 });
  }
};

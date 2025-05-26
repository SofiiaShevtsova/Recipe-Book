export type Meal = {
  _id: string;
  area: string;
  category: string;
  strMeal: string;
  image: string;
  strInstructions: string;
  [key: string]: string;
};

export type FilterOptions = { areaList?: string[]; categories?: string[] };

export type Filters = {
      area?: string;
      category?: string;
      ingredient?: string;
    }
import { Meal } from "@/commons/types";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "";

export class APIService {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  getAllRecipe: () => Promise<Meal[]> = () =>
    fetch(this.baseURL + "search.php?s=", {
      method: "GET",
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) => data.meals)
      .catch((error) => {
        throw new Error(error.statusText);
      });

  getFilteredRecipe: (filterString: string) => Promise<Meal[]> = (
    filterString
  ) =>
    fetch(this.baseURL + "filter.php?" + filterString, {
      method: "GET",
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) => data.meals)
      .catch((error) => {
        throw new Error(error.statusText);
      });

  getAllCategories: () => Promise<string[]> = () =>
    fetch(this.baseURL + "list.php?c=list", {
      method: "GET",
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) =>
        data.meals.map((c: { strCategory: string }) => c.strCategory)
      )
      .catch((error) => {
        throw new Error(error.statusText);
      });

  getAllArea: () => Promise<string[]> = () =>
    fetch(this.baseURL + "list.php?a=list", {
      method: "GET",
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) => data.meals.map((c: { strArea: string }) => c.strArea))
      .catch((error) => {
        throw new Error(error.statusText);
      });

  getRecipe: (id: string) => Promise<Meal> = (id) =>
    fetch(this.baseURL + `lookup.php?i=${id}`, {
      method: "GET",
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) => data.meals[0])
      .catch((error) => {
        throw new Error(error.statusText);
      });
}

export const apiService = new APIService(BASE_API_URL);

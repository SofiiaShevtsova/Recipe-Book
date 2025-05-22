"use client";
import { ReactElement, Suspense } from "react";

import RecipeList from "@/components/recipe-list";

const Home = (): ReactElement => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecipeList />
    </Suspense>
  );
};

export default Home;

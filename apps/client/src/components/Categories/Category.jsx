import React from "react";
import axios from "axios";
import TitleWithBar from "../TitleWithBar/TitleWithBar";
import CategorySlider from "../Categories/CategorySlider";
import { cookies } from "next/headers";

async function getCategories() {
  try {
    const url = new URL(`/categories`, process.env.NEXT_SERVER_URL);

    console.log(url.href);

    const response = await fetch(url.href);
    const data = await response.json();

    console.log("What is our categories", data);

    return data.categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Category() {
  const categories = await getCategories();

  console.log(categories);

  return (
    <div className="container mx-auto w-full h-fit mt-10 lg:mt-[3rem]">
      <TitleWithBar title={"Browse By Category"} />
      <div className="w-full flex justify-between items-center mb-20 max-[597px]:mb-6">
        <span className="text-2xl xl:text-3xl font-bold max-[597px]:text-[20px] text-nowrap">See Our Categories</span>
      </div>
      <CategorySlider items={categories || []} />
    </div>
  );
}

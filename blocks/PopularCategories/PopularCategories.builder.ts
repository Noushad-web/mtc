import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

const MostPopularCategories = dynamic(async () => {
  return (await import('./PopularCategories')).default;
})

Builder.registerComponent(MostPopularCategories, {
  name: 'Most Popular Categories',
  image: 'https://casino-for-sale.info/wp-content/uploads/2017/10/Popular-Casino-Games.png',
})
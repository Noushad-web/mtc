import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

const FeatureProduct = dynamic(async () => {
  return (await import('./FeatureProduct')).default
})

Builder.registerBlock(FeatureProduct, {
  name: 'featured product',
  image: 'https://cdn3.iconfinder.com/data/icons/black-solid-labels-2/128/featured_label_new_favorite_star-512.png'
})
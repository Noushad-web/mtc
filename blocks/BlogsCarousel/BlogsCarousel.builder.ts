import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

const BlogCarouselMode = dynamic(async () => {
  return (await import('./BlogsCarousel')).default;
})

Builder.registerComponent(BlogCarouselMode, {  
  name: 'blog-carousel',
  image: 'https://cdn3.iconfinder.com/data/icons/online-shop-2/100/service-07-512.png'
})

import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

const SingleBlog = dynamic(async () => {
  return  (await import('./SingleBlog')).default
})

Builder.registerComponent(SingleBlog, {
  name:'Single Blog'
})
import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

const ArchiveBlog = dynamic(async () => {
  return  (await import('./ArchiveBlogs')).default
})

Builder.registerComponent(ArchiveBlog, {
  name:'Archive Blog', 
  image: 'https://cdn-icons-png.flaticon.com/512/3959/3959420.png',
  inputs: [
    {
      name: 'numberOfBlogs',
      type: 'number',
      allowedFileTypes: ['number'],
      defaultValue: 0
    }

  ]
})
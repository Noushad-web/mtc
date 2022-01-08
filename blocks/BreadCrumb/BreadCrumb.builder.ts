import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

const Bread = dynamic(async () => {
  return (await import('./BreadCrumb')).default
})
Builder.registerComponent(Bread, {
  name:'Bread crumb',
  image: 'https://cdn-icons.flaticon.com/png/512/2353/premium/2353918.png?token=exp=1641196394~hmac=378c3a344d58267a9518a075536856eb'
})

import React from "react";
import Breadcrumbs from 'nextjs-breadcrumbs'
// import { AiOutlineHome } from "react-icons/bs";
// import { Builder } from "@builder.io/react";
import { IoIosHome } from "react-icons/io";

 const BreadCrumb: React.FC = () => {
  return (
    <Breadcrumbs
      inactiveItemClassName="breadcrumb"
      activeItemClassName="breadcrumb--active breadcrumb"
      containerClassName="breadcrumb__wrapper"
      listClassName="breadcrumb__listStyle"
      rootLabel='Home'
      // transformLabel={(title) => <IoIosHome />}
    />
  )
}

export default BreadCrumb;
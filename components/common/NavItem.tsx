import Dropdown from "../Dropdown/Dropdown";
import { Item } from "@lib/swell/storefront-data-hooks/src/types";

export default function NavItem({ navItemData} : {navItemData: Item}) {
  //  console.log(navItemData)
  return (
    <>
      <Dropdown
        btnStyle="navItem__btnStyle"
        name={navItemData.name}
        url={`/categories/${navItemData.value?.slug}`}
      >
       {
         navItemData.items.map((eachSubCateg)=> {
           return eachSubCateg?.items?.map((eachNav, index) => {
            return (
              <Dropdown.Option
              key={eachNav.value.id}
              optionStyle={`navItem__btnStyle__option`}
              href={`/categories/${eachNav.value.slug}`}
              >
                {eachNav.name}
              </Dropdown.Option>
            )
           })
         })
       }
      </Dropdown>
    </>
  )
}

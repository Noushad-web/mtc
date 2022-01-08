import React from 'react'

const AllProduct = () => {
  return (
    <div>
      All Product
    </div>
  )
}

export default AllProduct








// import React, { useEffect, useState } from 'react'
// import swellConfig from '@config/swell'
// import swell from 'swell-js'
// import { getAllProductsList } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
// import { Product } from '@lib/swell/storefront-data-hooks/src/types'
// import { LoadingDots } from '@components/ui'
// import { ProductCard } from '@components/common'

// interface Pages {
//   start: number
//   end: number
// }

// interface AllProductObject {
//   count: number
//   page: number
//   pages: {
//     [key: string]: Pages
//   }
//   results: Product[]
// }


// const AllProduct = () => {
//   const [allProductObject, setAllProductObject] = useState<AllProductObject>()
//   const [numberOfPages, setNumberOfPages] = useState<Pages[]>()
//   const [productList, setProductList] = useState<Product[]>();

//   useEffect(() => {
//     getAllProductsList(1, 12)
//       .then((result) => setAllProductObject(result))
//       .catch((err) =>
//         console.error(
//           'error occurs while fetching all products list see allproduct.tsx: ',
//           err
//         )
//       )
//   }, [])

//   useEffect(() => {
//     if (!allProductObject) return

//     let { count, page, pages, results } = allProductObject //destructuring the allProduct

//     setProductList(results); //set product lists
//     setNumberOfPages(Object.values(pages)) // setting the number of the pages


//   }, [allProductObject])

//   useEffect(() =>  {
//     productList && (
//     console.log('===================================='),
//     console.log(productList),
//     console.log('====================================')
//     )
//   }, [productList])

//   return (
//     <>
//     {productList ?
//       <div className="product__wrapper">
//         {productList.map((product) => {
//           return <ProductCard product={product} key={String(product.id)}/>
//         })}
//       </div>
//     : <LoadingDots/>    
//     }
//     </>
//   )
// }

// export default AllProduct

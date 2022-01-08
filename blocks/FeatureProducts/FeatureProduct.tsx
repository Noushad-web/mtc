import { getCategory } from "@lib/swell/storefront-data-hooks/src/api/operations-swell"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface IfeaturedProducts {
  id: string
  products: {
    results: [
      {
        id: string
        name: string,
        slug: string,
        images: [          
          {
            file: {
              height: number,
              width: number,
              url: string          
            }
          }
        ]
      }
    ]
  }    
}

const FeatureProduct = () => {

  const [product, setProduct] = useState<IfeaturedProducts>();

  const featuredCateg = async () => {
    return await getCategory('featured');
  }

  useEffect(()=> {
    featuredCateg().then((data)=> {
      setProduct(data);
    }).catch((error) => {
      console.error('error occured while fetching featured product', error);
    })
  }, [])

  return (
    <div className="featureProduct__wrapper"> 
      {
        (product) ? 
          product.products.results.map((eachItem)=> {
            return (
              <Link href={`/shop/${eachItem.slug}`} key={eachItem.id} passHref>
                <div className="featureProduct" id={eachItem.id}>
                  <p className="featureProduct__heading">{eachItem.name}</p>
                  <figure className="featureProduct__img">
                    <Image
                      src={eachItem.images[0].file.url}
                      width={eachItem.images[0].file.width}
                      height={eachItem.images[0].file.height}
                      alt={eachItem.name}
                    />
                  </figure>
                  <span className="featureProduct__link">
                    More Info
                  </span>
                </div>
              </Link>
            )
          }) 
        : null
      }
    </div>
  )
}

export default FeatureProduct

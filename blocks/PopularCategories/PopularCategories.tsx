import { getParentCategories } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import buttonCurved from '../../public/button-curved.png'

export interface IPopularCategories {
  id: string
  children: {
    results: [
      {
        id: string
        name: string
        slug: string
        images: [
          {
            file: {
              height: number
              width: number
              url: string
            }
          }
        ]
      }
    ]
  }
}

const PopularCategories = () => {
  const [popularCateg, setPopularCategories] = useState<IPopularCategories>()

  useEffect(() => {
    const getPopularCateg__fun = async () => {
      return await getParentCategories('most-popular-categories')
    }

    getPopularCateg__fun()
      .then((data) => {
        setPopularCategories(data)
      })
      .catch((error) => {
        console.error(
          'error occur while fetching most popular categories ',
          error
        )
      })
  }, [])

  return (
    <div className="popularCategory__wrapper">
      {popularCateg ? (
        popularCateg.children.results.map((eachItem) => {
          return (
            <Link
              href={`/categories/${eachItem.slug}`}
              key={eachItem.id}
              passHref
            >
              <div className="popularCategory">
                <div className="popularCategory__content">
                  <figure className="popularCategory__img">
                    <Image
                      alt={eachItem.name}
                      src={eachItem.images[0].file.url}
                      width={eachItem.images[0].file.width}
                      height={eachItem.images[0].file.height}
                    />
                  </figure>
                </div>

                <div className="popularCategory__link">
                  <Image
                    src={buttonCurved.src}
                    width={buttonCurved.width}
                    height={buttonCurved.height}
                    alt="bottom link"
                  />
                  <Link href={`/categories/${eachItem.slug}`}>{eachItem.name}</Link>
                </div>
              </div>
            </Link>
          )
        })
      ) : (
        null
      )}
    </div>
  )
}

export default PopularCategories

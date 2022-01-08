/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FC, useEffect, useState } from 'react'
import { LoadingDots } from '@components/ui'
import { ProductCardProps } from '@components/common/ProductCard'
import { ProductCard } from '@components/common'

import {
  getCollection,
  getProduct,
} from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import builderConfig from '@config/builder'
interface HighlightedCardProps extends Omit<ProductCardProps, 'product'> {
  index: number
}

export interface ProductGridProps {
  products?: any[]
  productsList?: Array<{ product: string }>
  collection?: string | any
  offset: number
  limit: number
  cardProps: Omit<ProductCardProps, 'product'>
  highlightCard?: HighlightedCardProps
}

export const ProductGrid: FC<ProductGridProps> = ({
  products: initialProducts,
  collection,
  productsList,
  offset = 0,
  limit = 10,
}) => {
  const [products, setProducts] = useState(initialProducts || [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      
      const promises = productsList!
        .map((entry) => entry.product)
        .filter((handle: string | undefined) => typeof handle === 'string')
        .map(
          async (handle: string) => {
            return await getProduct({ slug: handle })
          }
        )
      const result = await Promise.all(promises)
      setProducts(result)
      setLoading(false)
    }
    if (productsList && !initialProducts) {
      getProducts()
    }
  }, [productsList, initialProducts])

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true)
      const result = await getCollection(builderConfig, {
        handle: collection,
      })
      setProducts(result.products)
      setLoading(false)
    }
    if (typeof collection === 'string' && !initialProducts) {
      fetchCollection()
    }
  }, [collection])

  if (loading) {
    return <LoadingDots />
  }

  return (
    <div className="product__wrapper">
      {products.slice(offset, limit).map((product, i) => (
        <ProductCard product={product} key={String(product.id)}/>
      ))}
    </div>
  )
}
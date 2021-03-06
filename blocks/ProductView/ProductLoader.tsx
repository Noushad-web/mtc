/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import { getProduct } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import builderConfig from '@config/builder'
import { LoadingDots } from '@components/ui'

interface Props {
  className?: string
  children: (product: any) => React.ReactElement
  product: string | any
}

const ProductLoader: React.FC<Props> = ({
  product: initialProduct,
  children,
}) => {
  const [product, setProduct] = useState(initialProduct)
  const [loading, setLoading] = useState(false)

  useEffect(() => setProduct(initialProduct), [initialProduct])

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const result = await getProduct({
        slug: String(product),
      })
      setProduct(result)
      setLoading(false)
    }
    if (typeof product === 'string') {
      fetchProduct()
    }
  }, [product])

  if (!product || typeof product === 'string' || loading) {
    return <LoadingDots />
  }
  return children(product)
}

export default ProductLoader

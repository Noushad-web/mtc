/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link, ImageCarousel } from '@components/ui'
import { getPrice } from '@lib/swell/storefront-data-hooks/src/utils/product'
import { Product } from '@lib/swell/storefront-data-hooks/src/types'
import buttonCurve from '../../public/button-curved.png'
import buttonCurveSmall from '../../public/button-curved-small.png'
import { useUI } from '@components/ui/context'
import { useAddItemToCart } from '@lib/swell/storefront-data-hooks'
import { useEffect, useState } from 'react'
import { Image } from 'theme-ui'

export interface ProductCardProps {
  className?: string
  product: Product
  imgWidth?: number | string
  imgHeight?: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  imgWidth = 350,
  imgHeight = 350,
  imgPriority = true,
  imgLoading = 'eager',
  imgSizes,
  imgLayout = 'responsive',
}) => {

  const handle = product.slug
  const price = getPrice(product.price, product.currency ?? 'USD')
  const [windowSize, setWindowSize] = useState<{ width: number }>()

  const { openSidebar } = useUI()
  const addItem = useAddItemToCart()
  // const [isClicked , setIsClicked]   = useState(false);

  const addToCart = async () => {
    try {
      // setIsClicked(!isClicked)
      await addItem(product.id, 1)
      openSidebar()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getWindowPrice = () => {
      const { innerWidth: width } = window
      return {
        width,
      }
    }

    setWindowSize(getWindowPrice())
  }, [])

  return (
    <Link href={`/shop/${handle}/`}>
      <div className="product__link">
        <div className="product">
          <div className="product__imgCarousel">
            <ImageCarousel
              currentSlide={product.images ? product.images.length - 1 : 0}
              width={imgWidth}
              height={imgHeight}
              priority={imgPriority}
              loading={imgLoading}
              layout={imgLayout}
              sizes={imgSizes}
              alt={product.name}
              images={product.images}
            />
          </div>
          <div className="product__content">
            <div className="product__content__name">
              <p>{product.name}</p>
            </div>

            <div className="product__content__stock">
              {product.stock_status === 'in_stock' ? (
                <p>
                  {product.stock_level} in stock <br />( can be backordered )
                </p>
              ) : (
                <p>
                  Check Our Dealers <br />
                  tikkaperformance.com/dealers
                </p>
              )}
            </div>

            <button className="product__addToCart" onClick={addToCart}>
              <svg
                className="product__addToCart__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="28px"
                height="25px"
              >
                <path
                  fillRule="evenodd"
                  fill="currentColor"
                  d="M27.918,6.457 L23.319,17.050 C23.151,17.420 22.798,17.655 22.396,17.655 L9.755,17.655 C9.302,17.655 8.899,17.353 8.781,16.915 L4.668,2.017 L1.781,2.017 C1.227,2.017 0.774,1.564 0.774,1.009 C0.774,0.454 1.227,-0.000 1.781,-0.000 L5.424,-0.000 C5.877,-0.000 6.280,0.302 6.397,0.740 L10.510,15.637 L21.724,15.637 L25.451,7.062 L13.028,7.062 C12.474,7.062 12.021,6.608 12.021,6.053 C12.021,5.498 12.474,5.044 13.028,5.044 L26.995,5.044 C27.331,5.044 27.650,5.212 27.835,5.498 C28.019,5.784 28.053,6.137 27.918,6.457 ZM8.798,20.178 C10.057,20.178 11.081,21.203 11.081,22.464 C11.081,23.725 10.057,24.751 8.798,24.751 C7.539,24.751 6.515,23.725 6.515,22.464 C6.515,21.203 7.539,20.178 8.798,20.178 ZM22.916,20.178 C24.175,20.093 25.266,21.052 25.350,22.296 C25.384,22.918 25.199,23.507 24.796,23.961 C24.393,24.431 23.839,24.700 23.235,24.751 C23.185,24.751 23.117,24.751 23.067,24.751 C21.875,24.751 20.885,23.809 20.801,22.615 C20.717,21.371 21.657,20.261 22.916,20.178 Z"
                />
              </svg>
              Add to cart
            </button>

            <p className="product__price">{price}</p>
          </div>
          <div className="product__button">
            <span>VIEW</span>
            {windowSize?.width! > 586 ? (
              <Image
                alt="Mountains"
                width={buttonCurve.width}
                height={buttonCurve.height}
                src={buttonCurve.src}
              />
            ) : (
              <Image
                src={buttonCurveSmall.src}
                alt="small mountains"
                width={buttonCurveSmall.width}
                height={buttonCurveSmall.height}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

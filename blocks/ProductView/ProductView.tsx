/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx, Divider } from 'theme-ui'
import { Grid, Box } from '@theme-ui/components'
import { NextSeo } from 'next-seo'
import { useUI } from '@components/ui/context'
import { ProductCard } from '@components/common'
import { useAddItemToCart } from '@lib/swell/storefront-data-hooks'
import whiteTriangle from '../../public/triangleWhite.png'
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
  getPrice,
} from '@lib/swell/storefront-data-hooks/src/utils/product'
import { ImageCarousel, LoadingDots } from '@components/ui'
import ProductLoader from './ProductLoader'
import {
  OptionInput,
  Product,
  Categories,
} from '@lib/swell/storefront-data-hooks/src/types'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { getProduct } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import Reviews from './Reviews'
import AdditionalInformation from './AdditionalInformation'
import Faq from './Faq'
import Image from 'next/image'
export interface ProductProps {
  className?: string
  children?: any
  product: Product
  renderSeo?: boolean
  description?: string
  title?: string
  slug: string
  productCross_sells?: string[]
  categories?: []
}

interface IrelatedProductId {
  id: string
  product_id: string
}

const ProductBox: React.FC<ProductProps> = ({
  product,
  renderSeo = true,
  description = product.description,
  title = product.name,
  slug = product.slug,
  productCross_sells = product.cross_sells,
  categories = product.categories,
}) => {
  // USESTATE
  const [toggleState, setToggleState] = useState(1)
  const [loading, setLoading] = useState(false)
  const [relatedProduct_array, setRelatedProduct_array] = useState<
    (Product | null)[]
  >([])
  const addItem = useAddItemToCart()

  //REGEX OF SPECIFICATION
  const pattern = /specification:/gi

  const toggleTab = (index: number): void => {
    setToggleState(index)
  }

  // tikka-t3t3x-gen2-billet-magazine-short-action-3-round
  const variants = useMemo(() => prepareVariantsWithOptions(product), [product])
  interface Selection extends OptionInput {
    id: string
    name: string
    value: string
  }

  const options = product?.options

  const defaultSelections: Selection[] = options
    ?.filter((options) => options.values?.length)
    .map((option) => {
      return {
        id: option.values[0].id,
        name: option.name,
        value: option.values[0].name,
      }
    })

  const images = useMemo(() => prepareVariantsImages(variants, 'color'), [
    variants,
  ])

  function setSelectedVariant() {
    const selectedVariant = variants.find((variant) => {
      return variant.option_value_ids?.every((id: string) => {
        return selections.find((selection) => {
          return selection.id == id
        })
      })
    })
    if (selectedVariant) {
      setVariant(selectedVariant)
    }
  }

  const { openSidebar } = useUI()

  const [variant, setVariant] = useState(variants[0] || null)
  const [selections, setSelections] = useState(defaultSelections)
  const [productQuantity, setProductQuantity] = useState(1)
  const limitOfQuantity = 10

  const counterHandle__plus = () => {
    setProductQuantity((prev) => {
      return prev < limitOfQuantity ? (prev += 1) : prev
    })
  }

  const counterHandle__minus = () => {
    setProductQuantity((prev) => {
      return prev > 1 ? (prev -= 1) : prev
    })
  }

  const addToCart = async () => {
    setLoading(true);
    // console.log(product.id, productQuantity, selections);
    try {
      await addItem(product.id, productQuantity, selections)
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const allImages = images
    .map((image) => ({ src: image.src }))
    .concat(
      product.images &&
        product.images
          .filter(
            ({ file }) => !images.find((image) => image.file?.url === file?.url)
          )
          .map((productImage) => ({
            ...productImage,
            src:
              productImage.file?.url ?? 'https://via.placeholder.com/1050x1050',
          }))
    )

  // ------------ RELATED PRODUCTS --------------------
  useEffect(() => {
    let relatedProduct_id: string[] = []
    if (productCross_sells === undefined) return
    productCross_sells.map((eachItem: IrelatedProductId, index: number) => {
      relatedProduct_id.push(eachItem.product_id)
    })
    const relatedProduct = async () => {
      const result = await Promise.all(
        relatedProduct_id.map(async (eachId) => {
          return await getProduct({ id: eachId })
        })
      )

      setRelatedProduct_array(result)
    }
    relatedProduct()
  }, [productCross_sells])

  const inputHandler = () => {
    // console.log('clicked');
  }

  return (
    <>
      {renderSeo && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title: title,
            description: description,
            images: [
              {
                url: product.images?.[0]?.file.url!,
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}
      <div className="singleProductPage__container">
        <div className="singleProductPage__carousel">
          <h1 className="singleProductPage__title singleProductPage__carousel--dnone singleProductPage__carousel--dnone--h1">
            SHOP
          </h1>
          <h2 className="singleProductPage__itemHeading singleProductPage__carousel--dnone singleProductPage__carousel--dnone--h2">
            {title}
          </h2>

          <ImageCarousel
            showZoom
            alt={title}
            width={1050}
            height={1050}
            priority
            images={
              allImages?.length > 0
                ? allImages
                : [
                    {
                      src: `https://via.placeholder.com/1050x1050`,
                    },
                  ]
            }
          />
        </div>
        <div sx={{ display: 'flex', flexDirection: 'column' }}>
          <span sx={{ mt: 0, mb: 2 }}>
            <h1 className="singleProductPage__title d-sm-none">SHOP</h1>
            <h2 className="singleProductPage__itemHeading d-sm-none">
              {title}
            </h2>

            <Divider className="divider" />
            <Grid
              className="singleProductPage__feature"
              gap={2}
              columns={[2, '1fr 2fr']}
            >
              <Box className="singleProductPage__feature__name">SKU:</Box>
              <Box className="singleProductPage__feature__value singleProductPage__feature__value--text-black">
                {product.sku}
              </Box>
            </Grid>
            <Divider className="divider" />

            {product.categories?.length !== 0 ? (
              <>
                <Grid
                  className="singleProductPage__feature"
                  gap={2}
                  columns={[2, '1fr 2fr']}
                >
                  <Box className="singleProductPage__feature__name">
                    Categories:
                  </Box>
                  <Box className="singleProductPage__feature__value">
                    {categories?.map((eachCateg: Categories, index: number) => {
                      return (
                        <React.Fragment key={eachCateg.id}>
                          {categories.length - 1 === index ? (
                            <span key={eachCateg.id}>{eachCateg?.name}</span>
                          ) : (
                            <span key={eachCateg.id}>{eachCateg?.name}, </span>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </Box>
                </Grid>
                <Divider className="divider" />
              </>
            ) : null}

            {product.tags?.length !== 0 ? (
              <>
                <Grid
                  className="singleProductPage__feature"
                  gap={2}
                  columns={[2, '1fr 2fr']}
                >
                  <Box className="singleProductPage__feature__name">Tags</Box>
                  <Box className="singleProductPage__feature__value">
                    {product.tags?.map((eachItem: string, index: number) => {
                      if (product.tags)
                        return (
                          <React.Fragment key={index}>
                            {product.tags.length - 1 === index ? (
                              <span key={index}>{eachItem}</span>
                            ) : (
                              <span key={index}>{eachItem}, </span>
                            )}
                          </React.Fragment>
                        )
                    })}
                  </Box>
                </Grid>
                <Divider className="divider" />
              </>
            ) : null}

            <Grid
              className="singleProductPage__feature"
              gap={2}
              columns={[2, '1fr 2fr']}
            >
              <Box className="singleProductPage__feature__name">Brands:</Box>
              <Box className="singleProductPage__feature__value">
                Mountain Tactical Company
              </Box>
            </Grid>
            <Divider className="divider" />

            <h4
              aria-label="price"
              className="singleProductPage__price"
              sx={{ mt: 0, mb: 2 }}
            >
              {product.purchase_options?.standard?.sale ? (
                <>
                  <span className="price font-bold">
                    {getPrice(
                      variant
                        ? variant?.price
                        : product.purchase_options.standard.sale_price,
                      product.currency ?? 'USD'
                    )}
                  </span>

                  <span className="strike ml--1">
                    {getPrice(
                      variant ? variant?.price : product.orig_price,
                      product.currency ?? 'USD'
                    )}
                  </span>
                </>
              ) : (
                <span className="price font-bold">
                  {getPrice(
                    variant ? variant?.price : product.price,
                    product.currency ?? 'USD'
                  )}
                </span>
              )}

              <span className="text-red">Available on backorder</span>
            </h4>
          </span>
          <div className="singleProductPage__btnWrapper">
            <div className="singleProductPage__btnWrapper__counterBtn">
              <input
                type="number"
                value={productQuantity}
                className="inline-block"
                onChange={inputHandler}
              />
              <div className="flex flex-col self-center">
                <button onClick={counterHandle__plus}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14px"
                    height="9px"
                  >
                    <path
                      fillRule="evenodd"
                      fill="rgb(232, 36, 41)"
                      d="M1.783,8.990 L6.996,3.686 L12.149,8.996 L13.992,7.174 L6.996,-0.003 L-0.000,7.174 L1.783,8.990 Z"
                    />
                  </svg>
                </button>
                <button onClick={counterHandle__minus}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14px"
                    height="9px"
                  >
                    <path
                      fillRule="evenodd"
                      fill="rgb(232, 36, 41)"
                      d="M1.783,0.009 L6.996,5.314 L12.149,0.004 L13.992,1.825 L6.996,9.003 L-0.000,1.825 L1.783,0.009 Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <button
              name="add-to-cart"
              disabled={loading}
              onClick={addToCart}
              className="singleProductPage__btnWrapper__addToCartBtn"
            >
              Add to Cart {loading && <LoadingDots />}
            </button>
          </div>
        </div>

        <section className="singleProductPage__accordian__wrapper">
          {/* ACCORDIAN BTNS  */}
          <div className="tabList">
            <button
              className={
                toggleState === 1 ? 'tabItem tabItem--active' : 'tabItem'
              }
              onClick={() => toggleTab(1)}
            >
              description
            </button>
            <button
              className={
                toggleState === 2 ? 'tabItem tabItem--active' : 'tabItem'
              }
              onClick={() => toggleTab(2)}
            >
              additional information
            </button>
            <button
              className={
                toggleState === 3 ? 'tabItem tabItem--active' : 'tabItem'
              }
              onClick={() => toggleTab(3)}
            >
              reviews
            </button>
            <button
              className={
                toggleState === 4 ? 'tabItem tabItem--active' : 'tabItem'
              }
              onClick={() => toggleTab(4)}
            >
              questions and answers
            </button>
          </div>

          {/* CONTENT TABS */}
          <div className="tabPanelList">
            <div
              className={
                toggleState === 1
                  ? 'tabPanelItem tabPanelItem--active'
                  : 'tabPanelItem'
              }
            >
              <iframe
                width="560"
                height="400"
                src={product.attributes?.video?.value}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>

              <div
                className="tabPanelItem__description tabPanelItem__description--para"
                dangerouslySetInnerHTML={{
                  __html: description.slice(0, description.search(pattern)),
                }}
              ></div>
            </div>

            <div
              className={
                toggleState === 2
                  ? 'tabPanelItem tabPanelItem--active'
                  : 'tabPanelItem'
              }
            >
              <AdditionalInformation description={description} />
            </div>

            <div
              className={
                toggleState === 3
                  ? 'tabPanelItem tabPanelItem--active'
                  : 'tabPanelItem'
              }
            >
              <Reviews slug={slug} />
            </div>

            <div
              className={
                toggleState === 4
                  ? 'tabPanelItem tabPanelItem--active'
                  : 'tabPanelItem'
              }
            >
              <Faq slug={slug} />
            </div>
          </div>
        </section>
      </div>
      <Image
        src={whiteTriangle.src}
        width={whiteTriangle.width}
        height={whiteTriangle.height}
        className="whiteBgTriangle"
        alt="whiteBg"
      />

      <section className="relatedProduct__wrapper">
        <div className="relatedProduct__container">
          <div className="relatedProduct__heading">
            <h1>Related</h1>
            <h3>PRODUCTS</h3>
          </div>

          <div className="relatedProduct product__wrapper">
            {relatedProduct_array.map((eachProduct: any, index: number) => {
              return <ProductCard product={eachProduct} key={index} />
            })}
          </div>
        </div>
      </section>
    </>
  )
}

const ProductView: React.FC<{
  product: string | any
  renderSeo?: boolean
  description?: string
  title?: string
  slug: string
}> = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView

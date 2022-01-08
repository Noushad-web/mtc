// import { UserNav } from '@components/common'
import { getCategory } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { BsCart3 } from 'react-icons/bs'
// import { UserNav } from '@components/common';
// import { BuilderComponent, Builder, builder } from '@builder.io/react'
import { LoadingDots } from '@components/ui'
// import { Product } from '@lib/swell/storefront-data-hooks/src/types';
// import Image from 'next/image';
import { useAddItemToCart } from '@lib/swell/storefront-data-hooks'
import { useUI } from '@components/ui/context'
import { Image, NavLink } from 'theme-ui'

interface IcarouselProps {
  children: JSX.Element | JSX.Element[]
  carousel: [
    {
      image: string
      heading: string
      text: string
      slug: string
      price: string
      stock: number
    }
  ]
}
interface IProduct {
  children: JSX.Element | JSX.Element[]
  id: string
  slug: string
  name: string
  products: {
    page: number
    count: number
    results: [
      id: string,
      images: [
        file: {
          height: number
          width: number
          url: string
        }
      ],
      price: number,
      sku: number,
      stock_purchasable: boolean,
      slug: string
    ]
  }
}

interface Ifile {
  file: {
    height: number
    width: number
    url: string
  }
}
interface Iresult {
  id: string
  currency: string
  description: string
  name: string
  images: [Ifile]
  price: number
  sku: string
  stock_purchasable: boolean
  slug: string
  stock_status: number
  tags: string[]
}

interface Iresults extends Array<Iresult> {}
const category = 'latest-tikka-products'

const CarouselCenter_mode = (props: IcarouselProps) => {
  const [slide__data, setLatestProducts] = useState<Iresults>()
  const addItem = useAddItemToCart()

  const getProduct = async () => {
    await getCategory(category).then((data) => {
      setLatestProducts(data?.products.results)
    })
  }

  useEffect(() => {
    getProduct()
  }, [])

  const checkNumber = (number: number) => {
    if (slide__data) {
      if (number > slide__data.length - 1) {
        return 0
      }
      if (number < 0) {
        return slide__data.length - 1
      }

      return number
    }
  }

  const [index, setIndex] = useState<number>(1)
  const [prevIndex, setPrevIndex] = useState<number>(0)
  const [nextIndex, setNextIndex] = useState<number>(2)
  const { openSidebar } = useUI()

  const prevBtnHandle = () => {
    setIndex((index): any => {
      let newIndex = index - 1
      return checkNumber(newIndex)
    })
  }
  // --------------------- AUTO PLAY THE CAROUSEL ------------------------------------------- //
  const autoplay = (number: number) => {
    if (slide__data)
      if (number >= slide__data.length - 1) {
        return 0
      }
    return number + 1
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIndex((index) => autoplay(index))
  //   }, 4000)

  //   return () => clearTimeout(timer)
  // }, [autoplay])

  const nextBtnHandle = () => {
    setIndex((index): any => {
      let newIndex = index + 1
      return checkNumber(newIndex)
    })
  }

  useEffect(() => {
    setPrevIndex(() => {
      if (slide__data)
        if (index > -1 && index === 0) {
          return slide__data.length - 1
        }
      return index - 1
    })
  }, [index])

  useEffect(() => {
    setNextIndex(() => {
      if (slide__data)
        if (index === slide__data.length - 1) {
          return 0
        }
      return index + 1
    })
  }, [index])

  // console.log('slide__data: ', slide__data);

  return slide__data ? (
    <>
      <section className="centerCarousel__wrapper">
        <div className="centerCarousel">
          <h1 className="centerCarousel__heading mt-5 mb-40 text-center text-white font-semibold">
            Latest Tikka Products
          </h1>
          <div className="slide">
            <div className="slide__imgs">
              <button
                className="slide__imgs__prevBtn slide__imgs__navigation"
                onClick={prevBtnHandle}
              >
                <IoIosArrowBack />
              </button>

              <button
                className="slide__imgs__nextBtn slide__imgs__navigation"
                onClick={nextBtnHandle}
              >
                <IoIosArrowForward />
              </button>

              <figure className="slide__prevImg">
                <Image
                  src={slide__data[prevIndex].images[0].file.url}
                  alt={prevIndex.toString()}
                />
              </figure>

              <span className="horizontalDivider"></span>

              <figure className="slide__currentImg">
                <Image
                  src={slide__data[index].images[0].file.url}
                  alt={slide__data[index].images[0].file.url}
                />
              </figure>

              <span className="horizontalDivider"></span>

              <figure className="slide__nextImg">
                <Image
                  src={slide__data[nextIndex].images[0].file.url}
                  alt={slide__data[nextIndex].images[0].file.url}
                />
              </figure>
            </div>

            <div className="slide__content mt-13">
              <h2 className="text-yellow text-center uppercase mb-8">
                <Link href={`/shop/${slide__data[prevIndex].slug}`}>
                  {slide__data[prevIndex].name}
                </Link>
              </h2>

              <hr />

              <article className="flex justify-between my-10">
                <p className="text-white">
                  SKU:{' '}
                  <span className="font-light capitalize">
                    {' '}
                    {slide__data[prevIndex].sku}{' '}
                  </span>
                  ,
                  <br />
                  Tags:{' '}
                  {slide__data[prevIndex].tags.map((eachIndex, index) => (
                    <span className="font-light capitalize" key={index}>
                      {eachIndex}, &nbsp;
                    </span>
                  ))}
                  <br />
                  <br />
                  <span className="text-yellow price">
                    {'$'}
                    {slide__data[index].price}
                  </span>{' '}
                  {slide__data[index].stock_purchasable}{' '}
                  <span className="font-light">
                    {slide__data[index].stock_status
                      ? `${slide__data[index].stock_status} in stock`
                      : `out of stock`}
                  </span>
                </p>

                <div className="slide__content__addToCart">
                  <div className="cart">
                    <button
                      onClick={async () => {
                        try {
                          await addItem(slide__data[index].id, 1)
                          openSidebar()
                        } catch (error) {
                          console.error(
                            'having error while adding to cart please check carouselCenter.tsx',
                            error
                          )
                        }
                      }}
                      className="cart__button"
                    >
                      {/* <BsCart3 /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28px"
                        height="25px"
                      >
                        <path
                          fillRule="evenodd"
                          fill="rgb(255, 255, 255)"
                          d="M27.918,6.457 L23.319,17.050 C23.151,17.420 22.798,17.655 22.396,17.655 L9.755,17.655 C9.302,17.655 8.899,17.353 8.781,16.915 L4.668,2.017 L1.781,2.017 C1.227,2.017 0.774,1.564 0.774,1.009 C0.774,0.454 1.227,-0.000 1.781,-0.000 L5.424,-0.000 C5.877,-0.000 6.280,0.302 6.397,0.740 L10.510,15.637 L21.724,15.637 L25.451,7.062 L13.028,7.062 C12.474,7.062 12.021,6.608 12.021,6.053 C12.021,5.498 12.474,5.044 13.028,5.044 L26.995,5.044 C27.331,5.044 27.650,5.212 27.835,5.498 C28.019,5.784 28.053,6.137 27.918,6.457 ZM8.798,20.178 C10.057,20.178 11.081,21.203 11.081,22.464 C11.081,23.725 10.057,24.751 8.798,24.751 C7.539,24.751 6.515,23.725 6.515,22.464 C6.515,21.203 7.539,20.178 8.798,20.178 ZM22.916,20.178 C24.175,20.093 25.266,21.052 25.350,22.296 C25.384,22.918 25.199,23.507 24.796,23.961 C24.393,24.431 23.839,24.700 23.235,24.751 C23.185,24.751 23.117,24.751 23.067,24.751 C21.875,24.751 20.885,23.809 20.801,22.615 C20.717,21.371 21.657,20.261 22.916,20.178 Z"
                        />
                      </svg>
                      <div className="cart__button--price text-yellow">
                        {'$'}
                        {slide__data[index].price}
                      </div>
                      <div className="cart__button--addtocart">Add to Cart</div>
                    </button>
                  </div>
                </div>
              </article>
              <hr />

              <div className="dot__wrapper">
                <div className="dot">
                  {slide__data.map((data, number) => {
                    return (
                      <button
                        className={
                          index === number
                            ? 'dot__btn dot__btn--active'
                            : 'dot__btn'
                        }
                        id={data.id}
                        data-id={index}
                        key={data.id}
                        onClick={() => {
                          setIndex(number)
                        }}
                      ></button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <LoadingDots />
  )
}

export default CarouselCenter_mode

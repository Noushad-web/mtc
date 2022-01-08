import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { blogData, getData_array } from 'blocks/ArchiveBlogs/ArchiveBlogs'
import { useEffect, useState } from 'react'
import { LoadingDots } from '@components/ui'
import Image from 'next/image'
import { getLimitedWords } from 'blocks/ArchiveBlogs/ArchiveBlogCard'
import Link from 'next/link'

const BlogsCarousel = () => {
  const [data_array, setData_array] = useState<any | null>(null);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  useEffect(() => {
    getData_array().then((data) => {
      setData_array(data)
    })
  }, [])

  return (
    <>
      {data_array ? (
        <div className="carousel__blog__wrapper">
          <Carousel
            responsive={responsive}
            showDots={true}
            infinite={true}
            removeArrowOnDeviceType={['tablet', 'mobile']}
          >
            {data_array.map((eachData: blogData) => {
              return (
                <Link href={`/blog/${eachData.data.slug}`} key={eachData.id} passHref>
                  <div>
                  <div key={eachData.id} className="carousel__blog__item">
                    <figure className="carousel__blog__item--img">
                      <Image
                        width={330}
                        height={240}
                        src={eachData.data.coverImage}
                        alt={eachData.data.heading}
                      ></Image>
                    </figure>

                    <h4 className="carousel__blog__item--heading">
                      {eachData.data.heading}
                    </h4>

                    <div className="carousel__blog__item--description">
                      {getLimitedWords(eachData.data.description1)}
                    </div>

                    <div className="carousel__blog__item--link">                      
                        Read More
                    </div>
                  </div>
                  </div>
                </Link>
              )
            })}
          </Carousel>
        </div>
      ) : (
        <LoadingDots />
      )}
    </>
  )
}

export default BlogsCarousel

import React, { FC, useEffect, useState } from 'react'
import { builder } from '@builder.io/sdk'
import builderConfig from '@config/builder'
import { LoadingDots } from '@components/ui'
// import { AiFillStar } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { timestampConversion } from 'blocks/ArchiveBlogs/ArchiveBlogs'

builder.init(builderConfig.apiKey)

interface review {
  id: string
  createdDate: number
  data: {
    comment: string
    rating: number
    userName: string
    productSlug: string
  }
}

export const getModelContentAll = async (model: string) => {
  return await builder.getAll(model)
}

export const splitArray = (array: any[], number: number) => {
  var result = array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / number)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
  return result
}

const Reviews = ({ slug }: { slug: string }) => {
  // const [data, setData] = useState<review[]>()
  const [paginationData, setPaginationData] = useState<any[]>()
  const [paginationIndex, setPaginationIndex] = useState<number>(0)

  const stars = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']

  useEffect(() => {
    getModelContentAll('reviews').then((data: any[]) => {
      const filterData = data.filter((eachItem, index) => {
        if (eachItem.data.productSlug === slug) {
          return eachItem
        }
      })
      setPaginationData(splitArray(filterData, 4))
    })
  }, [])

  const handlePagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.toggle('review__pagination__button--active')
    const clickedNumber = e.currentTarget.getAttribute('data-id')
    if (clickedNumber) {
      setPaginationIndex(parseInt(clickedNumber))
    }
  }

  return (
    <>
      {paginationData ? (
        paginationData[paginationIndex]?.map((eachIndex: review) => {
          return eachIndex.data.productSlug === slug ? (
            <div
              key={eachIndex.id}
              id={eachIndex.id}
              className="review__wrapper"
            >
              <div className="review">
                <div className="review__userDiv">
                  <span className="review__userDiv__icon">
                    <FaUserCircle />
                  </span>
                  <span>{eachIndex.data.userName}</span>
                  <div className="review__stars__wrapper">
                    <span className="review__stars">
                      {stars[eachIndex.data.rating - 1]
                        ? stars[eachIndex.data.rating - 1]
                        : 'no ratings'}
                    </span>
                  </div>

                  <div className="review__userDiv__date">
                    <small>{timestampConversion(eachIndex.createdDate)}</small>
                  </div>
                </div>

                <div className="review__comment">{eachIndex.data.comment}</div>
              </div>
            </div>
          ) : null
        })
      ) : (
        <LoadingDots />
      )}

      <div className="review__pagination">
        {paginationData?.map((eachIndex: review[], index: number) => {
          if (paginationData.length <= 1) {
            return null
          } else {
            return (
              <button
                key={index}
                className="review__pagination__button"
                onClick={handlePagination}
                data-id={index}
              >
                {index + 1}
              </button>
            )
          }
        })}
      </div>
    </>
  )
}

export default Reviews

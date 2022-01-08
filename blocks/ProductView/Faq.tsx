import React, { FC, useEffect, useState } from 'react'
import { builder } from '@builder.io/sdk'
import builderConfig from '@config/builder'
import { LoadingDots } from '@components/ui'
import { getModelContentAll } from './Reviews'
import { splitArray } from './Reviews'
import Script from 'next/script'

builder.init(builderConfig.apiKey)

interface faq {
  id: string
  createdDate: number
  data: {
    question: string
    answer: string
    productSlug: string
  }
}

const Faq = ({ slug }: { slug: string }) => {
  const [paginationData, setPaginationData] = useState<any[]>()
  const [paginationIndex, setPaginationIndex] = useState<number>(0)
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getModelContentAll('faq').then((data: any[]) => {
      const filterData = data.filter((eachItem: faq, index) => {
        if (eachItem.data.productSlug === slug) {
          return eachItem
        }
      })
      // console.log(filterData);
      setPaginationData(splitArray(filterData, 10))
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
      <div className="faqAccordian__wrapper">
        {paginationData ? (
          paginationData[paginationIndex]?.map((eachIndex: faq) => {
            return (
              <div key={eachIndex.id}>
                <div className="faqAccordian">
                  <details>
                    <summary className="faqAccordian__button">
                      {eachIndex.data.question}
                    </summary>
                    <p className="faqAccordian__description">
                      {eachIndex.data.answer}
                    </p>
                  </details>
                </div>
              </div>
            )
          })
        ) : (
          <LoadingDots />
        )}
      </div>

      <div className="review__pagination">
        {paginationData?.map((eachIndex: faq[], index: number) => {
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

      <Script strategy='afterInteractive' src="https://cdn.commento.io/js/commento.js" id='commento'></Script>
      <div id="commento"></div>
    </>
  )
}

export default Faq

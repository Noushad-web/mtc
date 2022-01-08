

import { builder } from '@builder.io/sdk'
import { LoadingDots } from '@components/ui'
import builderConfig from '@config/builder'
import { useEffect, useState } from 'react'
import ArchiveBlogCard from './ArchiveBlogCard'
export interface blogData {  
  id: string
  data: {
    coverImage: string
    title: string
    heading: string
    author: string
    category: string
    description1: string
    slug: string
    date: number
    tags: string
    }
}

export interface archiveBlogCount {
  numberOfBlogs: number
}

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const timestampConversion = (timeStamp: number) => {
  const date = new Date(timeStamp)

  if (timeStamp) {
    return `
        ${month[date.getMonth()]} 
         ${date.getDate()}
         ${date.getFullYear()}
        `
  } else null
}

builder.init(builderConfig.apiKey)
const model = 'blog-page';  

export const getData_array = async () => {
  return await builder
    .getAll(model, {
      options: {
        noTargeting: true,
      },
      fields: 'id,data.coverImage,data.heading,data.description1,data.slug,data.title,data.date,data.category,data.tags',
    })
    .then((fetchedData) => {
      return fetchedData
    })
}

const ArchiveBlogs = ({ numberOfBlogs = null} : {numberOfBlogs: null}) => {
  const [data_array, setData_array] = useState<any | null>(null)


  useEffect(() => {
    getData_array().then(data => {
      setData_array(data);
    })
  }, [])

  return (
    <>
      {numberOfBlogs === null && data_array !== null ? (
        <div className="blogCard__container">
          {data_array.map((eachData: blogData, index: number) => {
            return <ArchiveBlogCard key={eachData.id} {...eachData} />
          })}
        </div>
      ) : data_array ? (
        <div className="blogCard__container">
          {data_array.map((eachData: blogData, index: number) => {
            if(numberOfBlogs)
            return index < numberOfBlogs ? (
              <ArchiveBlogCard key={eachData.id} {...eachData} />
            ) : null
          })}
        </div>
      ) : <LoadingDots/>}
    </>
  )
}

export default ArchiveBlogs


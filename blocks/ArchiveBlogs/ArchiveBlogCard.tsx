/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { blogData } from './ArchiveBlogs'
import { timestampConversion } from './ArchiveBlogs'
import readMoreBg from '../../public/readMoreBg.png'

export const getLimitedWords = (string: string) => {
  if (string.length > 260) {
    return <p>{`${string.slice(0, 260)}[...]`}</p>
  }
}

const ArchiveBlogCard = (blogDataObject: blogData) => {
  const eachData = blogDataObject.data
  // className = 'blogcard__link--card'

  return (
    <Link
      key={eachData.slug.toString()}
      href={`/blog/${eachData.slug}`}
      passHref
    >
      <div className="blogcard__link--card">
        <div className="blogCard">
          <div className="blogCard__content">
            <Image
              src={eachData.coverImage}
              alt={eachData.title}
              width="550"
              height="360"
            />
            <h3 className="blogCard__heading">{eachData.heading}</h3>
            <div className="blogCard__metaDetails">
              <span className="date text-muted">
                {timestampConversion(eachData.date)}
              </span>
              <br />
              <span className="categories text-red">
                <span className="text-teal">Category : </span>
                {eachData.category}{' '}
              </span>
              <span className="text-muted"> | </span>
              <span className="tag text-red">
                {' '}
                <span className="text-teal">Tags : </span>
                {eachData.tags}
              </span>
            </div>
            <div className="blogCard__description">
              {getLimitedWords(eachData.description1)}
            </div>
          </div>

          <div className="blogCard__link">read more</div>
          <Image
            className="blogCard__readMoreBg"
            src={readMoreBg.src}
            alt="linkable icon"
            height="88"
            width="550"
          />
        </div>
      </div>
    </Link>
  )
}

export default ArchiveBlogCard

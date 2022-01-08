import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { builder, BuilderComponent } from '@builder.io/react'
import { blogData, timestampConversion } from 'blocks/ArchiveBlogs/ArchiveBlogs'
import ArchiveBlogCard from 'blocks/ArchiveBlogs/ArchiveBlogCard'
import { MdDataUsage } from 'react-icons/md'
import { NavLink } from 'theme-ui'
import LoadingSpinner from '@components/ui/LoadingSpinner'
import { LoadingDots } from '@components/ui'

const model = 'blog-page'

const SingleBlog = () => {
  const [singleData, setSingleData] = useState<any>()
  const [relatedPost, setRelatedPost] = useState<blogData[]>([])

  const getNewLine = (string: string) => {
    return string.split('\n').map((str) => (
      <p key={Math.random().toString()} className="blog__description">
        {str}
        <br />
      </p>
    ))
  }
  const router = useRouter()

  const getBuilderData = async (slug: string | string[] | undefined) => {
    return await builder
      .get(model, {
        query: {
          'data.slug': slug,
        },
        // fields:
        //   'data.description1,data.videoText,data.videoUrl,data.description2,data.heading2,data.description3,data.tags,data.heading,data.coverImage,data.category,data.date,data.relatedPost,data.slug',
      })
      .promise()
      .then((data) => {
        return data
      })
  }

  useEffect(() => {
    const singleBlogData = getBuilderData(router.query.slug)

    singleBlogData.then((item) => {
      setSingleData(item?.data)

      item?.data.relatedPost.map( async (item: {slug:string}) => {  
        await getBuilderData(item.slug).then((archiveBlogData: blogData) =>
          setRelatedPost((prev: Array<blogData>) => {
            return [...prev, archiveBlogData]
          })
        )
      })
    })
  }, [])

  // useEffect(() => {
  //     let relatedBlogData: any[] = [];
  //     singleData?.relatedPost.map( async (item: any) => {
  //       await getBuilderData(item.slug).then((value) =>{
  //          relatedBlogData.push(value) 
  //          console.log(relatedBlogData) ;
  //       });
  //     })

  //   // Promise.all(data).then((data) => {
  //   //   console.log(data)
  //   //   setRelatedPost(data)
  //   // })
  // }, [singleData])

  return (
    <>
      {singleData ? 
        
      <section className="blog__wrapper">
        <article className="blog__container">
          <div className="blog__heading">
            <h1>{singleData.heading}</h1>
          </div>

          <div className="blog__metaDetails">
            {/* <span className="author text-teal text-capitalize">
              by {singleData.author},{' '}
            </span> */}
            <span className="date text-muted">
              {timestampConversion(singleData.date)} |{' '}
            </span>
            <span className="categories text-red">
              <span className="text-teal">Category : </span>
              {singleData.category}{' '}
            </span>
            <span className="text-muted"> | </span>
            <span className="tag text-red">
              {' '}
              <span className="text-teal">Tags : </span>
              {singleData.tags}
            </span>
          </div>

          <figure className="blog__coverImg">
            <Image
              src={singleData.coverImage}
              width={1200}
              height={500}
              alt={singleData.heading}
            />
            <figcaption className="blog__coverImg__figCaption">
              {getNewLine(singleData.description1)}
            </figcaption>
          </figure>

          <hr className="blog__divider" />

          <div className="blog__videoRow">
            <div className="videoText">
              {getNewLine(singleData.videoText)}
            </div>
            <iframe src={singleData.videoUrl} frameBorder="0"></iframe>
          </div>

          <hr className="blog__divider" />

          <div className="blog__afterVideo__description">
            {getNewLine(singleData.description2)}
          </div>

          <hr className="blog__divider" />

          <div className="blog__heading">
            <h1>{singleData.heading2}</h1>
            {getNewLine(singleData.description3)}
          </div>

          <hr className="blog__divider" />

          <div className="blog__share">
            <div className="blog__heading">
              <h1>Share</h1>
            </div>
            <div className="blog__share__socialIcons">
              <NavLink href={'/'}>
                <FaFacebookF />
              </NavLink>

              <NavLink href={'/'}>
                <FaTwitter />
              </NavLink>

              <NavLink href={'/'}>
                <FaGooglePlusG />
              </NavLink>

              <NavLink href={'/'}>
                <FaLinkedinIn />
              </NavLink>

              <NavLink href={'/'}>
                <FaYoutube />
              </NavLink>
            </div>
          </div>
        </article>

        {relatedPost ? (
          <section className="blog__relatedPosts">
            <article className="blog__container">
              <div className="blog__heading mb-16">
                <h1>related posts</h1>
              </div>
              <div className="blogCard__container">
                {(relatedPost.length > 1) ? (
                  console.log(relatedPost),
                  relatedPost.map((eachPost: blogData, index: number) => {
                    return <ArchiveBlogCard key={index} {...eachPost} />
                  })
                ) : (
                  <LoadingDots />
                )}
              </div>
            </article>
          </section>
        ) : null}
      </section>
      :  null}
    </>
  )
}

export default SingleBlog

import React from 'react'
import { builder } from '@builder.io/sdk'
import builderConfig from '@config/builder'
import { useEffect, useState } from 'react'
import '../../blocks/BreadCrumb/BreadCrumb.builder'
import '../../blocks/SingleBlog/SingleBlog.builder'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { BuilderComponent } from '@builder.io/react'
import { ParsedUrlQuery } from 'querystring'
import LoadingSpinner from '@components/ui/LoadingSpinner'

builder.init(builderConfig.apiKey)
const model = 'blog-page'

const Slug = ({ url }: { url: string }) => {
  
  return (
    <>
      {url ? (
        <>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KZSBSDW"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <article>
            <BuilderComponent model={model} />
          </article>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}

export default Slug

/* <Head key={url}>
            <title>{url}</title>
            <Script
              id="gtm-script"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KZSBSDW');`,
              }}
            />
  </Head> */

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  let url: any = context.params?.slug
  return {
    props: {
      url,
    },
    revalidate: 60,
  }
}


export const getStaticPaths = async () => {

  // const getSlug = await fetch('http://localhost:3004/api/apiProduct')

  // console.log('getSlug: ', getSlug)

  try {
    const data_array = await builder
      .getAll(model, {
        options: {
          noTargeting: true,
        },
        fields: 'data.slug',
      })
      .then((fetchedData) => fetchedData)

    const paths = data_array.map((eachData) => {
      return {
        params: {
          slug: eachData.data?.slug,
        },
      }
    })

    return {
      paths: paths,
      fallback: true,
    }
  } catch (err) {
    console.log('====================================')
    console.log(
      'error occur while data fetching from getStaticPaths in slug.tsx: ',
      err
    )
    console.log('====================================')
  }
}
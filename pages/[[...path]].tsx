import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Layout } from '@components/common';
import { BuilderComponent, Builder, builder } from '@builder.io/react';
import builderConfig from '@config/builder';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import { resolveSwellContent } from '@lib/resolve-swell-content';

builder.init(builderConfig.apiKey)
import '../blocks/ProductGrid/ProductGrid.builder';
import '../blocks/CollectionView/CollectionView.builder';
import '../blocks/BreadCrumb/BreadCrumb.builder';
import '../blocks/ArchiveBlogs/ArchiveBlogs.builder';
import '../blocks/SingleBlog/SingleBlog.builder';
import '../blocks/FeatureProducts/FeatureProduct.builder';
import { Link } from '@components/ui'
import { Themed } from '@theme-ui/mdx'
import { getLayoutProps } from '@lib/get-layout-props'
import Script from 'next/script';


export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[] }>) {
  const page = await resolveSwellContent('page', {
    urlPath: '/' + (params?.path?.join('/') || ''),
  })

  return {
    props: {
      page,
      ...(await getLayoutProps()),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 30 seconds
    revalidate: 30,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    apiKey: builderConfig.apiKey,
  })
  
  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

export default function Path({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  // const { theme } = useThemeUI()

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (!page && !Builder.isEditing && !Builder.isPreviewing) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>          
        </Head>
        {Builder.isBrowser && <DefaultErrorPage statusCode={404} />}
      </>
    )    
  }
  
  const { title, description, image } = page?.data! || {}
  Builder.isStatic = true;
  return (
    
    <div>
      <Script
            id='gtm-script'
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KZSBSDW');`,
            }}
      />
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KZSBSDW"
        height="0" width="0" style={{display:'none', visibility:'hidden'}}></iframe>
      </noscript>

      {title && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title,
            description,
            ...(image && {
              images: [
                {
                  url: image,
                  width: 800,
                  height: 600,
                  alt: title,
                },
              ],
            }),
          }}
        />
      )}

      <BuilderComponent
        options={{ includeRefs: true } as any}
        model="page"        
        renderLink={(props: any) => {
          // nextjs link doesn't handle hash links well if it's on the same page (starts with #)
          if (props.target === '_blank' || props.href?.startsWith('#')) {
            return <Themed.a {...props} />
          }
          return <Themed.a {...props} as={Link} />
        }}
        {...(page && { content: page })}
      />
    </div>
  )
}

Path.Layout = Layout

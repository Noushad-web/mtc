import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import { resolveSwellContent } from '@lib/resolve-swell-content'
import '../../blocks/ProductView/ProductView.builder'
import '../../blocks/BreadCrumb/BreadCrumb.builder';
import builderConfig from '@config/builder'
import {
  getAllProductPaths,
  getAllProductsList,
  getProduct,
} from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { useThemeUI } from 'theme-ui'
import { getLayoutProps } from '@lib/get-layout-props'
import { useEffect } from 'react'
builder.init(builderConfig.apiKey!)
Builder.isStatic = true

const builderModel = 'product-page'

export async function getStaticProps(context: GetStaticPropsContext<{ handle: string }>) {
  const product = await getProduct({
    slug: context.params?.handle,
  })

  return {
    props: {
      page: null,
      product: product || null,
      ...(await getLayoutProps()),
    },
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {

  const fetchedData: any = await (await fetch('http://[::1]:3004/api/apiProduct')).json();

  return {
    // TODO: update to /product
    paths: fetchedData.results?.map(({slug}: {slug: string}) => `/shop/${slug}`) ?? [],
    fallback: 'blocking',
  }
}


export default function Handle({
  product,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  Builder.isStatic = true
  const router = useRouter()
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  const { theme } = useThemeUI()
  useEffect( () => {
    getAllProductsList(1, 5).then(data => data);
  }, [])

  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (!product && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  return router.isFallback && isLive ? (
    <h1>Loading...</h1> // TODO Add Skeleton Views
  ) : (
    <BuilderComponent
      isStatic
      key={product!.id}
      model={builderModel}
      data={{ product, theme }}
      {...(page && { content: page })}
    />
  )
}

Handle.Layout = Layout

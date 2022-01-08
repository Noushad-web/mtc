import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'
import '@assets/style.scss';

import { FC } from 'react';
import type { AppProps } from 'next/app'

import { builder, Builder } from '@builder.io/react'
import builderConfig from '@config/builder'
builder.init(builderConfig.apiKey)

import '../blocks/ProductGrid/ProductGrid.builder';
import '../blocks/CollectionView/CollectionView.builder';
import '../blocks/ProductView/ProductView.builder';
import '../blocks/CarouselComponent/CarouselCenter_mode.builder';
import '../blocks/PopularCategories/PopularCategories.builder';
import '../blocks/BlogsCarousel/BlogsCarousel.builder';
import '../blocks/Instagram/Instagram.builder';
import '../blocks/SingleBlog/SingleBlog.builder';
// import '../blocks/AllProductList/AllProductList.builder';
import { Layout } from '@components/common';

Builder.register('insertMenu', {
  name: 'Swell Collection Components',  
  items: [
    { name: 'CollectionBox', label: 'Collection' },
    { name: 'CollectionView' },
    { name: 'ProductCollectionGrid' },
  ],
})

Builder.register('insertMenu', {
  name: 'Swell Products Components',
  items: [
    { name: 'ProductView' },
    { name: 'ProductBox' },
    { name: 'ProductGrid' },
    { name: 'Most Popular Categories' },
    { name: 'featured product' },
    // { name: 'All Products' },
  ],
})

Builder.register('insertMenu', {
  name: 'Blogs Component',
  items:[
    { name: 'blog-carousel' },
    { name: 'Single Blog' },
    { name: 'Archive Blog'}
  ]
})

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {  
  // const Layout = (Component as any).Layout || Noop
  return (
    <>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
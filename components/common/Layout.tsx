/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { ThemeProvider, jsx } from 'theme-ui'
import dynamic from 'next/dynamic'
import { ManagedUIContext, useUI } from '@components/ui/context'
import { Head, Navbar } from '@components/common'
// import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Button } from 'theme-ui'
import { Sidebar } from '@components/ui'
import { CartSidebarView } from '@components/cart'
import { CommerceProvider } from '@lib/swell/storefront-data-hooks'
import swellConfig from '@config/swell'
import { builder, BuilderContent, Builder } from '@builder.io/react'
import themesMap from '@config/theme'
import '@builder.io/widgets'
import 'react-spring-modal'
import seoConfig from '@config/seo.json'
import NoSSR from './NoSSR'

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  ssr: false,
})

const Layout: React.FC<{ pageProps: any }> = ({ children, pageProps }) => {
  const builderTheme = pageProps.theme

  const isLive = !Builder.isEditing && !Builder.isPreviewing
  return (
    <CommerceProvider {...swellConfig}>
      <BuilderContent
        isStatic
        {...(isLive && { content: builderTheme })}
        modelName="theme"
      >
        {(data, loading) => {
          if (loading && !builderTheme) {
            return 'loading ...'
          }
          const siteSettings = data?.siteSettings
          const colorOverrides = data?.colorOverrides
          const siteSeoInfo = data?.siteInformation
          return (
            <ManagedUIContext key={data?.id} siteSettings={siteSettings}>
              <Head seoInfo={siteSeoInfo || seoConfig} />
              <InnerLayout
                themeName={data?.theme || 'base'}
                colorOverrides={colorOverrides}
              >
                {children}
              </InnerLayout>
            </ManagedUIContext>
          )
        }}
      </BuilderContent>
    </CommerceProvider>
  )
}

const InnerLayout: React.FC<{
  themeName: string
  colorOverrides?: {
    text?: string
    background?: string
    primary?: string
    secondary?: string
    muted?: string
  }
}> = ({ themeName, children, colorOverrides }) => {
  const theme = {
    ...themesMap[themeName],
    colors: {
      ...themesMap[themeName].colors,
      ...colorOverrides,
    },
  }
  const { displaySidebar, closeSidebar } = useUI()
  // const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div
        sx={{
          margin: `0 auto`,
          px: 0,
          minWidth: '60vw',
          minHeight: 800,
          zIndex: 1,
        }}
      >
        <main>{children}</main>
      </div>

      <Sidebar
        open={
          displaySidebar ||
          (builder.editingModel || Builder.previewingModel) ===
            'cart-upsell-sidebar'
        }
        onClose={closeSidebar}        
      >
        <CartSidebarView />
      </Sidebar>
      {/* <NoSSR>
        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={Builder.isEditing ? true : acceptedCookies}
          action={
            <Button onClick={() => onAcceptCookies()}>Accept cookies</Button>
          }
        />
      </NoSSR> */}
    </ThemeProvider>
  )
}

export default Layout

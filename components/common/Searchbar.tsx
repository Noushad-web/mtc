/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { LoadingDots } from '@components/ui'
import { ProductGrid } from 'blocks/ProductGrid/ProductGrid'
import { Button, Themed, jsx, Input, Label } from 'theme-ui'
import { searchProducts } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import { ExpandModal } from 'react-spring-modal'
import { throttle } from 'lodash'
import 'react-spring-modal/styles.css'
import { Cross } from '@components/icons'
import { BsSearch } from 'react-icons/bs'

interface Props {
  className?: string
  id?: string
}

const Searchbar: FC<Props> = () => {
  const router = useRouter()
  const { q } = router.query
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(false)
  }, [router.asPath.split('?')[0]])

  return (
    <React.Fragment>
      <ExpandModal
        transitionConfig={{}}
        contentTransition={{}}
        overlayProps={{
          style: {
            maxWidth: 1920,
            left: '50%',
            transform: 'translateX(-50%)',
            overflow: 'auto',
            top: (buttonRef.current?.getBoundingClientRect().bottom || 0) + 15,
            zIndex: 999,
          },
        }}
        isOpen={isOpen}
      >
        <SearchModalContent
          initialSearch={q && String(q)}
          onSearch={(term: string) => {
            const op = q ? 'replace' : 'push'
            router[op]({
              pathname: router.asPath.split('?')[0],
              query: {
                q: term,
              },
            })
          }}
        />
      </ExpandModal>

      <Themed.div
        ref={buttonRef}
        as="button"
        className="searchIcon social__icon"
        mx={2}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Search"
      >
        {isOpen ? (
          <Cross />
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px">
              <path
                fillRule="evenodd"
                fill="rgb(255, 255, 255)"
                d="M22.772,21.739 L16.837,15.899 C18.391,14.210 19.346,11.977 19.346,9.519 C19.345,4.262 15.015,0.000 9.673,0.000 C4.331,0.000 0.001,4.262 0.001,9.519 C0.001,14.776 4.331,19.037 9.673,19.037 C11.981,19.037 14.098,18.239 15.761,16.912 L21.719,22.776 C22.010,23.062 22.481,23.062 22.771,22.776 C23.062,22.490 23.062,22.025 22.772,21.739 ZM9.673,17.573 C5.153,17.573 1.489,13.967 1.489,9.519 C1.489,5.071 5.153,1.465 9.673,1.465 C14.193,1.465 17.857,5.071 17.857,9.519 C17.857,13.967 14.193,17.573 9.673,17.573 Z"
              />
            </svg>{' '}
            <span className="searchText">Search</span>
          </>
        )}
      </Themed.div>
    </React.Fragment>
  )
}

const SearchModalContent = (props: {
  initialSearch?: string
  onSearch: (term: string) => any
}) => {
  const [search, setSearch] = useState(
    props.initialSearch && String(props.initialSearch)
  )
  const [products, setProducts] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const getProducts = async (searchTerm: string) => {
    setLoading(true)
    const results = await searchProducts(
      String(searchTerm),
      // TODO: pagination
      20,
      0
    )
    setSearch(searchTerm)
    setProducts(results)
    setLoading(false)
    if (searchTerm) {
      props.onSearch(searchTerm)
    }
  }

  useEffect(() => {
    if (search) {
      getProducts(search)
    }
  }, [])

  const throttleSearch = useCallback(throttle(getProducts), [])

  return (
    <Themed.div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: [1, 2],
        width: '100%',
      }}
    >
      <Input
        type="search"
        sx={{ marginBottom: 15 }}
        defaultValue={props.initialSearch}
        placeholder="Search for products..."
        onChange={(event: any) => throttleSearch(event.target.value)}
      />
      {loading ? (
        <LoadingDots />
      ) : products.length ? (
        <>
          <Label>
            Search Results for "<strong>{search}</strong>"
          </Label>
          <ProductGrid
            cardProps={{
              imgHeight: 540,
              imgWidth: 540,
              imgPriority: false,
            }}
            products={products}
            offset={0}
            limit={products.length}
          ></ProductGrid>
        </>
      ) : (
        <span>
          {search ? (
            <>
              There are no products that match "<strong>{search}</strong>"
            </>
          ) : (
            <> </>
          )}
        </span>
      )}
    </Themed.div>
  )
}

export default Searchbar

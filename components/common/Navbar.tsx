/* eslint-disable @next/next/no-img-element */
/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect } from 'react'
import { UserNav } from '@components/common'
import env from '@config/env'
import { BuilderComponent, builder } from '@builder.io/react'
import { useCart } from '@lib/swell/storefront-data-hooks'
import { jsx } from 'theme-ui'
import Searchbar from './Searchbar'
import NavItem from './NavItem'
import {
  getLoggedInUser,
  getNavbar,
} from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import { INavbar } from '@lib/swell/storefront-data-hooks/src/types'
import Dropdown from '../Dropdown/Dropdown'
import PhoneNavbar from './PhoneNavbar'
import logo from '../../public/logo.png'
import Image from 'next/image'
import LoadingSpinner from '@components/ui/LoadingSpinner'
import Link from 'next/link'
import Logout__Button from '@components/ui/Logout__Button'
import { RiLoginBoxLine } from 'react-icons/ri'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const Navbar: FC = () => {
  const [announcement, setAnnouncement] = useState()
  const [navLink, setNavLink] = useState<INavbar>()
  const cart = useCart()

  const [user, setUser] = useState<{ name?: string; email: string }>()
  const router = useRouter()

  const getUser = async () => {
    await getLoggedInUser().then((data) => {
      // console.log(data)
      if (data) {
        setUser(data)
        router.push('/', undefined, { shallow: true })
      }
    })
  }

  const userDetail = Cookies.get('user')
  useEffect(() => {
    if (userDetail) {
      // console.log(JSON.parse(userDetail))
      setUser(JSON.parse(userDetail))
      router.push('/', undefined, { shallow: true })
    } else {
      getUser()
    }
  }, [getLoggedInUser, userDetail])

  // fetching Annoucement content
  useEffect(() => {
    async function fetchContent() {
      const items = cart?.items || []
      const anouncementContent = await builder
        .get('announcement-bar', {
          cachebust: env.isDev,
          userAttributes: {
            itemInCart: items.map((item: any) => item.product.slug),
          } as any,
        })
        .toPromise()
      setAnnouncement(anouncementContent)
    }
    fetchContent()
  }, [cart?.items])

  const getHeader = () => {
    getNavbar('header').then((data: INavbar) => {
      setNavLink(data)
    })
  }

  useEffect(() => {
    getHeader()
  }, [getNavbar])

  return (
    <>
      {navLink ? (
        <>
          <header className="header__wrapper header-desktop">
            <div className="header">
              <nav className="header__nav">
                <figure className="header__logo">
                  <Link href={`/`}>
                    <Image
                      className="img-fluid--headerLogo"
                      src={logo.src}
                      alt="logo"
                      height={logo.height}
                      width={logo.width}
                    />
                  </Link>
                </figure>

                <ul className="social">
                  <Link href="#">
                    <li className="social__list">
                      <div className="m-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28px"
                          height="28px"
                        >
                          <path
                            fillRule="evenodd"
                            fill="rgb(255, 255, 255)"
                            d="M14.000,-0.000 C6.268,-0.000 -0.000,6.268 -0.000,14.000 C-0.000,21.732 6.268,28.000 14.000,28.000 C21.732,28.000 28.000,21.731 28.000,14.000 C28.000,6.268 21.732,-0.000 14.000,-0.000 ZM14.000,27.200 C6.709,27.200 0.799,21.291 0.799,14.000 C0.799,6.709 6.709,0.799 14.000,0.799 C21.291,0.799 27.201,6.709 27.201,14.000 C27.201,21.291 21.291,27.200 14.000,27.200 ZM14.400,5.305 L13.437,5.305 L13.464,14.903 L19.222,20.071 L19.719,19.231 L14.400,14.312 L14.400,5.305 Z"
                          />
                        </svg>
                        <div className="line-height-normal nowrap">
                          <strong>We are Open</strong> <br />
                          <small>Office Hours M-F 9:00am - 4:30pm MDT</small>
                        </div>
                      </div>
                    </li>
                  </Link>

                  {/* <VerticalDivider /> */}

                  <Link href="tel:+14065951970" passHref>
                    <li className="social__list">
                      <div className="m-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21px"
                          height="21px"
                        >
                          <path
                            fillRule="evenodd"
                            fill="rgb(255, 255, 255)"
                            d="M20.526,16.617 L17.284,13.365 C16.638,12.721 15.569,12.740 14.900,13.410 L13.267,15.048 C13.164,14.991 13.057,14.931 12.945,14.868 C11.914,14.295 10.501,13.510 9.016,12.018 C7.526,10.525 6.742,9.107 6.169,8.072 C6.108,7.962 6.050,7.856 5.993,7.756 L7.089,6.658 L7.628,6.117 C8.297,5.446 8.316,4.374 7.671,3.727 L4.429,0.475 C3.785,-0.171 2.715,-0.151 2.046,0.520 L1.132,1.442 L1.157,1.467 C0.851,1.859 0.595,2.311 0.404,2.798 C0.229,3.263 0.119,3.706 0.069,4.149 C-0.359,7.708 1.263,10.961 5.664,15.374 C11.748,21.475 16.652,21.014 16.863,20.992 C17.324,20.936 17.765,20.826 18.214,20.651 C18.696,20.462 19.147,20.206 19.537,19.900 L19.557,19.917 L20.483,19.008 C21.151,18.337 21.170,17.265 20.526,16.617 ZM19.763,18.285 L19.355,18.694 L19.192,18.851 C18.936,19.098 18.493,19.447 17.847,19.700 C17.479,19.842 17.118,19.933 16.749,19.977 C16.703,19.981 12.091,20.376 6.384,14.653 C1.531,9.787 0.753,6.983 1.079,4.267 C1.120,3.907 1.210,3.545 1.354,3.166 C1.609,2.514 1.956,2.070 2.202,1.813 L2.766,1.242 C3.038,0.969 3.462,0.948 3.710,1.197 L6.952,4.448 C7.200,4.698 7.180,5.123 6.908,5.397 L4.719,7.590 L4.921,7.931 C5.033,8.121 5.152,8.335 5.279,8.566 C5.881,9.655 6.705,11.146 8.296,12.740 C9.884,14.333 11.368,15.158 12.451,15.761 C12.685,15.891 12.899,16.009 13.091,16.125 L13.431,16.327 L15.619,14.132 C15.892,13.859 16.318,13.839 16.566,14.088 L19.807,17.338 C20.054,17.587 20.035,18.012 19.763,18.285 Z"
                          />
                        </svg>
                        <strong>+1 (406) 595-1970</strong>
                      </div>
                    </li>
                  </Link>

                  {/* <VerticalDivider /> */}

                  <li className="social__list">
                    <div className="m-auto">
                      <Searchbar className="social__list__icon"></Searchbar>
                    </div>
                  </li>

                  {/* <VerticalDivider /> */}

                  {user ? (
                    <li className="social__list">
                      <div className="m-auto">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17px"
                          height="19px"
                        >
                          <path
                            fillRule="evenodd"
                            fill="rgb(255, 255, 255)"
                            d="M1.643,16.662 L1.635,16.708 L1.635,16.708 L1.635,17.515 L15.364,17.515 L15.364,16.920 L15.349,16.748 C15.254,15.728 14.765,15.332 13.985,14.530 C13.241,13.762 12.835,13.133 11.653,12.716 C11.267,13.067 10.822,13.351 10.341,13.564 C9.772,13.809 9.152,13.948 8.503,13.948 C7.825,13.948 7.183,13.802 6.599,13.537 C6.103,13.312 5.644,13.001 5.250,12.624 C4.061,13.014 3.655,13.624 2.918,14.385 C2.160,15.167 1.693,15.570 1.642,16.603 L1.035,16.603 L1.642,16.662 L1.643,16.662 ZM8.503,-0.000 C9.874,-0.000 11.106,0.649 11.989,1.688 C12.842,2.695 13.375,4.079 13.375,5.602 C13.375,7.126 12.842,8.509 11.989,9.516 C11.106,10.563 9.874,11.205 8.503,11.205 C7.132,11.205 5.892,10.563 5.010,9.516 C4.157,8.509 3.624,7.126 3.624,5.602 C3.624,4.079 4.157,2.695 5.010,1.688 C5.892,0.649 7.132,-0.000 8.503,-0.000 L8.503,-0.000 ZM10.876,2.809 C10.183,1.995 9.539,1.760 8.503,1.760 C7.460,1.760 7.119,1.994 6.427,2.809 C5.705,3.657 5.260,4.291 5.260,5.603 C5.260,6.914 5.704,8.100 6.427,8.947 C7.119,9.768 7.460,9.446 8.503,9.446 C9.539,9.446 9.880,9.768 10.572,8.947 C11.294,8.100 11.739,6.914 11.739,5.603 C11.739,4.291 11.598,3.932 10.876,3.085 L10.876,2.809 ZM0.037,16.245 C0.175,15.112 0.707,14.079 1.546,13.218 C2.465,12.264 3.756,11.516 5.251,11.086 L5.579,10.993 L5.798,11.238 C6.155,11.622 6.578,11.933 7.052,12.152 C7.497,12.350 7.986,12.463 8.504,12.463 C8.999,12.463 9.474,12.357 9.904,12.172 C10.356,11.973 10.772,11.681 11.129,11.311 L11.355,11.079 L11.683,11.178 C13.163,11.648 14.440,12.410 15.359,13.364 C16.176,14.198 16.730,15.185 16.920,16.245 L17.000,16.245 L17.000,16.708 L17.000,18.536 L17.000,19.000 L16.482,19.000 L0.518,19.000 L-0.000,19.000 L-0.000,18.536 L-0.000,16.708 L-0.000,16.245 L0.037,16.245 Z"
                          />
                        </svg> */}
                        <Dropdown
                          btnStyle="navItem__btnStyle navItem__btnStyle--logout"
                          name={user.name}
                          url={`#`}
                        >
                          <Dropdown.Option
                            optionStyle={`navItem__btnStyle__option navItem__btnStyle__option--logout `}
                            href={`#`}
                          >
                            <UserNav className="social__list__icon">
                              <span className="cartIcon">Cart</span>
                            </UserNav>
                          </Dropdown.Option>

                          <Dropdown.Option
                            optionStyle={`navItem__btnStyle__option navItem__btnStyle__option--logout`}
                            href={`#`}
                          >
                            <Logout__Button className="LogoutBtn">
                              <div>
                                <RiLoginBoxLine
                                  sx={{ display: 'inline-block', fontSize: 25 }}
                                />{' '}
                                Logout
                              </div>
                            </Logout__Button>
                          </Dropdown.Option>
                        </Dropdown>
                      </div>
                    </li>
                  ) : (
                    <Link href="/my-account">
                      <li className="social__list">
                        <div className="m-auto--signIn m-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17px"
                            height="19px"
                          >
                            <path
                              fillRule="evenodd"
                              fill="rgb(255, 255, 255)"
                              d="M1.643,16.662 L1.635,16.708 L1.635,16.708 L1.635,17.515 L15.364,17.515 L15.364,16.920 L15.349,16.748 C15.254,15.728 14.765,15.332 13.985,14.530 C13.241,13.762 12.835,13.133 11.653,12.716 C11.267,13.067 10.822,13.351 10.341,13.564 C9.772,13.809 9.152,13.948 8.503,13.948 C7.825,13.948 7.183,13.802 6.599,13.537 C6.103,13.312 5.644,13.001 5.250,12.624 C4.061,13.014 3.655,13.624 2.918,14.385 C2.160,15.167 1.693,15.570 1.642,16.603 L1.035,16.603 L1.642,16.662 L1.643,16.662 ZM8.503,-0.000 C9.874,-0.000 11.106,0.649 11.989,1.688 C12.842,2.695 13.375,4.079 13.375,5.602 C13.375,7.126 12.842,8.509 11.989,9.516 C11.106,10.563 9.874,11.205 8.503,11.205 C7.132,11.205 5.892,10.563 5.010,9.516 C4.157,8.509 3.624,7.126 3.624,5.602 C3.624,4.079 4.157,2.695 5.010,1.688 C5.892,0.649 7.132,-0.000 8.503,-0.000 L8.503,-0.000 ZM10.876,2.809 C10.183,1.995 9.539,1.760 8.503,1.760 C7.460,1.760 7.119,1.994 6.427,2.809 C5.705,3.657 5.260,4.291 5.260,5.603 C5.260,6.914 5.704,8.100 6.427,8.947 C7.119,9.768 7.460,9.446 8.503,9.446 C9.539,9.446 9.880,9.768 10.572,8.947 C11.294,8.100 11.739,6.914 11.739,5.603 C11.739,4.291 11.598,3.932 10.876,3.085 L10.876,2.809 ZM0.037,16.245 C0.175,15.112 0.707,14.079 1.546,13.218 C2.465,12.264 3.756,11.516 5.251,11.086 L5.579,10.993 L5.798,11.238 C6.155,11.622 6.578,11.933 7.052,12.152 C7.497,12.350 7.986,12.463 8.504,12.463 C8.999,12.463 9.474,12.357 9.904,12.172 C10.356,11.973 10.772,11.681 11.129,11.311 L11.355,11.079 L11.683,11.178 C13.163,11.648 14.440,12.410 15.359,13.364 C16.176,14.198 16.730,15.185 16.920,16.245 L17.000,16.245 L17.000,16.708 L17.000,18.536 L17.000,19.000 L16.482,19.000 L0.518,19.000 L-0.000,19.000 L-0.000,18.536 L-0.000,16.708 L-0.000,16.245 L0.037,16.245 Z"
                            />
                          </svg>
                          Register &nbsp; |&nbsp; Sign In
                        </div>
                      </li>
                    </Link>
                  )}

                  {/* <VerticalDivider /> */}

                  <li className="social__list">
                    <div className="m-auto">
                      <UserNav className="social__list__icon">
                        <span className="cartIcon">Cart</span>
                      </UserNav>
                    </div>
                  </li>
                </ul>

                <nav className="header__nav__lower">
                  <div className="menu">
                    <Link href="/">Home</Link>
                    {navLink.items.map((eachCategory, index) => {
                      return (
                        <div key={index}>
                          <NavItem navItemData={eachCategory} />
                        </div>
                      )
                    })}
                    <Dropdown
                      btnStyle="navItem__btnStyle"
                      name="Info"
                      url={`/`}
                    >
                      <Dropdown.Option
                        optionStyle={'navItem__btnStyle__option'}
                        href={`/blog`}
                      >
                        Blog
                      </Dropdown.Option>
                      <Dropdown.Option
                        optionStyle={'navItem__btnStyle__option'}
                        href={`/about-us`}
                      >
                        About
                      </Dropdown.Option>
                      <Dropdown.Option
                        href={`/contact-us`}
                        optionStyle={'navItem__btnStyle__option'}
                      >
                        Contact
                      </Dropdown.Option>
                      <Dropdown.Option
                        href={`/dealers`}
                        optionStyle={'navItem__btnStyle__option'}
                      >
                        Dealers
                      </Dropdown.Option>
                      <Dropdown.Option
                        href={`/product-returns`}
                        optionStyle={'navItem__btnStyle__option'}
                      >
                        Product Returns
                      </Dropdown.Option>
                    </Dropdown>
                  </div>
                </nav>
              </nav>
            </div>
          </header>
        </>
      ) : (
        <LoadingSpinner />
      )}

      {/* {navLink ? <PhoneNavbar navLink={navLink} /> : null} */}
    </>
  )
}

export default Navbar

{
  /* <BuilderComponent
        content={announcement}
        model="announcement-bar"
      /> */
}

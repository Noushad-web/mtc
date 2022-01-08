import React, { useRef } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineWatchLater } from 'react-icons/md'
import Searchbar from './Searchbar'
import { UserNav } from '@components/common'
// import { BiUser } from 'react-icons/bi'
// import { IoCallOutline } from 'react-icons/io5'
import { Dropdown } from 'rsuite'
import Image from 'next/image'
import { INavbar } from '@lib/swell/storefront-data-hooks/src/types'
import { useUI } from '@components/ui/context'
import logo from '../../public/logo.png'
import Link from 'next/link'

const PhoneNavbar = ({ navLink }: { navLink: INavbar }) => {
  const navbarLower = useRef<HTMLElement>(null)
  const { navigationLinks } = useUI()

  const menuButtonHandle = () => {
    const navLowerElem = navbarLower.current as HTMLElement
    const classArray = [...navLowerElem.classList]

    if (classArray.includes('showNavbar')) {
      navLowerElem.classList.remove('showNavbar')
    } else {
      navLowerElem.classList.add('showNavbar')
    }
  }

  return (
    <header className="headerPhone__wrapper header-phone">
      <div className="headerPhone">
        <nav className="headerPhone__nav">
          <div className="headerPhone__upperSection">
            <div className="headerPhone__upperSection__hamburgerIcon">
              <button onClick={menuButtonHandle}>
                <GiHamburgerMenu />
              </button>
            </div>

            <figure className="headerPhone__upperSection__logo">
              <Image
                className='className="img-fluid--headerPhoneLogo"'
                alt="logo"
                height={logo.height}
                width={logo.width}
                src={logo.src}
              />
            </figure>

            <ul className="social">
              <li className="social__list social__list--open">
                <span className="timeIcon social__icon">
                  <MdOutlineWatchLater />
                </span>

                <div className="social__text--open">
                  <p>Open M-F 9:00am - 4:30pm</p>
                </div>
              </li>

              <li className="social__list social__list--search">
                <Searchbar className="searchIcon social__icon"></Searchbar>
              </li>

              <li className="social__list social__list--cart">
                <UserNav className="cartIcon social__icon" />
              </li>
            </ul>
            <nav className="headerPhone__nav__lower" ref={navbarLower}>
              <ul className="menu">
                <li className="menu__list">
                  <Link href="/">Home</Link>
                </li>
                {navLink.items.map((eachCateg, index) => {
                  return (
                    <li key={index} className="menu__list">
                      <Dropdown
                        className="dropdown"
                        title={eachCateg.name}
                        id={eachCateg.name}
                      >
                        {eachCateg.items.map((eachSubCateg, index) => {
                          return eachSubCateg.items.map((eachNav, index) => {
                            return (
                              <Dropdown.Item
                                key={index}
                                className="dropdown__item"
                              >
                                <Link href={eachNav.value.slug}>
                                  {eachNav.name}
                                </Link>
                              </Dropdown.Item>
                            )
                          })
                        })}
                      </Dropdown>
                    </li>
                  )
                })}

                <li className="menu__list">
                  <Dropdown className="dropdown" title="Info">
                    <Dropdown.Item className="dropdown__item">
                      <Link href="/blog">Blog</Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown__item">
                      <Link href="/about-us">About</Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown__item">
                      <Link href="/contact-us">Contact</Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown__item">
                      <Link href="/dealers">Dealers</Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown__item">
                      <Link href="/product-returns">Product Returns</Link>
                    </Dropdown.Item>
                  </Dropdown>
                </li>
              </ul>              
            </nav>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default PhoneNavbar

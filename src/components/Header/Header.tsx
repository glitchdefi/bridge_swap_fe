/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { useToggleMobileMenu } from 'hooks/useToggleMobileMenu'

import { colors } from 'styles/Colors'
import { media } from 'styles/media'
import { OutlineButton } from 'components/Button'
import { ThemeToggle } from './ThemeToggle'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 8px;

  .header-logo {
    max-width: 125px;
    height: 60px;
  }
`

const Header: React.FC = () => {
  const { isOpenNavMobile, toggleNavMobile } = useToggleMobileMenu()

  const handleScroll = () => {
    const navbar: HTMLElement = document.getElementById('navbar')

    if (window.pageYOffset >= 1) {
      navbar.classList.add('sticky')
    } else {
      navbar.classList.remove('sticky')
    }
  }

  useEffect(() => {
    // window.addEventListener('scroll', handleScroll)
    // return () => {
    //   window.removeEventListener('scroll', handleScroll)
    // }
  }, [])

  return (
    <Wrapper>
      <img className="header-logo" src="./images/logo-with-text.png" alt="logo" />
      <div className="flex flex-row items-center">
        <OutlineButton>
          <img src="./images/logo-metamask.png" alt="metamask-logo" />
          <span>Connect with Metamask</span>
        </OutlineButton>
        <span className="mx-4 text-color1"> | </span>
        <ThemeToggle />
      </div>
    </Wrapper>
  )
}

export default Header

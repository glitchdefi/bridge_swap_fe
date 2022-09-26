/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { useToggleMobileMenu } from 'hooks/useToggleMobileMenu'

import { colors } from 'styles/Colors'
import { media } from 'styles/media'

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
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return <div>header</div>
}

export default Header

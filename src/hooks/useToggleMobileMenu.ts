import { useState, useCallback } from 'react'

export const useToggleMobileMenu = (): {
  isOpenNavMobile: boolean
  toggleNavMobile: () => void
} => {
  const [isOpenNavMobile, setIsOpenNavMobile] = useState(false)

  const toggleNavMobile = useCallback(() => {
    const mobileNav = document.getElementById('full-menu-screen')

    if (isOpenNavMobile) {
      mobileNav?.setAttribute(
        'style',
        'opacity:0; translate3d(100%, 0px, 0px) translate3d(0px, 0px, 0px); transition-delay: 0.5s;',
      )
      document.body.setAttribute('style', 'overflow: inherit;')
    } else {
      mobileNav?.setAttribute('style', 'opacity:1; transform: translate3d(0px, 0px, 0px) translate3d(0px, 0px, 0px)')
      document.body.setAttribute('style', 'overflow: hidden;')
    }

    setIsOpenNavMobile((prev) => !prev)
  }, [isOpenNavMobile])

  return { isOpenNavMobile, toggleNavMobile }
}

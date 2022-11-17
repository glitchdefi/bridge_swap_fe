import React, { useCallback, useState } from 'react'
import { styled } from 'twin.macro'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

import { useMetamask } from 'hooks/useMetamask'
import { useAccounts as useGlitchAccounts } from 'hooks/substrate/useAccounts'

// Components
import { HamburgerIcon } from 'components/Svg'
import { OutlineButton } from 'components/Button'
import { ThemeToggle } from './components/ThemeToggle'
import { HistoryBox } from './components/HistoryBox'
import { AccountInfo } from './components/AccountInfo'
import { MetamaskInfoModal } from './components/MetamaskInfoModal'
import { GlitchInfoModal } from './components/GlitchInfoModal'

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
  const router = useRouter()
  const { isConnected } = useAccount()
  const { hasAccounts, allAccounts, areAccountsLoaded } = useGlitchAccounts()
  const { onConnect } = useMetamask()

  const [isOpenMetamaskInfoModal, setIsOpenMetamaskInfoModal] = useState<boolean>(false)
  const [isOpenGlitchInfoModal, setIsOpenGlitchInfoModal] = useState<boolean>(false)

  const goToHome = useCallback(() => {
    router.push('/')
  }, [router])

  const toggleOpenMetamaskInfoModal = useCallback(() => {
    setIsOpenMetamaskInfoModal((prev) => !prev)
  }, [])

  const toggleOpenGlitchInfoModal = useCallback(() => {
    setIsOpenGlitchInfoModal((prev) => !prev)
  }, [])

  return (
    <Wrapper>
      <div role="button" tabIndex={0} className="cursor-pointer" onClick={goToHome}>
        <img className="header-logo" src="./images/logo-with-text.png" alt="logo" />
      </div>

      <div className="flex items-center">
        {isConnected ? (
          <div className="hidden lg:flex lg:items-center">
            {!areAccountsLoaded ? (
              <div className="mr-4 text-primary">Loading Glitch accounts ...</div>
            ) : hasAccounts ? (
              <div className="mr-4">
                <AccountInfo isGlitchNetwork glitchAccounts={allAccounts} onClick={toggleOpenGlitchInfoModal} />
              </div>
            ) : null}
            <div className="mr-4">
              <AccountInfo glitchAccounts={[]} onClick={toggleOpenMetamaskInfoModal} />
            </div>
            <HistoryBox />
          </div>
        ) : (
          <div className="hidden lg:block">
            <OutlineButton onClick={() => onConnect()}>
              <img src="./images/logo-metamask.png" alt="metamask-logo" />
              <span>Connect with Metamask</span>
            </OutlineButton>
          </div>
        )}

        <div className="cursor-pointer lg:hidden">
          <HamburgerIcon width={24} color="white" />
        </div>
        <span className="mx-4 text-color1"> | </span>
        <ThemeToggle />
      </div>

      {/* Modals */}
      {isConnected && <MetamaskInfoModal isOpen={isOpenMetamaskInfoModal} onClose={toggleOpenMetamaskInfoModal} />}
      <GlitchInfoModal isOpen={isOpenGlitchInfoModal} onClose={toggleOpenGlitchInfoModal} />
    </Wrapper>
  )
}

export default Header

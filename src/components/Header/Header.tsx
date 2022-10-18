import React, { useCallback, useState } from 'react'
import { styled } from 'twin.macro'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

import { useMetamask } from 'hooks/useMetamask'

// Components
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
          <div className="flex items-center">
            {/* <div className="mr-4">
              <AccountInfo isGlitchNetwork onClick={toggleOpenGlitchInfoModal} />
            </div> */}
            <div className="mr-4">
              <AccountInfo onClick={toggleOpenMetamaskInfoModal} />
            </div>
            <HistoryBox />
          </div>
        ) : (
          <OutlineButton onClick={() => onConnect()}>
            <img src="./images/logo-metamask.png" alt="metamask-logo" />
            <span>Connect with Metamask</span>
          </OutlineButton>
        )}

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

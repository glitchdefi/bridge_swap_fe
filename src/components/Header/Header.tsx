import React, { useCallback, useEffect, useState } from 'react'
import { styled } from 'twin.macro'
import { useRouter } from 'next/router'
import { useAccount, useNetwork } from 'wagmi'

import { useMetamask } from 'hooks/useMetamask'
import { useAccounts as useGlitchAccounts } from 'hooks/substrate/useAccounts'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { isEthereumChain } from 'utils/isEthereumChain'
import { ethereumChainIds } from 'constants/supportedNetworks'

// Components
import { HamburgerIcon } from 'components/Svg'
import { OutlineButton } from 'components/Button'
// import { ThemeToggle } from './components/ThemeToggle'
// import { HistoryBox } from './components/HistoryBox'
import { AccountInfo } from './components/AccountInfo'
import { MetamaskInfoModal } from './components/MetamaskInfoModal'
import { GlitchInfoModal } from './components/GlitchInfoModal'
import { MetamaskNotDetectedModal } from '../Shared/MetamaskNotDetectedModal'
import { HistoryBox } from './components/HistoryBox'
import { VoyagerModal } from './components/VoyagerModal'

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

  button {
    min-height: 36px;
  }

  .cross-chain-swap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    > img {
      width: 100px;
      height: auto;
      object-fit: contain;
      margin-right: 0px;
    }
  }
`

const Header: React.FC = () => {
  const router = useRouter()
  const { isConnected: isMetamaskConnected } = useAccount()
  const { chain } = useNetwork()
  const { hasAccounts, allAccounts, areAccountsLoaded } = useGlitchAccounts()
  const { onConnect, error: connectError } = useMetamask()
  const { switchNetwork } = useSwitchNetwork()

  const [isOpenMetamaskInfoModal, setIsOpenMetamaskInfoModal] = useState<boolean>(false)
  const [isOpenGlitchInfoModal, setIsOpenGlitchInfoModal] = useState<boolean>(false)
  const [isOpenMetamaskNotDetectedModal, setIsOpenMetamaskNotDetectedModal] = useState<boolean>(false)
  const [isOpenVoyagerModal, setIsOpenVoyagerModal] = useState<boolean>(false)

  useEffect(() => {
    if (isMetamaskConnected && !isEthereumChain(chain.id)) {
      switchNetwork(ethereumChainIds[1])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMetamaskConnected, chain])

  useEffect(() => {
    if (connectError && connectError?.message?.includes('Connector not found') && !isOpenMetamaskNotDetectedModal) {
      setIsOpenMetamaskNotDetectedModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectError])

  const goToHome = useCallback(() => {
    router.push('/')
  }, [router])

  const toggleOpenMetamaskInfoModal = useCallback(() => {
    setIsOpenMetamaskInfoModal((prev) => !prev)
  }, [])

  const toggleOpenGlitchInfoModal = useCallback(() => {
    setIsOpenGlitchInfoModal((prev) => !prev)
  }, [])

  const toggleMetamaskNotDetectedModal = useCallback(() => {
    setIsOpenMetamaskNotDetectedModal((prev) => !prev)
  }, [])

  const toggleVoyagerModal = useCallback(() => {
    setIsOpenVoyagerModal((prev) => !prev)
  }, [])

  return (
    <Wrapper>
      <div role="button" tabIndex={0} className="cursor-pointer" onClick={goToHome}>
        <img className="header-logo" src="./images/logo-with-text.png" alt="logo" />
      </div>

      <div className="flex items-center">
        <div className="hidden gap-4 lg:flex lg:items-center">
          <OutlineButton className="!py-1 cross-chain-swap" onClick={toggleVoyagerModal}>
            <span>CROSS CHAIN SWAP</span>
          </OutlineButton>

          {!areAccountsLoaded ? (
            <div className="text-primary">Loading Glitch accounts ...</div>
          ) : hasAccounts ? (
            <div>
              <AccountInfo isGlitchNetwork glitchAccounts={allAccounts} onClick={toggleOpenGlitchInfoModal} />
            </div>
          ) : null}
          {isMetamaskConnected ? (
            <div>
              <AccountInfo glitchAccounts={[]} onClick={toggleOpenMetamaskInfoModal} />
            </div>
          ) : (
            <div className="hidden lg:block">
              <OutlineButton className="!py-1" onClick={() => onConnect()}>
                <img src="./images/logo-metamask.png" alt="metamask-logo" />
                <span>Connect with Metamask</span>
              </OutlineButton>
            </div>
          )}
          <HistoryBox />
        </div>

        <div className="cursor-pointer lg:hidden">
          <HamburgerIcon width={24} color="white" />
        </div>
        {/* <span className="mx-4 text-color1"> | </span>
        <ThemeToggle /> */}
      </div>

      {/* Modals */}
      {isMetamaskConnected && (
        <MetamaskInfoModal isOpen={isOpenMetamaskInfoModal} onClose={toggleOpenMetamaskInfoModal} />
      )}
      <GlitchInfoModal isOpen={isOpenGlitchInfoModal} onClose={toggleOpenGlitchInfoModal} />
      <MetamaskNotDetectedModal isOpen={isOpenMetamaskNotDetectedModal} onClose={toggleMetamaskNotDetectedModal} />
      <VoyagerModal isOpen={isOpenVoyagerModal} onClose={toggleVoyagerModal} />
    </Wrapper>
  )
}

export default Header

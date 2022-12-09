import React, { memo, useState, useMemo } from 'react'
import { styled, theme } from 'twin.macro'
import { useNetwork } from 'wagmi'

import { useAddress } from 'hooks/useAddress'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { usePolkadotApi } from 'contexts/PolkadotApi/hooks'

import { truncateAddress } from 'utils/strings'

// Components
import { Text } from 'components/Text'
import { OutlineDownArrow } from 'components/Svg'
import { Dropdown } from 'components/Dropdown'
import { NETWORK_DROPDOWN } from 'constants/index'

const AccountInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  max-height: 32px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid ${theme`colors.color1`};
  cursor: pointer;

  .account-status {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${theme`colors.success`};
    border: 2px solid ${theme`colors.color3`};
    position: absolute;
    right: 10px;
    bottom: -2px;
  }

  img {
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
`

interface Props {
  isGlitchNetwork?: boolean
  glitchAccounts: string[]
  onClick: () => void
}

const DROPDOWN_DATA = [
  { ...NETWORK_DROPDOWN.eth, icon: './images/logo-eth.png', iconCls: 'w-5 h-5' },
  // { ...NETWORK_DROPDOWN.bsc, icon: './images/logo-bnb.png', iconCls: 'w-5 h-5' },
]

export const AccountInfo: React.FC<Props> = memo(({ isGlitchNetwork, glitchAccounts, onClick }) => {
  const { shortAddress } = useAddress()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { accountSelected: glitchAccountSelected, setAccountSelected } = usePolkadotApi()

  const [openNetworkDropdown, setOpenNetworkDropdown] = useState<boolean>(false)

  const networkSelected = useMemo(() => {
    const network = DROPDOWN_DATA.find((n) => n.value.includes(chain?.id))
    return network ?? { label: 'Unsupported network' }
  }, [chain?.id])

  const glitchAccountsDropdownList = useMemo(() => {
    if (!glitchAccounts) return []
    return glitchAccounts.map((o) => {
      return {
        value: o,
        label: truncateAddress(o),
      }
    })
  }, [glitchAccounts])

  return (
    <Dropdown
      button={
        <AccountInfoWrapper>
          <div role="button" tabIndex={0} className="flex items-center" onClick={onClick}>
            <div className="relative">
              <img src={isGlitchNetwork ? './images/logo.png' : './images/logo-metamask.png'} alt="wallet-logo" />
              <div className="account-status" />
            </div>
            <Text color={theme`colors.primary`}>
              {isGlitchNetwork ? truncateAddress(glitchAccountSelected) : shortAddress}
            </Text>
            <span className="mx-2 text-color1"> | </span>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="flex items-center select-none"
            onClick={() => {
              if (isGlitchNetwork && glitchAccounts) {
                setOpenNetworkDropdown((prev) => !prev)
              }
            }}
          >
            <Text color={theme`colors.color8`} className="mr-2">
              {isGlitchNetwork ? 'Glitch UAT' : networkSelected?.label}
            </Text>
            <OutlineDownArrow width={12} height={12} />
          </div>
        </AccountInfoWrapper>
      }
      stickyTitle={isGlitchNetwork ? 'Switch account' : 'Switch network'}
      value={isGlitchNetwork ? glitchAccountSelected : chain.id}
      items={isGlitchNetwork ? glitchAccountsDropdownList : DROPDOWN_DATA}
      onChange={(value) => {
        if (isGlitchNetwork) {
          setAccountSelected(value)
        } else {
          switchNetwork(value[1])
        }
      }}
      isOpen={openNetworkDropdown}
      onClose={() => setOpenNetworkDropdown(false)}
    />
  )
})

AccountInfo.displayName = 'AccountInfo'

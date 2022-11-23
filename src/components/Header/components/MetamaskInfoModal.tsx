import React, { useMemo, useState } from 'react'
import { styled, theme } from 'twin.macro'
import { useNetwork } from 'wagmi'

import { useMetamask } from 'hooks/useMetamask'
import { useCopy } from 'hooks/useCopy'
import { useAddress } from 'hooks/useAddress'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'

import { NETWORK_DROPDOWN } from 'constants/index'

// Components
import { Input } from 'components/Input'
import { Modal } from 'components/Modal'
import { Dropdown } from 'components/Dropdown'
import { CopyIcon, OutlineDownArrow, SelectOutlinedIcon } from 'components/Svg'
import { Text } from 'components/Text'

const InputWrapper = styled.div`
  .input-container {
    border: 1px solid ${theme`colors.color1`};

    input {
      color: ${theme`colors.primary`};
      font-size: 14px;
      padding-top: 8px;
      padding-bottom: 8px;
    }
  }
`

interface Props {
  isOpen: boolean
  onClose: () => void
}

const DROPDOWN_DATA = [
  { ...NETWORK_DROPDOWN.eth, icon: './images/logo-eth.png', iconCls: 'w-5 h-5' },
  { ...NETWORK_DROPDOWN.bsc, icon: './images/logo-bnb.png', iconCls: 'w-5 h-5' },
]

export const MetamaskInfoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { address, shortAddress } = useAddress()
  const { onDisconnect } = useMetamask()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { onCopy } = useCopy()

  const [openNetworkDropdown, setOpenNetworkDropdown] = useState<boolean>(false)

  const networkSelected = useMemo(() => {
    return DROPDOWN_DATA.find((n) => n.value.includes(chain.id))
  }, [chain.id])

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header title="Your wallet" onClose={onClose} />
      <Modal.Content>
        <div>
          <div className="flex items-center p-4">
            <img className="w-14 h-14 mr-4" src="./images/logo-metamask.png" alt="logo-metamask" />
            <div>
              <Text className="mb-2 !text-color8 !font-semibold">Connected with Metamask</Text>
              <div className="flex items-center">
                <Text className="mr-3">Currently on network:</Text>

                <Dropdown
                  button={
                    networkSelected ? (
                      <div
                        role="button"
                        tabIndex={0}
                        className="flex items-center cursor-pointer select-none"
                        // onClick={() => setOpenNetworkDropdown((prev) => !prev)}
                      >
                        <img className="w-5 h-5" src={networkSelected?.icon} alt="icon" />
                        <Text className="mx-2">{networkSelected?.label}</Text>
                        <OutlineDownArrow width={12} height={12} />
                      </div>
                    ) : (
                      <div>
                        <Text>Unsupported network</Text>
                      </div>
                    )
                  }
                  stickyTitle="Switch network"
                  value={chain.id}
                  items={DROPDOWN_DATA}
                  width={250}
                  onChange={(value) => {
                    switchNetwork(value[1])
                  }}
                  isOpen={openNetworkDropdown}
                  onClose={() => setOpenNetworkDropdown(false)}
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-color4">
            <Text className="!text-color8 !font-semibold mb-2">{shortAddress}</Text>
            <InputWrapper>
              <Input
                disabled
                value={address}
                rightComponent={
                  <div role="button" tabIndex={0} className="cursor-pointer" onClick={() => onCopy(address)}>
                    <CopyIcon />
                  </div>
                }
              />
            </InputWrapper>
          </div>

          <div className="p-4">
            <a
              href={chain?.blockExplorers?.default?.url}
              className="flex items-center cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              <div className="text-link mr-2">
                View on {NETWORK_DROPDOWN.bsc.value.includes(chain.id) ? 'BscScan' : 'Etherscan'}
              </div>
              <SelectOutlinedIcon width={16} height={16} />
            </a>
          </div>

          <div className="p-4">
            <div
              role="button"
              tabIndex={0}
              className="secondary-outline-btn"
              onClick={() => {
                onDisconnect()
                onClose()
              }}
            >
              Disconnect wallet
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  )
}

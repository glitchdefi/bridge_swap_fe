import React from 'react'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { SUPPORTED_NETWORK } from 'constants/index'

import { Modal } from 'components/Modal'
import { Text } from 'components/Text'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const SwitchNetworkModal: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props
  const { switchNetwork } = useSwitchNetwork()

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header title="Switch network" onClose={onClose} />
      <Modal.Content>
        {SUPPORTED_NETWORK.filter((o) => o.label === 'Ethereum').map((o, i) => {
          return (
            <div
              role="button"
              tabIndex={0}
              className="flex items-center p-4 transition-all duration-300 cursor-pointer hover:bg-color4"
              key={`${i}`}
              onClick={() => {
                switchNetwork()
                onClose()
              }}
            >
              <img className="w-6 h-6 mr-3" src={o.icon} alt="network-icon" />
              <Text>{o.label}</Text>
            </div>
          )
        })}
      </Modal.Content>
    </Modal>
  )
}

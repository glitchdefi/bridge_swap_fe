import React from 'react'

// Components
import { Modal } from 'components/Modal'
import { Text } from 'components/Text'
import { PrimaryButton } from 'components/Button'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const MetamaskNotDetectedModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Header title="Metamask not detected" onClose={onClose} />
      <Modal.Content>
        <div className="p-4">
          <Text>
            Please install Metamask extension in the Chrome browser. When it is ready, please refresh this page to
            continue. Thank you!
          </Text>
          <a
            target="_blank"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            rel="noreferrer"
          >
            <PrimaryButton className="mt-8 mb-2">
              <span>Download Metamask</span>
            </PrimaryButton>
          </a>
        </div>
      </Modal.Content>
    </Modal>
  )
}

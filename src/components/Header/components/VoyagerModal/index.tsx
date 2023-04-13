/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

// Components
import { Modal } from 'components/Modal'
import { baseUrl, configuration } from './configs'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const VoyagerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const paramString = new URLSearchParams(configuration as any).toString()

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          maxWidth: '100%',
          width: 'fit-content',
        },
      }}
    >
      <Modal.Header title="Voyager" onClose={onClose} />
      <Modal.Content>
        <iframe
          id="widget__iframe"
          src={`${baseUrl}?${paramString}`}
          height="700px"
          width="600px"
          title="widget__iframe"
        />
      </Modal.Content>
    </Modal>
  )
}

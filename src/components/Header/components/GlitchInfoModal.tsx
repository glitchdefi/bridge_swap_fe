import React from 'react'
import { styled, theme } from 'twin.macro'

import { usePolkadotApi } from 'contexts/PolkadotApi/hooks'

import { GLITCH_EXPLORER } from 'constants/index'
import { useCopy } from 'hooks/useCopy'

// Components
import { Input } from 'components/Input'
import { Modal } from 'components/Modal'
import { CopyIcon, SelectOutlinedIcon } from 'components/Svg'
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

export const GlitchInfoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { accountSelected } = usePolkadotApi()
  const { onCopy } = useCopy()

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header title="Your wallet" onClose={onClose} />
      <Modal.Content>
        <div>
          <div className="flex items-center p-4">
            <img className="mr-4 w-14 h-14" src="./images/logo.png" alt="logo-glitch" />
            <div>
              <Text className="mb-2 !text-color8 !font-semibold">Connected with Glitch</Text>
              <div className="flex items-center">
                <Text className="mr-1">Currently on network:</Text>
                <div className="flex items-center">
                  <img className="w-5 h-5 mr-1" src="./images/logo.png" alt="logo-glitch" />
                  <Text>Glitch UAT</Text>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-color4">
            {/* <Text className="!text-color8 !font-semibold mb-2">charlie puth</Text> */}
            <InputWrapper>
              <Input
                disabled
                value={accountSelected}
                rightComponent={
                  <div role="button" tabIndex={0} className="cursor-pointer" onClick={() => onCopy(accountSelected)}>
                    <CopyIcon />
                  </div>
                }
              />
            </InputWrapper>
          </div>

          <div className="p-4">
            <div className="flex items-center cursor-pointer">
              <a
                href={`${GLITCH_EXPLORER}/account/${accountSelected}`}
                className="flex items-center cursor-pointer"
                target="_blank"
                rel="noreferrer"
              >
                <div className="mr-2 text-link">View on Explorer</div>
                <SelectOutlinedIcon width={16} height={16} />
              </a>
            </div>
          </div>

          {/* <div className="p-4">
            <div className="secondary-outline-btn">Disconnect wallet</div>
          </div> */}
        </div>
      </Modal.Content>
    </Modal>
  )
}

import React, { useState } from 'react'
import { styled, theme } from 'twin.macro'

// Components
import { Text } from 'components/Text'
import { Dropdown } from 'components/Dropdown'
import { CheckIcon, OutlineDownArrow } from 'components/Svg'

const Wrapper = styled.div`
  .select-network-btn {
    border: 1px solid ${theme`colors.color4`};
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 8px;
    padding-right: 8px;
    user-select: none;
  }
`

export const SelectWalletView: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Wrapper className="flex items-center">
      <Text className="mr-4" color={theme`colors.color7`}>
        Select wallet:
      </Text>
      <Dropdown
        width={220}
        isOpen={isOpen}
        button={
          <div
            role="button"
            tabIndex={0}
            className="flex items-center select-network-btn"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <img className="w-5 h-5" src="./images/logo-metamask.png" alt="logo-metamask" />
            <Text className="mx-2">0xc059...03d9</Text>
            <OutlineDownArrow width={12} height={12} />
          </div>
        }
      >
        <div>
          <div className="flex items-center justify-between p-4 cursor-pointer border-b border-color4">
            <div className="flex items-center">
              <img className="mr-3 w-5 h-5" src="./images/logo-metamask.png" alt="logo-metamask" />
              <Text color={theme`colors.primary`}>0xc059...03d9</Text>
            </div>
            <CheckIcon width={16} height={16} />
          </div>
          <div className="flex items-center p-4 cursor-pointer">
            <img className="mr-3 w-5 h-5" src="./images/logo.png" alt="logo-glch" />
            <Text>0xc059...03d9</Text>
          </div>
        </div>
      </Dropdown>
    </Wrapper>
  )
}

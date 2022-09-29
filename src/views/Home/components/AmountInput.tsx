import React from 'react'
import { styled, theme } from 'twin.macro'

import { Text } from 'components/Text'
import { OutlineButton } from 'components/Button'

const Wrap = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${theme`colors.color4`};
  padding-left: 12px;
  padding-right: 12px;

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  input {
    flex: 1;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: transparent;
    outline: none;
    border: none;

    font-size: 16px;
    line-height: 24px;
    color: ${theme`colors.color2`};

    ::placeholder {
      color: ${theme`colors.color1`};
      opacity: 1;
    }
  }

  .divide {
    height: 24px;
    width: 1px;
    background-color: ${theme`colors.color4`};
    margin-left: 12px;
    margin-right: 12px;
  }
`

export const AmountInput: React.FC = () => {
  return (
    <Wrap>
      <img src="./images/logo.png" alt="glitch-logo" />
      <input placeholder="Enter amount" />
      <div className="flex items-center">
        <Text fontSize="16px" color={theme`colors.color1`}>
          GLCH
        </Text>
        <div className="divide" />
        <OutlineButton className="!py-0 !px-2">
          <Text fontSize="12px" color={theme`colors.primary`}>
            Max
          </Text>
        </OutlineButton>
      </div>
    </Wrap>
  )
}

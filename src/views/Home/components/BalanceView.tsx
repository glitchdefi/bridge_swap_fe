import React, { memo } from 'react'
import { styled, theme } from 'twin.macro'

import { Text } from 'components/Text'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`

export const BalanceView: React.FC = memo(() => {
  return (
    <Wrapper>
      <img src="./images/logo-metamask.png" alt="meta-logo" />
      <div className="flex items-center">
        <Text mr="8px" color={theme`colors.color7`}>
          Balance:
        </Text>
        <Text>--</Text>
      </div>
    </Wrapper>
  )
})

BalanceView.displayName = 'BalanceView'

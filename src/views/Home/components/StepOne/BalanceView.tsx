import React, { memo } from 'react'
import { styled, theme } from 'twin.macro'

import { Text } from 'components/Text'
import { numberWithCommas } from 'utils/numbers'

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

interface Props {
  balance: string
}

export const BalanceView: React.FC<Props> = memo((props) => {
  return (
    <Wrapper>
      <img src="./images/logo-metamask.png" alt="meta-logo" />
      <div className="flex items-center">
        <Text mr="8px" color={theme`colors.color7`}>
          Balance:
        </Text>
        <Text>{props.balance ? `${numberWithCommas(props.balance)} GLCH` : '--'}</Text>
      </div>
    </Wrapper>
  )
})

BalanceView.displayName = 'BalanceView'

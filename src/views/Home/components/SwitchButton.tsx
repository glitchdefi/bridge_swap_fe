import React from 'react'
import { styled, theme } from 'twin.macro'

import { HorizontalSwap } from 'components/Svg'

const Wrap = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme`colors.color4`};
  cursor: pointer;
  margin-left: 24px;
  margin-right: 24px;
`

export const SwitchButton: React.FC = () => {
  return (
    <Wrap>
      <HorizontalSwap width={37} height={37} />
    </Wrap>
  )
}

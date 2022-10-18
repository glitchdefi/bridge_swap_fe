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

interface Props {
  onClick?: () => void
}

export const SwitchButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Wrap onClick={onClick}>
      <HorizontalSwap width={37} height={37} color={theme`colors.primary`} />
    </Wrap>
  )
}

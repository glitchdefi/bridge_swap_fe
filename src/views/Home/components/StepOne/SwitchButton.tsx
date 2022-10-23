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
`

interface Props {
  onClick?: () => void
}

export const SwitchButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Wrap className="my-4 sm:my-0 sm:mx-6" onClick={onClick}>
      <HorizontalSwap width={37} height={37} color={theme`colors.primary`} />
    </Wrap>
  )
}

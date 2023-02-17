import React from 'react'
import { styled, theme } from 'twin.macro'

const StyledSpin = styled.div<Props>`
  width: ${({ size }) => (size ? `${size}px` : '32px')};
  height: ${({ size }) => (size ? `${size}px` : '32px')};
  border: 3px solid ${({ color }) => color || theme`colors.primary`};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

interface Props {
  size?: number
  color?: string
}

export const Spin: React.FC<Props> = (props) => {
  return <StyledSpin {...props} />
}

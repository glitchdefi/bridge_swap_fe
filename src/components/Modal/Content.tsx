import React from 'react'
import { styled, theme } from 'twin.macro'

const Wrapper = styled.div`
  background-color: ${theme`colors.color3`};
`

interface Props {
  children: React.ReactNode
}

const Content: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default Content

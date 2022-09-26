/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { styled, theme } from 'twin.macro'
import { useTheme } from 'hooks/useTheme'
import { ThemeContext } from 'styles/theme/themeContext'

const Wrapper = styled.div`
  background-color: ${theme`colors.primary`};
`

const Home: React.FC = () => {
  return (
    <Wrapper>
      <div>Home page</div>
    </Wrapper>
  )
}

export default Home

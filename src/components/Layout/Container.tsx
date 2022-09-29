/* eslint-disable import/no-extraneous-dependencies */
import { useTheme } from 'hooks/useTheme'
import { styled, css, theme } from 'twin.macro'
import { Box, BoxProps } from '../Box'

const StyledContainer = styled(Box)<{ isDark?: boolean }>`
  ${({ isDark }) =>
    isDark
      ? css`
          background-image: url(/images/bg.jpg);
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        `
      : css`
          background-color: ${theme`colors.bg1`};
        `}

  min-height: 100vh;
  height: 100%;
  width: 100%;
`

const StyledWrapper = styled.div`
  position: relative;
  max-width: 1440px;
  margin: 0px auto;
  min-height: 100vh;
  height: 100%;

  padding-left: 120px;
  padding-right: 120px;
`

const Container: React.FC<BoxProps> = ({ children, ...props }) => {
  const { isDark } = useTheme()
  return (
    <StyledContainer isDark={isDark} {...props}>
      <StyledWrapper>{children}</StyledWrapper>
    </StyledContainer>
  )
}

export default Container

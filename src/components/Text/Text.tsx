import styled from 'styled-components'
import { space, typography, layout } from 'styled-system'
import { TextProps } from './types'

// interface ThemedProps extends TextProps {
//   theme: DefaultTheme
// }

// const getColor = ({ color, theme }: ThemedProps) => {
//   return getThemeValue(`colors.${color}`, color)(theme)
// }

const getFontSize = ({ fontSize, small }: TextProps) => {
  return small ? '14px' : fontSize || '16px'
}

const Text = styled.div<TextProps>`
  color: ${({ color }) => color};
  font-size: ${getFontSize};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ ellipsis }) =>
    ellipsis &&
    `white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`}
  ${space}
  ${typography}
  ${layout}
`

Text.defaultProps = {
  small: false,
  ellipsis: false,
}

export default Text

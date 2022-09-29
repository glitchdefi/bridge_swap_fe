import { styled, theme } from 'twin.macro'
import { space, typography, layout } from 'styled-system'
import { TextProps } from './types'

const getFontSize = ({ fontSize, large }: TextProps) => {
  return large ? '16px' : fontSize || '14px'
}

const Text = styled.div<TextProps>`
  color: ${({ color }) => color || theme`colors.color2`};
  font-size: ${getFontSize};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  font-feature-settings: 'zero' on;
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
  large: false,
  ellipsis: false,
}

export default Text

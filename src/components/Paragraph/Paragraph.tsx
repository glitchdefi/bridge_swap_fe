import styled from 'styled-components'
import { colors } from 'styles/Colors'
import { media } from 'styles/media'
import Text from '../Text/Text'
import { tags, ParagraphProps } from './types'

const style = {
  [tags.BODY]: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: 1.6,
    fontSizeXl: '16px',
    fontSizeXXl: '20px',
  },
}

const Paragraph = styled(Text)<ParagraphProps>`
  color: ${({ color }) => color || colors.txt2};
  font-size: ${({ variant }) => style[variant].fontSize};
  font-weight: ${({ variant }) => style[variant].fontWeight};
  line-height: ${({ variant }) => style[variant].lineHeight};

  ${media.xl`
    font-size: ${({ variant }) => style[variant].fontSizeXl};
  `}
  ${media.xxl`
    font-size: ${({ variant }) => style[variant].fontSizeXXl};
  `}
`

Paragraph.defaultProps = {
  as: 'p',
  variant: tags.BODY,
}

export default Paragraph

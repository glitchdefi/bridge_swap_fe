import styled from 'styled-components'
import { colors } from 'styles/Colors'
import { media } from 'styles/media'
import Text from '../Text/Text'
import { tags, HeadingProps } from './types'

const style = {
  [tags.H1]: {
    fontSize: '30px',
    lineHeight: 1.2,
    letterSpacing: '0.1em',
    fontWeight: '700',
    textTransform: 'uppercase',

    fontSizeMd: '40px',
    fontSizeXl: '48px',
  },
  [tags.H2]: {
    fontSize: '20px',
    lineHeight: 1,
    fontWeight: '700',
    textTransform: 'uppercase',

    fontSizeMd: '28px',
    fontSizeXl: '36px',
  },
  [tags.H4]: {
    fontSize: '16px',
    lineHeight: 1,
    fontWeight: '400',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',

    fontSizeMd: '18px',
    fontSizeXl: '20px',
  },
  [tags.H5]: {
    fontSize: '16px',
    lineHeight: 1.2,
    fontWeight: '700',
    textTransform: 'uppercase',

    fontSizeMd: '18px',
    fontSizeXl: '18px',
  },
}

const Heading = styled(Text)<HeadingProps>`
  font-family: 'Syncopate';

  color: ${({ color }) => color || colors.white};
  font-size: ${({ as }) => style[as].fontSize};
  font-weight: ${({ as }) => style[as].fontWeight};
  line-height: ${({ as }) => style[as].lineHeight};
  letter-spacing: ${({ as }) => style[as].letterSpacing};
  text-transform: ${({ as, textTransform }) => style[as].textTransform || textTransform};

  ${media.md`
    font-size: ${({ as }) => style[as].fontSizeMd};
  `}

  ${media.xl`
    font-size: ${({ as }) => style[as].fontSizeXl};
  `}

  ${({ as }) =>
    as === 'h4' &&
    `
      display: inline-block;
      background: ${colors.h4Gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    `}

  .gradient {
    display: inline-block;
    background: ${colors.titleHeroGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`

Heading.defaultProps = {
  as: tags.H4,
}

export default Heading

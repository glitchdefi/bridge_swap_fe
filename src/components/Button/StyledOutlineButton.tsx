/* eslint-disable import/no-extraneous-dependencies */
import { styled, theme } from 'twin.macro'
import { StyledBaseButton } from './StyledBaseButton'

const StyledOutlineButton = styled(StyledBaseButton)`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 16px;
  padding-right: 16px;

  border: 1px solid ${theme`colors.primary`};
  transition: all 0.3s ease;

  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  span {
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    color: ${theme`colors.primary`};
  }

  &:hover {
    opacity: 0.85;
  }
`

export default StyledOutlineButton

/* eslint-disable import/no-extraneous-dependencies */
import { styled, theme } from 'twin.macro'
import { StyledBaseButton } from './StyledBaseButton'

const StyledPrimaryButton = styled(StyledBaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;

  background: #e4ecef;
  box-shadow: -3px 3px 0px #00ffff, 3px -1px 0px #f100f5;

  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  span {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: ${theme`colors.color5`};
  }
`

export default StyledPrimaryButton

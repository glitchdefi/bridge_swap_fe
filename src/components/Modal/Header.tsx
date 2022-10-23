import { CloseIcon } from 'components/Svg'
import { Text } from 'components/Text'
import React from 'react'
import { styled, theme } from 'twin.macro'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${theme`colors.color4`};
  box-shadow: inset 0px -1px 0px ${theme`colors.color4`};

  .close-btn {
    cursor: pointer;
    user-select: none;
  }
`

interface Props {
  onClose: () => void
  title: string
}

const Header: React.FC<Props> = ({ title, onClose }) => {
  return (
    <Wrapper>
      <Text>{title}</Text>
      <div role="button" tabIndex={0} className="close-btn" onClick={onClose}>
        <CloseIcon />
      </div>
    </Wrapper>
  )
}

export default Header

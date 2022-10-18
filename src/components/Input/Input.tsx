import React from 'react'
import { styled, theme } from 'twin.macro'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${theme`colors.color4`};
  padding-left: 12px;
  padding-right: 12px;
  transition: all 0.3s ease;

  &.disabled {
    cursor: not-allowed;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input {
    flex: 1;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: transparent;
    outline: none;
    border: none;

    font-size: 16px;
    line-height: 24px;
    color: ${theme`colors.color2`};

    ::placeholder {
      color: ${theme`colors.color1`};
      opacity: 1;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &:focus-within {
    border-color: ${theme`colors.primary`};
  }
`

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  containerCls?: string
  containerStyle?: React.CSSProperties
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
}

export const Input: React.FC<InputProps> = (props) => {
  const { rightComponent, leftComponent, containerCls, containerStyle, disabled, ...rest } = props
  return (
    <Wrapper className={containerCls || `input-container ${disabled && 'disabled'}`} style={containerStyle}>
      {React.isValidElement(leftComponent) && React.cloneElement(leftComponent)}
      <input disabled={disabled} {...rest} />
      {React.isValidElement(rightComponent) && React.cloneElement(rightComponent)}
    </Wrapper>
  )
}

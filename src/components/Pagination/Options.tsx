import React from 'react'
import tw, { css, theme, styled } from 'twin.macro'

const Select = styled.select(() => [
  tw`px-3 ml-5 font-mono bg-transparent border-none outline-none text-color7`,
  css`
    border: 1px solid ${theme`colors.color4`};
    padding-top: 7px;
    padding-bottom: 7px;

    option[value='25'] {
      background-color: ${theme`colors.color1`} !important;
    }

    option[value='50'] {
      background-color: ${theme`colors.color1`} !important;
    }

    option[value='75'] {
      background-color: ${theme`colors.color1`} !important;
    }

    option[value='100'] {
      background-color: ${theme`colors.color1`} !important;
    }
  `,
])

interface Props {
  onChange: (pageSize: number) => void
}

export const Options: React.FC<Props> = ({ onChange }) => {
  return (
    <Select onChange={(e) => onChange(Number(e.target.value))}>
      <option value="25">25 / page</option>
      <option value="50">50 / page</option>
      <option value="75">75 / page</option>
      <option value="100">100 / page</option>
    </Select>
  )
}
